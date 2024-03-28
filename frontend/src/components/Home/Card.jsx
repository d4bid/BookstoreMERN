// Card.jsx
import React from 'react';

const Card = ({ title, description, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg p-4 shadow-md cursor-pointer transition-transform duration-300 hover:scale-105 flex flex-col items-center justify-center flex-grow"
      onClick={onClick}
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
};

export default Card;
