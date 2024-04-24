import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import { RiMailSendFill } from "react-icons/ri";
import EmailDialog from '../EmailDialog'; // Import EmailDialog

const PreviewModal = ({ imageSrc, onClose }) => {
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

  const handleSendEmail = () => {
    setIsEmailDialogOpen(true);
  };

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Adjusted to black with opacity 0.2
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
      }}
    >
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: isAnimationFinished ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          backgroundColor: '#ffffff',
          padding: '1.6rem',
          borderRadius: '0.8rem',
          position: 'relative',
        }}
      >
        <img src={imageSrc} alt="Captured" className="w-full rounded-md" />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <button
            onClick={handleSendEmail}
            style={{
              backgroundColor: '#007bff',
              color: '#ffffff',
              padding: '0.5rem 1rem',
              borderRadius: '0.4rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              marginLeft: '0.5rem',
            }}
          >
            <RiMailSendFill style={{ marginRight: '0.5rem' }} /> Email
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
      </motion.div>
    </motion.div>
  );
};

export default PreviewModal;
