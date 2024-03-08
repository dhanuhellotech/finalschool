// controllers/newsletterController.js

const Newsletter = require('../Models/Newsletter');
const multer = require('../middlewares/upload');
const sharp = require("sharp")
const cloudinary = require("../middlewares/cloudinary")

const streamifier = require('streamifier');

const uploadPdf = multer.single('fileUrl');


const resizeResume = async (req, res, next) => {

  try {
    const pdfDoc = await PDFDocument.load(req.file.buffer);
    const compressedPdfBytes = await pdfDoc.save({ useObjectStreams: false });

    // Convert compressed PDF bytes back to buffer
    const compressedPdfBuffer = Buffer.from(compressedPdfBytes);

    // Set the buffer back to req.file.buffer
    req.file.buffer = compressedPdfBuffer;

    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error resizing PDF" });
  }
};
const { PDFDocument } = require('pdf-lib');
const postResume = async (req, res,next) => {
  console.log(req.file.buffer);
  try {
       // Import streamifier library

      const stream = cloudinary.uploader.upload_stream({
          folder: 'newsletter', // Specify the folder in Cloudinary to upload files
         public_id:'monthly newsletter',
          resource_type: "raw",
          format: "pdf" // Automatically detect the type of resource
      }, (error, result) => {
          if (error) {
              console.error('Error uploading file:', error);
              res.status(500).json({ error: 'Error uploading file' });
          } else {
              req.result = result
next();
          }
      });

      streamifier.createReadStream(req.file.buffer).pipe(stream); 
      // Pipe the file buffer to the Cloudinary upload stream
  } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Error uploading file' });
  }
}

const uploadNewsletter = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    const { title, description } = req.body;
    const pdfUrl = req.file ? req.result.secure_url : null; // Check if req.file exists before accessing its path
    // const filename = req.file ? req.file.originalname : null; // Extract filename from uploaded file

    if (!pdfUrl) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const newNewsletter = new Newsletter({
      title,
      description,
      pdfUrl,
   // Include the filename in the Newsletter schema
    });

    await newNewsletter.save();

    res.status(201).json({ success: true, data: newNewsletter });
  } catch (error) {
    console.error('Error uploading newsletter:', error);
    res.status(500).json({ error: 'Failed to upload newsletter' });
  }
};





// Get all newsletters
const getAllNewsletters = async (req, res) => {
  try {
    const newsletters = await Newsletter.find();
    res.json(newsletters);
  } catch (error) {
    console.error('Error fetching newsletters:', error);
    res.status(500).json({ error: 'Failed to fetch newsletters' });
  }
};

// Get newsletter by ID
const getNewsletterById = async (req, res) => {
  const { id } = req.params;
  try {
    const newsletter = await Newsletter.findById(id);
    if (!newsletter) {
      return res.status(404).json({ error: 'Newsletter not found' });
    }
    res.json(newsletter);
  } catch (error) {
    console.error('Error fetching newsletter:', error);
    res.status(500).json({ error: 'Failed to fetch newsletter' });
  }
};

// Update newsletter by ID
const updateNewsletterById = async (req, res) => {
  const { id } = req.params;
  try {
    const { title, description, newFilename } = req.body;
    let updateFields = { title, description };

    // Check if a new file is uploaded
    if (req.file) {
      const { filename } = req.file;
      const filePath = req.file.path;
      updateFields = { ...updateFields, filename, filePath };
    }

    // Find the newsletter by ID
    const newsletter = await Newsletter.findById(id);

    if (!newsletter) {
      return res.status(404).json({ error: 'Newsletter not found' });
    }

    // Update the filename if newFilename is provided
    if (newFilename) {
      await newsletter.updateFilename(newFilename); // Update filename using the schema method
    }

    // Update the other fields of the newsletter
    const updatedNewsletter = await Newsletter.findByIdAndUpdate(id, updateFields, { new: true });
    
    res.json(updatedNewsletter);
  } catch (error) {
    console.error('Error updating newsletter:', error);
    res.status(500).json({ error: 'Failed to update newsletter' });
  }
};

// Delete newsletter by ID
const deleteNewsletterById = async (req, res) => {
  const { id } = req.params;
  try {
    await Newsletter.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting newsletter:', error);
    res.status(500).json({ error: 'Failed to delete newsletter' });
  }
};

module.exports = { 
  uploadNewsletter,
  getAllNewsletters,
  getNewsletterById,
  updateNewsletterById,
  deleteNewsletterById, 
  uploadPdf,   // Add uploadPdf middleware here
  postResume,resizeResume 
};
