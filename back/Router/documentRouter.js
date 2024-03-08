const express = require('express');
const router = express.Router();
const multer = require('multer');
const documentController = require('../Controller/newnewsController');

const upload = multer({ dest: 'uploads/' }); // Assuming you want to store uploads in 'uploads' directory

router.post('/upload', upload.single('pdf'), documentController.uploadDocument);

module.exports = router;
