import React from 'react';

const Card = ({ title, description, onClick }) => {
  return (
    <div
      className="bg-red-500 rounded-xl p-6 shadow-md cursor-pointer transition-transform duration-300 hover:scale-105 flex flex-col items-center justify-center text-center"
      onClick={onClick}
      style={{ width: '400px', height: '400px', margin: '45px' }}
    >
      <h2 className="text-7xl text-black font-semibold mb-4">{title}</h2>
      {description && <p className="text-lg text-gray-600">{description}</p>}
    </div>
  );
};

export default Card;
