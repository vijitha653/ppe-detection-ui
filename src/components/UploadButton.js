import React from "react";
import "./UploadButton.css";

const UploadButton = ({ onImageSelect, onUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <div className="upload-container">
      <input type="file" id="file-upload" accept="image/*" onChange={handleFileChange} hidden />
      <label htmlFor="file-upload" className="upload-btn">Choose Image</label>
      <button className="submit-btn" onClick={onUpload}>Submit</button>
    </div>
  );
};

export default UploadButton;
