import React, { useState } from "react";
import { AppSidebar } from "../components/AppSidebar";
import reactLogo from "../assets/react.svg";
import { FaArrowUp } from "react-icons/fa";
import "./Imagegen.css";

const Imagegen = () => {
  const [inputValue, setInputValue] = useState("");
  const [imageUrls, setImageUrls] = useState([]); // State to store generated image URLs
  const [loading, setLoading] = useState(false); // State to show loading spinner

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    if (!inputValue.trim()) return;

    setLoading(true); // Start loading
    try {
      // Make the API call to fetch generated images
      const response = await fetch(`http://127.0.0.1:5000/image/${encodeURIComponent(inputValue)}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch image URLs");
      }

      const data = await response.json();
      // Assuming the API returns keys `url1`, `url2`, `url3`, and `url4`
      const urls = [data.url1, data.url2, data.url3, data.url4];
      setImageUrls(urls); // Store the image URLs in state
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate images. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }

    setInputValue(""); // Clear input
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {/* <div className="bg-gray-100 sidebar-container relative">
        <AppSidebar />
      </div> */}

      {/* Main Content */}
      <div className="w-full flex flex-col p-8">
        {/* Header */}
        <div className="relative inset-5 flex justify-center items-center">
          <img src={reactLogo} alt="React logo" className="w-28 h-28 logo" />
        </div>

        {/* Input and Submit */}
        <div className="flex-grow p-8 overflow-auto">
          <textarea
            id="prompt-input"
            className="textarea-style w-full border rounded-lg p-2 mb-4 h-1/4"
            rows="4"
            placeholder="Enter a prompt for futuristic image generation..."
            value={inputValue}
            onChange={handleInputChange}
          ></textarea>

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={!inputValue.trim() || loading}
              className={`w-12 h-12 flex items-center justify-center rounded-full ${
                inputValue.trim()
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <div className="spinner-border animate-spin w-6 h-6 border-2 rounded-full"></div>
              ) : (
                <FaArrowUp className="text-lg" />
              )}
            </button>
          </div>
        </div>

        {/* Display Generated Images */}
        <div className="grid grid-cols-4 gap-4 mt-8">
          {imageUrls.map((url, index) => (
            <div key={index} className="">
              <img
                src={url}
                alt={`Generated image ${index + 1}`}
                className="object-contain rounded-lg shadow-md w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Imagegen;
