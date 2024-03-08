const express = require('express');
const router = express.Router() 
const eventController = require('../Controller/eventController');


router.get("/",eventController.getevents)
router.post('/',eventController.uploadImage,eventController.addEvent)
router.delete('/:id',eventController.deleteEvent)
router.put('/:id',eventController.uploadImage,eventController.updateEvent)
router.post("/resize",eventController.uploadImage,eventController.resizeImage,eventController.addImagetoCloud,eventController.addEvent)
module.exports = router;

  