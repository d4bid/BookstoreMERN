// Slideshow.js
import React, { useState } from 'react';

const Slideshow = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextSlide = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
  };

  const goToPrevSlide = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
  };

  return (
    <div className="relative w-full h-64">
      <img 
        src={images[currentImageIndex]} 
        alt="Slideshow" 
        className="w-full h-full object-cover"
      />
      <button 
        onClick={goToPrevSlide} 
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1"
      >
        Prev
      </button>
      <button 
        onClick={goToNextSlide} 
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1"
      >
        Next
      </button>
    </div>
  );
};

export default Slideshow;
