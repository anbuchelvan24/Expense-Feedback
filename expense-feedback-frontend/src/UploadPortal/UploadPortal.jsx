import React from 'react';
import './UploadPortal.css'; // Assuming this file contains your custom styles
import { IoMdCloudUpload } from "react-icons/io";

const Portal = () => {

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    // You can now handle the selected file as needed
    console.log("Selected file:", selectedFile);
  };

  return (
    <div className='overall-card'>
      <div className='upload-card'>
      <IoMdCloudUpload className='FaIcon'/>
      <h2>Upload Expense Report</h2>
      <button className="custom-file-button" onClick={() => document.getElementById('fileInput').click()}>
        Choose File
      </button>
      <input type="file" id="fileInput" className="file-input" onChange={handleFileSelect} />
    </div>
    </div>
  );
};

export default Portal;
