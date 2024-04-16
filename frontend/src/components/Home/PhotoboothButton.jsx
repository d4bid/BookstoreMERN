import React from 'react';
import { FaCamera } from 'react-icons/fa'; // Import the camera icon from react-icons

const PhotoboothButton = ({ onClick, title }) => {
  return (
    <div className="relative flex flex-col items-center animate-bounce">
      <button
        onClick={onClick}
        className="bg-red-500 text-white rounded-full p-4 flex items-center justify-center"
        style={{ width: '15vw', height: '15vw' }}
      >
        <FaCamera style={{ fontSize: '400%' }} />
      </button>
      {/* <h2 className="text-base lg:text-xl text-black font-semibold mt-2 lg:mt-4">{title}</h2> */}
    </div>
  );
};

export default PhotoboothButton;
