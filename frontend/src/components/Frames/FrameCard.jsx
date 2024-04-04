import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import ImageViewModal from "../../components/ImageViewModal"; // Import the ImageViewModal component

const FrameCard = ({ frame, onDelete, onEdit }) => {
  const [isImageViewOpen, setIsImageViewOpen] = useState(false);

  const handleImageClick = () => {
    setIsImageViewOpen(true);
  };

  const handleCloseImageView = () => {
    setIsImageViewOpen(false);
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(frame._id);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <img
        src={`data:image/jpeg;base64,${frame.image}`}
        alt={frame.name}
        className="w-full h-40 object-cover mb-4 cursor-pointer"
        onClick={handleImageClick} // Add onClick handler to display larger image
      />
      <h2 className="text-xl font-semibold mb-2">{frame.name}</h2>
      <div className="flex justify-between items-center">
        {/* <Link to={`/frames/${frame._id}`}>
          <BsInfoCircle className="text-sky-800 text-2xl mr-2 hover:text-sky-600" />
        </Link> */}
        {/* <button onClick={handleEditClick}>
          <AiOutlineEdit className="text-sky-800 text-2xl mr-2 hover:text-sky-600" />
        </button> */}
        <div className="ml-auto">
          <button onClick={() => onDelete(frame._id)}>
            <AiOutlineDelete className="text-sky-800 text-2xl hover:text-sky-600" />
          </button>
        </div>
      </div>

      {/* ImageViewModal */}
      {isImageViewOpen && (
        <ImageViewModal
          imageUrl={`data:image/jpeg;base64,${frame.image}`}
          onClose={handleCloseImageView}
        />
      )}
    </div>
  );
};

export default FrameCard;
