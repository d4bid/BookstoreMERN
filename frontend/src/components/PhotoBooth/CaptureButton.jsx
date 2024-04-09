import React from 'react';
import { FaCamera } from 'react-icons/fa';

const CaptureButton = ({ onCapture }) => {
  return (
    <button onClick={onCapture} className="bg-red-500 text-white rounded-full p-4 flex items-center justify-center" style={{ width: '80vw', height: 'auto', padding: '2rem', margin: '0 10px' }}>
      <FaCamera className="h-20 w-20 mr-2" />
      <span className="text-xl">Tap to Capture</span>
    </button>
  );
};

export default CaptureButton;
