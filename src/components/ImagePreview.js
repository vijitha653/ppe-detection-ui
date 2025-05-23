import React from "react";
import "./ImagePreview.css";

const ImagePreview = ({ imageSrc }) => {
  if (!imageSrc) return null;

  return (
    <div className="preview-container">
      <h3>Image Preview:</h3>
      <img src={imageSrc} alt="Preview" className="preview-image" />
    </div>
  );
};

export default ImagePreview;
