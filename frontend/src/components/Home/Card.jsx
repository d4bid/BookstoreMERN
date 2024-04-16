import React from 'react';

const Card = ({ title, description, icon: Icon, onClick }) => {
  return (
    <div
      className="bg-white rounded-xl p-6 shadow-md cursor-pointer transition-transform duration-300 hover:scale-105 flex flex-col items-center justify-center text-center border-2 border-red-500"
      onClick={onClick}
      style={{ width: '30vw', height: '30vw', margin: '3vw' }} // Adjusted margin for responsiveness
    >
      <div className="mb-4">
        {Icon && <Icon className="text-4xl lg:text-8xl text-red-500" />} {/* Adjusted icon size using vw units */}
      </div>
      <p className="text-base lg:text-4xl text-red-500 font-semibold">{title}</p> {/* Adjusted title font size using vw units */}
      {description && <p className="text-2.5vw text-gray-600">{description}</p>} {/* Adjusted description font size using vw units */}
    </div>
  );
};

export default Card;
