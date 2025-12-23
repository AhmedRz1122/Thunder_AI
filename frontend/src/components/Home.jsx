import React from 'react';
import viteLogo from '/vite.svg';
import Thunder from "../assets/Thunder.png";
import Imageclassify from "../assets/ImageClassification.png";
import ImageGenerate from "../assets/Imagegeneration.png";
import "./Home.css";
import { NavLink } from "react-router-dom";

const Home = () => {
    return (
        <>
            <nav className='h-14 bg-gray-100 text-black flex items-center relative '>
                <img src={viteLogo} alt="" className='mx-3' />
                <h1 className='font-bold mx-3'>Thunder AI</h1>
                <NavLink to="/">
                    <button className='w-20 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg absolute top-2 right-0 mr-3'>Logout</button>
                </NavLink>
            </nav>

            <div className="flex justify-center items-center">
                <div className='left self-center space-y-4'>
                    <h1 className='font-extrabold text-3xl gap-x-10'>Unleashing AI for Image and Creativity</h1>
                    <p className='text-center '>Analyze Image for AI for generate stunning visuals from prompts</p>
                    <div className="flex justify-center items-center">
                        <NavLink to="/Imagegen">
                            <button className='border-2 border-white w-[250px] bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-2xl mr-3'>Explore Image Generation</button>
                        </NavLink>
                        <NavLink to="/Image_Classification">
                            <button className='border-2 border-white w-[250px] bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-2xl mr-3'>Start Image Analysis</button>
                        </NavLink>
                    </div>
                </div>
                <div className='right place-self-center mt-8'>
                    <img src={Thunder} alt="" className='h-80 mt-2 ml-9' id='img_thunder' />
                </div>
            </div>

            <div className='space-y-4'>
                <h1 className='font-extrabold text-3xl gap-x-10 text-center mt-8'>How It Works</h1>
                <p className='text-center'>A three-step visual workflow shared across both features</p>
            </div>

            <div className="flex justify-center items-center space-x-16 mt-8 mb-5 p-3">
                <div className='flex justify-center items-center border-2 border-white h-28 w-[290px]'>
                    <img src={Imageclassify} alt="" className='h-20 w-20' />
                    <h4 className='text-center text-lg'>
                        <NavLink to="/Food_Classification">Choose Image Analysis or Image Classification</NavLink>
                    </h4>
                </div>
                <div className='flex justify-center items-center border-2 border-white h-28 w-[290px] p-3'>
                    <img src={Thunder} alt="" className='h-20 w-20' />
                    <h4 className='text-center text-lg'>
                        <NavLink to="/Imagegen">Upload an image and Enter a prompt</NavLink>
                    </h4>
                </div>
                <div className='flex justify-center items-center border-2 border-white h-28 w-[290px] p-3'>
                    <img src={ImageGenerate} alt="" className='h-20 w-20' />
                    <h4 className='text-center text-lg'>
                        <NavLink to="/text_generation">Receive AI-powered Results in Seconds</NavLink>
                    </h4>
                </div>
            </div>


            <footer className="bg-gray-200 text-gray-800 py-3 mt-5">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 Thunder AI. All Rights Reserved.</p>
                    <p>
                        <NavLink to="/PrivacyPolicy" className="text-blue-500 hover:underline">Privacy Policy</NavLink> |{" "}
                        <NavLink to="/TermsOfService" className="text-blue-500 hover:underline">Terms of Service</NavLink>
                    </p>
                </div>
            </footer>





        </>
    );
};

export default Home;
