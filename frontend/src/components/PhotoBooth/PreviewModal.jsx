import React, { useState, useEffect } from 'react';

const PreviewModal = ({ imageSrc, onClose, onSave, onSendEmail }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setIsAnimationFinished(true);
    }, 300); // Adjust the animation duration as needed

    return () => clearTimeout(animationTimeout);
  }, []);

  const handleSaveImage = async () => {
    onSave();
  };

  const handleSendEmail = () => {
    onSendEmail();
  };

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300); // Wait for the animation to finish before closing
  };

  const modalStyles = {
    position: 'fixed',
    top: isVisible ? '0' : '-100%', // Start off-screen
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    transition: 'top 0.3s ease-in-out', // Apply slide-in transition
  };

  const contentStyles = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    opacity: isAnimationFinished ? '1' : '0', // Fade in after slide-in animation finishes
    transition: 'opacity 0.3s ease-in-out', // Apply fade-in transition
  };

  return (
    <div style={modalStyles}>
      <div style={contentStyles}>
        <img src={imageSrc} alt="Captured" className="w-full rounded-md" />
        <div className="flex justify-between mt-2">
          <button onClick={handleSaveImage} className="bg-blue-500 text-white p-2 rounded-md mr-2">
            Save Image
          </button>
          <button onClick={handleSendEmail} className="bg-green-500 text-white p-2 rounded-md">
            Send to Email
          </button>
          <button onClick={closeModal} className="bg-red-500 text-white p-2 rounded-md ml-2">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
