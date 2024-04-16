import React, { useState, useEffect, useRef } from 'react';
import { FaSave, FaShare } from 'react-icons/fa'; // Importing save and share icons

const PreviewModal = ({ imageSrc, onClose, onSave, onSendEmail }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setIsAnimationFinished(true);
    }, 300); // Adjust the animation duration as needed

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
    onSendEmail();
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
    justifyContent: 'space-between', // Arrange buttons with equal space between them
    marginTop: '10px',
  };

  const buttonStyles = {
    backgroundColor: 'red',
    color: 'white',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center', // Align icon and text vertically
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
      </div>
    </div>
  );
};

export default PreviewModal;
