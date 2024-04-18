import React, { useState, useEffect, useRef } from 'react';
import { FaSave, FaShare } from 'react-icons/fa';
import EmailDialog from '../EmailDialog'; // Import EmailDialog
import { RiMailSendFill } from "react-icons/ri";
import { BsSendFill } from "react-icons/bs";

const PreviewModal = ({ imageSrc, onClose, onSave }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false); // State for EmailDialog
  const [isSelectFocused, setIsSelectFocused] = useState(false); // State to track focus on Select
  const modalRef = useRef(null);

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setIsAnimationFinished(true);
    }, 300);

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target) && !isSelectFocused) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      clearTimeout(animationTimeout);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, isSelectFocused]);

  const handleSaveImage = async () => {
    onSave();
  };

  const handleSendEmail = () => {
    setIsEmailDialogOpen(true);
  };

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  const modalStyles = `
    fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 
    flex items-center justify-center z-50 transition-top duration-300 ease-in-out
  `;

  const contentStyles = `
    bg-white p-8 rounded-md opacity-${isAnimationFinished ? '100' : '0'} 
    transition-opacity duration-300 ease-in-out relative
  `;

  const buttonContainerStyles = `
    flex justify-end mt-4
  `;

  const emailButtonStyles = `
    bg-blue-500 text-white p-2 rounded cursor-pointer flex items-center ml-2
  `;

  const saveButtonStyles = `
    bg-green-500 text-white p-2 rounded cursor-pointer flex items-center ml-2
  `;

  return (
    <div className={modalStyles}>
      <div ref={modalRef} className={contentStyles}>
        <img src={imageSrc} alt="Captured" className="w-full rounded-md" />
        <div className={buttonContainerStyles}>
          <button onClick={handleSendEmail} className={emailButtonStyles}>
            <RiMailSendFill className="mr-2" /> Email
          </button>
          <button onClick={handleSaveImage} className={saveButtonStyles}>
            <FaSave className="mr-2" /> Save
          </button>
        </div>
        {/* EmailDialog */}
        {isEmailDialogOpen && (
          <EmailDialog 
            isOpen={isEmailDialogOpen} 
            onClose={() => setIsEmailDialogOpen(false)} 
            imagePath={imageSrc} 
            setIsSelectFocused={setIsSelectFocused} // Pass setIsSelectFocused to EmailDialog
          />
        )}
      </div>
    </div>
  );
};

export default PreviewModal;
