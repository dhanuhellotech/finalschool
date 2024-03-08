import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { client } from '../../clientaxios/Clientaxios'; // Ensure clientaxios is imported correctly

export default function Newsletter() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [uploadedDetails, setUploadedDetails] = useState([]);
  const [editingPDFId, setEditingPDFId] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('fileUrl', file);

      if (editingPDFId) {
        // If editing an existing PDF, make PUT request to update
        await client.put(`/newsletter/${editingPDFId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setEditingPDFId(null); // Clear editing mode after update
      } else {
        // If not editing, make POST request to create new PDF
        await client.post('/newsletter/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      
      clearForm();
      fetchUploadedDetails();
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Handle error
      setError('Failed to upload PDF. Please try again later.');
    }
  };

  const fetchUploadedDetails = async () => {
    try {
      const response = await client.get('/newsletter');
      setUploadedDetails(response.data);
    } catch (error) {
      console.error('Error fetching uploaded details:', error);
    }
  };

  useEffect(() => {
    fetchUploadedDetails();
  }, []);

  const handleDeletePDF = async (id) => {
    try {
      await client.delete(`/newsletter/${id}`);
      fetchUploadedDetails();
    } catch (error) {
      console.error('Error deleting PDF:', error);
    }
  };

  const handleEditPDF = (id) => {
    const pdfToEdit = uploadedDetails.find(pdf => pdf._id === id);
    if (pdfToEdit) {
      setTitle(pdfToEdit.title);
      setDescription(pdfToEdit.description);
      setEditingPDFId(id); // Set editing mode with PDF ID
    }
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setFile(null);
    setEditingPDFId(null); // Clear editing mode
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="container">
          <h4>Upload PDF</h4>
          {error && <div className="alert alert-danger">{error}</div>} {/* Display error message if present */}
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div className="mb-3">
              <input type="file" className="form-control" accept=".pdf" onChange={handleFileChange} />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">{editingPDFId ? 'Update' : 'Upload'}</button>
            </div>
          </form>

          <h5 style={{ marginTop: '20px' }}>Uploaded PDFs</h5>
          <ul className="list-group">
            {uploadedDetails.map((detail, index) => (
              <React.Fragment key={index}>
                <li className="list-group-item">
                  <div>Title: {detail.title}</div>
                  <div>Description: {detail.description}</div>
                  <div>Filename: {detail.pdfUrl}</div>
                  <div>
                    <button className="btn btn-danger me-2" onClick={() => handleDeletePDF(detail._id)}>Delete</button>
                    <button className="btn btn-primary" onClick={() => handleEditPDF(detail._id)}>Edit</button>
                  </div>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
