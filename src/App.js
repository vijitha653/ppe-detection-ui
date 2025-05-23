import React, { useState } from "react";
import UploadButton from "./components/UploadButton";
import ImagePreview from "./components/ImagePreview";
import { uploadImage } from "./api";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [processedImage, setProcessedImage] = useState(null); // Store processed image

  const handleImageSelect = (file) => {
    setSelectedFile(file);
    setImageSrc(URL.createObjectURL(file)); // Create a preview URL
    console.log("Selected file:", file.name);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      console.log("Uploading image...");
      const response = await uploadImage(selectedFile);
      console.log("Server response:", response);

      if (response) {
        if (response.status === "violation_detected" && response.violations.length > 0) {
          // Store processed image
          setProcessedImage(response.processed_image_url);

          // Format violations properly
          const violationsText = response.violations
            .map((v, index) => `#${index + 1}: ${v.type} (${(v.confidence * 100).toFixed(2)}%)`)
            .join("\n");

          setResult(`❌ Violations detected:\n${violationsText}`);
        } else {
          setProcessedImage(null);
          setResult("✅ No Violations");
        }
      } else {
        setResult("⚠️ No result received from server.");
      }
    } catch (error) {
      console.error("Upload error:", error.message);
      alert("Upload failed! " + error.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="app-container">
      <h1>Edge Layer PPE Compliance</h1>
      <UploadButton onImageSelect={handleImageSelect} onUpload={handleUpload} />
      <ImagePreview imageSrc={imageSrc} />
      {processedImage && <ImagePreview imageSrc={processedImage} />} 
      {isLoading ? <p>Processing...</p> : <p>{result}</p>}
    </div>
  );
}

export default App;