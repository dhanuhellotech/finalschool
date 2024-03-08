const Teacher = require('../Models/Teacher');
const multer = require('../middlewares/upload');
const sharp = require("sharp");
const cloudinary = require("../middlewares/cloudinary");

const uploadImage = multer.single('image');

const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const resizeImage = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    const resizedImage = await sharp(req.file.buffer)
      .resize(300, 250)
      .toFormat("jpeg")
      .jpeg({ quality: 50 })
      .toBuffer();

    req.image = resizedImage.toString('base64');
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error resizing image" });
  }
};

  
const addImagetoCloud = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${req.image}`, {
      folder: "teachers" // Make sure the folder parameter is set to "teachers"
    });

    if (!result || !result.public_id) {
      throw new Error("Invalid result object or missing public_id");
    }

    req.result = result;
    req.publicId = result.public_id; // Assign the public_id property to req.publicId
    next();
  } catch (err) {
    console.error('Error uploading image to cloud:', err);
    return res.status(500).json({ message: "Error uploading image to Cloudinary. Please try again later." });
  }
}

const createTeacher = async (req, res) => {
  try {
    const { name, about, hobby, dateOfBirth, degree, teachingGoal, position, homeTown } = req.body;

    const newTeacher = new Teacher({
      name,
      about,
      hobby,
      dateOfBirth,
      degree,
      teachingGoal,
      position,
      pid:req.result.public_id, 
      homeTown,
      imageUrl: req.result.secure_url,
    });
    
    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const { name, about, hobby, dateOfBirth, degree, teachingGoal, position, homeTown } = req.body;

    if (!name || !about || !hobby || !dateOfBirth || !degree || !teachingGoal || !position || !homeTown) {
      return res.status(400).json({ message: 'All fields are required for updating a teacher' });
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      {
        name,
        about,
        hobby,
        dateOfBirth,
        degree,
        teachingGoal,
        position,
        homeTown,
        imageUrl: req.file ? req.file.filename : undefined,
      },
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(updatedTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);
    if (!deletedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  uploadImage,
  resizeImage,addImagetoCloud
};
