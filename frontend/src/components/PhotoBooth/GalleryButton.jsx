import React from 'react';
import { FaImage } from 'react-icons/fa';


const GalleryButton = ({ onCapture }) => {
  return (
    <button onClick={onCapture} className="bg-white text-red-500  rounded-full p-4 flex items-center justify-center" style={{ width: '20vw', height: '20vw', padding: '2rem', margin: '0 10px' }}>
    <FaImage className="h-10 sm:h-12 md:h-16 lg:h-20 xl:h-23 w-auto" />
    </button>
  );
};

export default GalleryButton;
