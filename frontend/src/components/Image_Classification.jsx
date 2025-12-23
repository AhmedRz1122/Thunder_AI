import React, { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import Imag from "../assets/image4.png";
import reactLogo from "../assets/react.svg";
import "./Image_Classification.css";

const Image_Classification = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [classificationResult, setClassificationResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
      uploadImageToAPI(file);
    }
  };

  const uploadImageToAPI = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    try {
      // Upload the image
      const uploadResponse = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image");
      }

      const uploadData = await uploadResponse.json();
      const imagePath = uploadData.path; // The filename with extension returned from the backend

      // Call the classifier endpoint with the file name
      const classifyResponse = await fetch(
        `http://127.0.0.1:5000/classifier/${imagePath}`,
        {
          method: "GET",
        }
      );

      if (!classifyResponse.ok) {
        throw new Error("Failed to classify image");
      }

      const classifyData = await classifyResponse.json();
      setClassificationResult(classifyData.classification || "Unknown");
    } catch (error) {
      console.error("Error:", error);
      setClassificationResult("Error classifying image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      {/* <div className="sticky top-0 left-0 h-screen w-1/4 z-10">
        <AppSidebar />
      </div> */}

      <div className="flex-grow flex ml-1/4"> 
        <div className="container_left w-full md:w-1/2 p-4">
          <h1 className="heading text-3xl font-extrabold">Image Classification</h1>
          <div className="relative flex justify-center items-center mt-4">
            <img src={reactLogo} alt="React logo" className="logoreact w-28 h-28" />
          </div>

          <div className="upload-area mt-4" id="upload-area">
            <label htmlFor="file-input" className="cursor-pointer text-gray-200 mt-4">
              <p>Click here or drag and drop an image for analysis</p>
            </label>
            <input
              type="file"
              id="file-input"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {loading && <p className="text-gray-200 mt-4">Classifying image... Please wait.</p>}
          {classificationResult && !loading && (
            <p className="text-gray-200 mt-4">Result: {classificationResult}</p>
          )}
        </div>

        <div className="container_right w-full md:w-1/2 p-4">
          <div className="flex justify-center items-center h-full w-full">
            <img
              src={uploadedImage || Imag}
              alt="Uploaded food"
              className="h-3/4 w-3/4 object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Image_Classification;
