import React, { useState } from 'react';
import { FaImage } from 'react-icons/fa';

const GalleryButton = ({ onCapture }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleButtonClick = () => {
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 1000);
  };

  const handleTooltipClose = () => {
    setShowTooltip(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={handleButtonClick}
        className="bg-white text-red-500 rounded-full p-4 flex items-center justify-center"
        style={{ width: '20vw', height: '20vw', padding: '2rem', margin: '0 10px' }}
      >
        <FaImage className="h-10 sm:h-12 md:h-16 lg:h-20 xl:h-23 w-auto" />
      </button>

      {showTooltip && (
        <div
          className="bg-transparent text-red-500 py-2 px-4 rounded absolute bottom-0 left-1/4 transform -translate-x-1/2"
          onClick={handleTooltipClose}
        >
          w8, ginagawa pa pu. sorna
        </div>
      )}
    </div>
  );
};

export default GalleryButton;
