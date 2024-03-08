const Blog = require('../Models/blogModel');

const multer = require('../middlewares/upload');
const sharp = require("sharp")
const cloudinary = require("../middlewares/cloudinary")

const uploadImage = multer.single('image');
const resizeImage = async(req,res,next)=>{
  try {
    const resizedImage = await sharp(req.file.buffer)
    .resize(300,250)
    .toFormat("jpeg")
    .jpeg({quality:50})
    .toBuffer()
    req.image = resizedImage.toString( 'base64')
    next()
  } catch (err) {
    console.log(err)
    return res.status(404).json({message:"cannot get buffer image"})
  }
}

const addImagetoCloud = async(req,res,next)=>{
  
   try {
    const result =await cloudinary.uploader.upload(`data:image/jpeg;base64,${req.image}`,{
      folder:"blogs"
    })
    req.result = result
    next()
   } catch (err) {
    //console.log(err)
    return res.status(404).json({message:"cannot save image"})
   }
}



// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new blog
// Create a new blog
const createBlog = async (req, res) => {
  try {
    const { title, date, category, author, comments, content, link } = req.body;

    // Validate comments field
    if (isNaN(comments)) {
      return res.status(400).json({ message: 'Comments must be a valid number' });
    }

    const newBlog = new Blog({
      title,
      category,
      author,
      comments,
      content,
      link,
      date,
      pid:req.result.public_id,
      imageUrl:req.result.secure_url, // Assuming the field name for image upload is 'image'
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    // Check if required fields are provided
    const { title,  date, category, author, comments, content, link } = req.body;
    if (!title || !category|| !date  || !author || !comments || !content || !link) {
      return res.status(400).json({ message: 'All fields are required for updating a blog' });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        title,
        category,
        author,
        date,
        comments,
        content,
        link,
        imageUrl: req.file ? req.file.filename : undefined,
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteBlog = async (req, res) => {
    try {
      const blogId = req.params.id;
      const deletedBlog = await Blog.findByIdAndDelete(blogId);
  
      if (!deletedBlog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
module.exports={ uploadImage,resizeImage,addImagetoCloud,getAllBlogs,createBlog,updateBlog,deleteBlog}