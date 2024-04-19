import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import ImageViewModal from "./ImageViewModal"; // Import the ImageViewModal component

const ImageCard = ({ image, onDelete }) => {
  const [isImageViewOpen, setIsImageViewOpen] = useState(false);

  const handleImageClick = () => {
    setIsImageViewOpen(true);
  };

  const handleCloseImageView = () => {
    setIsImageViewOpen(false);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <img
        src={`data:image/jpeg;base64,${image}`}
        alt="Image"
        className="w-full h-40 object-cover mb-4 cursor-pointer"
        onClick={handleImageClick} // Add onClick handler to display larger image
      />
      <div className="flex justify-between items-center">
        <div className="ml-auto">
          <button onClick={onDelete}>
            <AiOutlineDelete className="text-sky-800 text-2xl hover:text-sky-600" />
          </button>
        </div>
      </div>

      {/* ImageViewModal */}
      {isImageViewOpen && (
        <ImageViewModal
          imageUrl={`data:image/jpeg;base64,${image}`}
          onClose={handleCloseImageView}
        />
      )}
    </div>
  );
};

export default ImageCard;
