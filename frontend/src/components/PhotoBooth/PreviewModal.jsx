import React, { useState, useEffect, useRef } from 'react';
import { FaSave, FaShare } from 'react-icons/fa';
import EmailDialog from '../EmailDialog'; // Import EmailDialog

const PreviewModal = ({ imageSrc, onClose, onSave }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false); // State for EmailDialog
  const modalRef = useRef(null);

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setIsAnimationFinished(true);
    }, 300);

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      clearTimeout(animationTimeout);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

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

  const modalStyles = {
    position: 'fixed',
    top: isVisible ? '0' : '-100%', // Start off-screen
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '999', // Ensure modal covers the entire page
    transition: 'top 0.3s ease-in-out', // Apply slide-in transition
  };

  const contentStyles = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    opacity: isAnimationFinished ? '1' : '0', // Fade in after slide-in animation finishes
    transition: 'opacity 0.3s ease-in-out', // Apply fade-in transition
    position: 'relative', // Ensure absolute positioning of close button
  };

  const buttonContainerStyles = {
    display: 'flex',
    justifyContent: 'flex-end', // Move buttons to the right
    marginTop: '10px',
  };

  const buttonStyles = {
    border: '2px solid red', // Add red border
    backgroundColor: 'white',
    color: 'red',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center', // Align icon and text vertically
    marginLeft: '10px', // Add margin between buttons
  };

  return (
    <div style={modalStyles}>
      <div ref={modalRef} style={contentStyles}>
        <img src={imageSrc} alt="Captured" className="w-full rounded-md" />
        <div style={buttonContainerStyles}>
          <button onClick={handleSendEmail} style={buttonStyles}>
            <FaShare style={{ marginRight: '5px' }} /> Share
          </button>
          <button onClick={handleSaveImage} style={buttonStyles}>
            <FaSave style={{ marginRight: '5px' }} /> Save
          </button>
        </div>
        {/* EmailDialog */}
        {isEmailDialogOpen && (
          <EmailDialog 
            isOpen={isEmailDialogOpen} 
            onClose={() => setIsEmailDialogOpen(false)} 
            imagePath={imageSrc} 
          />
        )}
      </div>
    </div>
  );
};

export default PreviewModal;
