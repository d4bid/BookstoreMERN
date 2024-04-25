import React, { useState } from 'react';
import { FaImage } from 'react-icons/fa';
import UrlModal from '../UrlModal';  // Import the UrlModal component
import { useNavigate } from "react-router-dom";

const GalleryButton = ({ onCapture }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);  // State to control the modal
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // setIsModalOpen(true);
    navigate("/admin/gallery");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);  // Close the modal
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

      {/* Display UrlModal */}
      <UrlModal isOpen={isModalOpen} onClose={handleCloseModal} url="/admin/gallery" />
    </div>
  );
};

export default GalleryButton;
