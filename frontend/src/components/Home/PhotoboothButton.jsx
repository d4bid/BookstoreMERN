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

      <a href="/devs">
  <h2 className="text-base lg:text-xl text-red-100 font-semibold mt-2 lg:mt-4">{title}</h2>
</a>
    </div>
  );
};

export default PhotoboothButton;
