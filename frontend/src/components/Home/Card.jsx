import React, { useState } from 'react';

const Card = ({ title, description, icon: Icon, onClick }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    // Additional logic if needed
    if (onClick) {
      onClick();
    }
    // Revert to original state after transition completes
    setTimeout(() => {
      setClicked(false);
    }, 300); // Adjust this timeout to match your CSS transition duration
  };

  return (
    <div
      className={`rounded-xl p-6 shadow-xl cursor-pointer transition-transform duration-300 hover:scale-105 flex flex-col items-center justify-center text-center ${
        clicked ? 'bg-red-500' : 'bg-white'
      }`}
      onClick={handleClick}
      style={{ width: '30vw', height: '30vw', margin: '3vw' }} // Adjusted margin for responsiveness
    >
      <div className="mb-4">
        {Icon && (
          <Icon
            className={`text-4xl lg:text-8xl ${
              clicked ? 'text-white' : 'text-red-500'
            }`}
          />
        )}
      </div>
      <p
        className={`text-base lg:text-4xl ${
          clicked ? 'text-white' : 'text-red-500'
        } font-semibold`}
      >
        {title}
      </p>
      {description && (
        <p
          className={`text-2.5vw ${
            clicked ? 'text-white' : 'text-gray-600'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default Card;
