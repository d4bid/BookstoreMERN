import React from 'react';
import { FaCamera } from 'react-icons/fa'; // Import the camera icon from react-icons

const CaptureButton = ({ onCapture }) => {
  return (
    <button onClick={onCapture} className="bg-red-500 text-white rounded-full p-4 flex items-center justify-center" style={{ width: '200px', height: '200px' }}>
      <FaCamera className="h-20 w-20" />
    </button>
  );
};

export default CaptureButton;
