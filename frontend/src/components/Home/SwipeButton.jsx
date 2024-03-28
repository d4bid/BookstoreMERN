// SwipeButton.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from './Arrow';

const SwipeButton = () => {
  const [startX, setStartX] = useState(null);
  const [currentX, setCurrentX] = useState(null);
  const navigate = useNavigate();

  const handleTouchStart = (event) => {
    event.preventDefault();
    setStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event) => {
    event.preventDefault();
    setCurrentX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event) => {
    event.preventDefault();
    const endX = event.changedTouches[0].clientX;

    if (startX && endX - startX > 50) {
      navigate('/photobooth');
    }
    
    setStartX(null);
    setCurrentX(null);
  };

  const getArrowStyles = () => {
    if (startX && currentX) {
      const distance = currentX - startX;
      return {
        transform: `translateX(${distance}px)`,
      };
    }
    return {};
  };

  return (
    <div 
      className="relative flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-md shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute left-0 transform -translate-x-1/2">
        <Arrow direction="right" style={getArrowStyles()} />
      </div>
      <span className="ml-2">Swipe right to open Photobooth</span>
      {startX && (
        <div 
          className="absolute top-0 left-0 h-full bg-white opacity-30" 
          style={{ transform: `translateX(${currentX - startX}px)`, width: `${Math.abs(currentX - startX)}px` }}
        ></div>
      )}
    </div>
  );
};

export default SwipeButton;
