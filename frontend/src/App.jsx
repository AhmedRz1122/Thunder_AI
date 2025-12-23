import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import reactLogo from './assets/react.svg';
import './App.css';
import { AppSidebar } from './components/AppSidebar';
import Home from "./components/Home";
import Imagegen from './components/Imagegen';
import Image_Classification from './components/Image_Classification';
import Text_generation from './Text_generation';
import ThunderLoader from "./components/ThunderLoader";

// Component to handle loader transitions
function RouteWithLoader({ element: Component, showSidebar = false, ...rest }) {
  const [showLoader, setShowLoader] = useState(false);
  const [shouldRenderComponent, setShouldRenderComponent] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show loader when route changes
    setShowLoader(true);
    setShouldRenderComponent(false);
    
    const timer = setTimeout(() => {
      setShowLoader(false);
      setShouldRenderComponent(true);
    }, 3000); // Show loader for 3 seconds
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {showLoader && <ThunderLoader />}
      {shouldRenderComponent && (
        <div className="flex min-h-screen">
          {showSidebar && <AppSidebar />}
          <div className={`flex-1 ${showSidebar ? '' : 'w-full'}`}>
            <Component {...rest} />
          </div>
        </div>
      )}
    </>
  );
}

// Main App Component
function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Login/Register Page - No loader needed */}
        <Route
          path="/"
          element={
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#000428] to-[#004e92] text-white">
              <img
                src={reactLogo}
                alt="React Logo"
                className="w-20 h-20 mb-8 animate-spin-slow"
              />
              {isLogin ? <RegisterPage /> : <LoginPage />}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg"
              >
                {isLogin ? "Go to Login" : "Go to Register"}
              </button>
            </div>
          }
        />

        {/* Home Route - No sidebar, with loader */}
        <Route
          path="/Home"
          element={
            <RouteWithLoader 
              element={Home}
              showSidebar={false}
            />
          }
        />

        {/* Image Classification - With sidebar & loader */}
        <Route
          path="/Image_Classification"
          element={
            <RouteWithLoader 
              element={Image_Classification}
              showSidebar={true}
            />
          }
        />

        {/* Image Generation - With sidebar & loader */}
        <Route
          path="/Imagegen"
          element={
            <RouteWithLoader 
              element={Imagegen}
              showSidebar={true}
            />
          }
        />

        {/* Text Generation - With sidebar & loader */}
        <Route
          path="/Text_generation"
          element={
            <RouteWithLoader 
              element={Text_generation}
              showSidebar={true}
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;