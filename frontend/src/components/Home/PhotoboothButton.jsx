import React from 'react';
import { FaCamera } from 'react-icons/fa';


const PhotoboothButton = ({ onClick, title }) => {
  return (
    <div className="relative flex flex-col items-center ">
      <button
        onClick={onClick}
        className="bg-red-500 text-white rounded-full p-4 flex items-center justify-center animate-bounce"
        style={{ width: '15vw', height: '15vw' }}
      >
      <FaCamera style={{ fontSize: '400%' }} />
      </button>


    </div>
  );
};

export default PhotoboothButton;
