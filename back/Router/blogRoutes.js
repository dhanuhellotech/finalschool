const express = require('express');
const router = express.Router();
const blogController = require('../Controller/blogController');

// Define your blog routes here
router.get('/', blogController.getAllBlogs);
router.put('/:id',  blogController.uploadImage, blogController.updateBlog);
router.post('/',blogController.uploadImage, blogController.createBlog);
router.delete('/:id', blogController.deleteBlog); 
router.post("/resize",blogController.uploadImage,blogController.resizeImage,blogController.addImagetoCloud,blogController.createBlog)
// Add other routes as needed

module.exports = router;
