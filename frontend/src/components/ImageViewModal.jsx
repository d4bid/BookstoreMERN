import React from "react";

const ImageViewModal = ({ imageUrl, onClose }) => {
  return (
    <div 
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50" 
      onClick={onClose}
    >
      <div className="relative w-3/4 h-3/4 flex justify-center items-center">
        <img src={imageUrl} alt="Large Frame" className="max-w-full max-h-full object-contain" />
      </div>
    </div>
  );
};

export default ImageViewModal;
