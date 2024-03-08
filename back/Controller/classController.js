const Class = require('../Models/Class');
const multer = require('../middlewares/upload');
const sharp = require("sharp");
const cloudinary = require("../middlewares/cloudinary");

const uploadImage = multer.single('image');

const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const resizeImage = async (req, res, next) => {
    try {
      const resizedImage = await sharp(req.file.buffer)
      .resize(300,250)
      .toFormat("jpeg")
      .jpeg({quality:50})
      .toBuffer()
      req.image = resizedImage.toString( 'base64')
      next()
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error resizing image" });
    }
}
const addImagetoCloud = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${req.image}`, {
      folder: "classes" // Make sure the folder parameter is set to "classes"
    });

    console.log('Cloudinary upload result:', result);

    if (!result || !result.public_id || !result.secure_url) {
      throw new Error("Invalid result object or missing required properties");
    }

    req.result = result;
    next();
  } catch (err) {
    console.error('Error uploading image to cloud:', err);
    return res.status(500).json({ message: "Error uploading image to Cloudinary. Please try again later." });
  }
}
 
const createClass = async (req, res) => {
  try {
    const { name, age, gameName, price, staffName } = req.body;

    const newClass = new Class({
      name,
      age,
      gameName,
      price,
      staffName,
      pid: req.result.public_id, 
      imageUrl: req.result.secure_url,
    });
    
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const { name, age, gameName, price, staffName } = req.body;

    if (!name || !age || !gameName || !price || !staffName) {
      return res.status(400).json({ message: 'All fields are required for updating a class' });
    }

    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      {
        name,
        age,
        gameName,
        price,
        staffName,
        imageUrl: req.file ? req.file.filename : undefined,
      },
      { new: true }
    );

    if (!updatedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(updatedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getClassById = async (req, res) => {
  try {
    const classObj = await Class.findById(req.params.id);
    if (!classObj) {
      return res.status(404).json({ error: 'Class not found' });
    }
    res.json(classObj);
  } catch (error) {
    console.error('Error fetching class:', error);
    res.status(500).json({ error: 'Failed to fetch class' });
  }
};

const deleteClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const deletedClass = await Class.findByIdAndDelete(classId);
    if (!deletedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json({ message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllClasses,
  createClass,
  updateClass,
  deleteClass,
  uploadImage,
  resizeImage,
  addImagetoCloud,
  getClassById
};
