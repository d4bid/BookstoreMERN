import React, { useState } from 'react';
import { FaImage } from 'react-icons/fa';

const GalleryButton = ({ onCapture }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleButtonClick = () => {
    setShowTooltip(true);
    setClickCount(prevCount => prevCount + 1);
    setTimeout(() => {
      setShowTooltip(false);
    }, 1500);
  };

  const handleTooltipClose = () => {
    setShowTooltip(false);
  };

  let tooltipMessage = 'w8, ginagawa pa pu.';
  if (clickCount === 1) {
    tooltipMessage = 'w8, ginagawa pa pu.sorna';
  } else if (clickCount === 2) {
    tooltipMessage = ' ginagawa pa pu.';
  } else if (clickCount ===3) {
    tooltipMessage = `ginagawa pa nga ih`;
  } else if (clickCount ===4) {
    tooltipMessage = `luh`;
  }
  else if (clickCount ===5) {
    tooltipMessage = `ang kulit ah`;
  }
  else if (clickCount ===6) {
    tooltipMessage = `sabing ginagawa pa`;
  }

  else if (clickCount ===7) {
    tooltipMessage = `ayy sige, hindi ko tutuloy 'to`;
  }

  else if (clickCount ===8) {
    tooltipMessage = `kulit, kaya ka iniiwan eh`;
  }

  else if (clickCount ===9) {
    tooltipMessage = `jk sorry, w8 lang kasi`;
    setClickCount(0)
  }

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
          {tooltipMessage}
        </div>
      )}
    </div>
  );
};

export default GalleryButton;
