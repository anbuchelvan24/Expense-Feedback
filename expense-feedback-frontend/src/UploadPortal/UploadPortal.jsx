import React from 'react';
import './UploadPortal.css'; // Assuming this file contains your custom styles
import { TiUpload } from "react-icons/ti";

const Portal = () => {

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    // You can now handle the selected file as needed
    console.log("Selected file:", selectedFile);
  };

  return (
    <div className='upload-card'>
      <TiUpload className='FaIcon'/>
      <h2>Upload Expense Report</h2>
      <button className="custom-file-button" onClick={() => document.getElementById('fileInput').click()}>
        Choose File
      </button>
      <input type="file" id="fileInput" className="file-input" onChange={handleFileSelect} />
    </div>
  );
};

export default Portal;
