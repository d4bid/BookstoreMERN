// CaptureButton.jsx
import React from 'react';

const CaptureButton = ({ onCapture }) => {
  return (
    <button onClick={onCapture} className="bg-blue-500 text-white p-2 rounded-md">
      Capture
    </button>
  );
};

export default CaptureButton;
