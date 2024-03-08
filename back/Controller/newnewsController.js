
const Document = require('../Models/Newnewsletter');
const cloudinary = require("../middlewares/cloudinary");
const multer = require('../middlewares/upload');


async function uploadDocument(req, res) {
    try {
      const { title, description } = req.body;
      const file = req.file;
      const result = await cloudinary.uploader.upload(file.path, { resource_type: "auto" });
      const fileUrl = result.secure_url;
  
      const document = new Document({ title, description, fileUrl });
      await document.save();
  
      console.log('Document uploaded successfully');
      res.status(201).json({ message: 'Document uploaded successfully', document });
    } catch (error) {
      console.error('Error uploading document:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
module.exports = {
  uploadDocument
};
