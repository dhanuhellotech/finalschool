// routes/classRoutes.js

const express = require('express');
const router = express.Router();
const classController = require('../Controller/classController');


// Multer configuration for handling file uploads



router.get('/', classController.getAllClasses);
router.post('/',classController.uploadImage, classController.createClass); // Use upload middleware for image uploading
router.get('/:id', classController.getClassById);
router.put('/:id', classController.uploadImage, classController.updateClass); // Use upload middleware for image updating
router.delete('/:id', classController.deleteClass);
router.post("/resize",classController.uploadImage,classController.resizeImage,classController.addImagetoCloud,classController.createClass)

module.exports = router;
