const express = require('express');
const router = express.Router();
const newsletterController = require('../Controller/newsletterController');





// Route for uploading a newsletter
router.post('/upload', newsletterController.uploadPdf,newsletterController.resizeResume, newsletterController.postResume,newsletterController.uploadNewsletter,);

// Route for getting all newsletters
router.get('/', newsletterController.getAllNewsletters);

// Route for getting a newsletter by ID
router.get('/:id', newsletterController.getNewsletterById);

// Route for updating a newsletter by ID
router.put('/:id',newsletterController.uploadPdf , newsletterController.updateNewsletterById);

// Route for deleting a newsletter by ID
router.delete('/:id', newsletterController.deleteNewsletterById);

module.exports = router;
