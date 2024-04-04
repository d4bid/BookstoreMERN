import React from 'react';
import { FaCamera } from 'react-icons/fa'; // Import the camera icon from react-icons

const PhotoboothButton = ({ onClick, title }) => {
  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
      <button
        onClick={onClick}
        className="bg-red-500 text-white rounded-full p-4 flex items-center justify-center"
        style={{ width: '200px', height: '200px' }}
      >
        <FaCamera className="h-20 w-20" />
      </button>
      <h2 className="text-xl text-black font-semibold mt-4">{title}</h2>
    </div>
  );
};

export default PhotoboothButton;
