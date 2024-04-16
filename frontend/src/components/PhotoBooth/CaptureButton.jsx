import React from 'react';
import { FaCamera } from 'react-icons/fa';

const CaptureButton = ({ onCapture }) => {
  return (
    <button onClick={onCapture} className="bg-red-500 text-white rounded-full p-4 flex items-center justify-center" style={{ width: '80vw', height: '7vh', padding: '2rem', margin: '0 10px' }}>
    <FaCamera className="h-10 sm:h-12 md:h-16 lg:h-20 xl:h-23 w-auto mr-4" />
      <span className="text-lg sm:text-base md:text-lg lg:text-5xl xl:text-6xl"> Tap to Capture</span>
    </button>
  );
};

export default CaptureButton;
