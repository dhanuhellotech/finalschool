const express = require('express');
const router = express.Router();
const teacherController = require('../Controller/teacherController');



// Define your teacher routes here
router.get('/', teacherController.getAllTeachers);
router.put('/:id',teacherController.uploadImage, teacherController.updateTeacher);
router.post('/',teacherController.uploadImage, teacherController.createTeacher);
router.delete('/:id', teacherController.deleteTeacher); 
router.post("/resize", teacherController.uploadImage, teacherController.resizeImage, teacherController.addImagetoCloud, teacherController.createTeacher);

module.exports = router;
