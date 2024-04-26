import React, { useState } from 'react';
import './UploadPortal.css'; // Assuming this file contains your custom styles
import { IoMdCloudUpload } from "react-icons/io";

const Portal = () => {
  const [pdfText, setPdfText] = useState('');
  // const [fileName, setFileName] = useState('');

  const handleFileSelect = async (event) => {
    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/process-pdf', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        throw new Error('Failed to upload file');
      }
      const data = await response.json();
      setPdfText(data.text);
      //setFileName(selectedFile.name); // Set the file name
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <div className='overall-card'>
      <div className='upload-card'>
        <IoMdCloudUpload className='FaIcon1'/>
        <h2>Upload Expense Report</h2>
        <button className="custom-file-button" onClick={() => document.getElementById('fileInput').click()}>
          Choose File
        </button>
        <input type="file" id="fileInput" className="file-input" onChange={handleFileSelect} />
      </div>
    </div>
    <div className='feedback-card'>
      {pdfText && (
        <div className="text-display">
          <h3>Text from PDF:</h3>
          <p>{pdfText}</p>
        </div>
      )}
    </div>
    </>
  );
};

export default Portal;
