import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

const Slideshow = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prev = () =>
    setCurrentImageIndex((curr) => (curr === 0 ? images.length - 1 : curr - 1));
  const next = () =>
    setCurrentImageIndex((curr) => (curr === images.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  return (
    <div className="relative">
      <div className="relative w-full h-0 overflow-hidden" style={{ paddingTop: "56.25%" }}>
        <div className="absolute inset-0 flex" style={{ width: `${(images.length + 2) * 100}%`, transform: `translateX(-${(currentImageIndex + 1) * (100 / (images.length + 2))}%)`, transition: "transform 0.5s ease-in-out" }}>
          <img
            src={images[images.length - 1]}
            alt="Slideshow"
            className="w-full h-full object-cover"
            style={{ flex: `0 0 ${100 / (images.length + 2)}%` }}
          />
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="Slideshow"
              className="w-full h-full object-cover"
              style={{ flex: `0 0 ${100 / (images.length + 2)}%` }}
            />
          ))}
          <img
            src={images[0]}
            alt="Slideshow"
            className="w-full h-full object-cover"
            style={{ flex: `0 0 ${100 / (images.length + 2)}%` }}
          />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <ChevronLeft size={40} />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <ChevronRight size={40} />
        </button>
      </div>
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              className={`transition-all w-3 h-3 bg-white rounded-full ${
                currentImageIndex === i ? "p-2" : "bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
