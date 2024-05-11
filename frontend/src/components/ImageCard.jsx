import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import ImageViewModal from "./ImageViewModal";
import { FormControlLabel } from '@mui/material';
import IOSSwitch from './IOSSwitch'; 
import { RiDeleteBin5Fill } from "react-icons/ri";

const ImageCard = ({ image, isActive, _id, onDelete, onSwitchChange, onOpenModal, onCloseModal, isModalOpen }) => {
  const [isImageViewOpen, setIsImageViewOpen] = useState(false);

  const handleImageClick = () => {
    onOpenModal(); // Open the modal
    setIsImageViewOpen(true);
  };

  const handleCloseImageView = () => {
    onCloseModal(); // Close the modal
    setIsImageViewOpen(false);
  };

  const handleSwitchChange = () => {
    if (!isModalOpen) { // Check if the modal is open
      onSwitchChange(!isActive);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <img
        src={`data:image/jpeg;base64,${image}`}
        alt="Image"
        className="w-full h-40 object-cover mb-4 cursor-pointer"
        onClick={handleImageClick}
      />
      <div className="flex justify-between items-center"> {/* Changed items-right to items-center */}
        <div className="flex items-center"> {/* Changed items-right to items-center */}
          {!isModalOpen && ( // Render switch only when modal is not open
            <FormControlLabel
              control={
                <IOSSwitch
                  checked={isActive}
                  onChange={handleSwitchChange}
                  name="isActive"
                  />
                }
            />
          )}
        </div>
        <div className="ml-auto">
          <button onClick={onDelete}>
            <RiDeleteBin5Fill className="text-red-600 text-2xl hover:text-red-500" />
          </button>
        </div>
      </div>
  
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
