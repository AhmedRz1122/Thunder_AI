import React, { useState } from "react";
import { AppSidebar } from "./components/AppSidebar";
import reactLogo from "./assets/react.svg";
import { FaArrowUp } from "react-icons/fa";
import "./Text_generation.css";

const TextGeneration = () => {
  const [inputValue, setInputValue] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    if (!inputValue.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/text/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputValue }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate text");
      }

      const data = await response.text();
      setGeneratedText(data);
    } catch (error) {
      console.error("Error:", error);
      setGeneratedText("Error generating text");
    } finally {
      setLoading(false);
      setInputValue("");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {/* <div className="bg-gray-100 sidebar-container relative">
        <AppSidebar />
      </div> */}

      {/* Main Content */}
      <div className="w-full flex flex-col p-8">
        {/* Header with Logo */}
        <div className="relative inset-5 flex justify-center items-center">
          <img src={reactLogo} alt="React logo" className="w-28 h-28 logo" />
        </div>

        {/* Text Input Area */}
        <div className="flex-grow p-8 overflow-auto">
          <textarea
            id="prompt-input"
            className="textarea-style w-full border rounded-lg p-2 mb-4"
            rows="4"
            placeholder="Enter a prompt for text generation..."
            value={inputValue}
            onChange={handleInputChange}
          ></textarea>

          <div className="flex justify-end mb-4">
            <button
              onClick={handleSubmit}
              disabled={!inputValue.trim() || loading}
              className={`w-12 h-12 flex items-center justify-center rounded-full ${
                inputValue.trim()
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <FaArrowUp className="text-lg" />
            </button>
          </div>

          {/* Loading State */}
          {loading && <p className="text-gray-500">Generating text...</p>}

          {/* Display Generated Text */}
          {generatedText && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-100">
              <h3 className="text-lg font-semibold text-blue-500">Generated Text:</h3>
              <p className="text-gray-700">{generatedText}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextGeneration;
