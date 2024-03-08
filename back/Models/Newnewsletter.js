const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  fileUrl: { type: String, required: true } // Assuming you store file URL
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
