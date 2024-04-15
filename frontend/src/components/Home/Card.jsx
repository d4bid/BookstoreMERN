import React from 'react';

const Card = ({ title, description, icon: Icon, onClick }) => {
  return (
    <div
      className="bg-red-500 rounded-xl p-6 shadow-md cursor-pointer transition-transform duration-300 hover:scale-105 flex flex-col items-center justify-center text-center"
      onClick={onClick}
      style={{ width: '400px', height: '400px', margin: '45px' }}
    >
      <div className="mb-4">
        {Icon && <Icon className="text-9xl text-white" />}
      </div>
      <p className="text-5xl text-white font-semibold">{title}</p>
      {description && <p className="text-lg text-gray-600">{description}</p>}
    </div>
  );
};

export default Card;
