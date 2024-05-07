import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;
const ModalContainer = styled(motion.div)`
  width: 80%; /* Adjust width as needed */
  max-width: 70vw; /* Set maximum width if necessary */
  height: 70vh; /* Allow height to adjust based on content */
  max-height: 80vh; /* Set maximum height if necessary */
  overflow: auto; /* Add scrollbar if content overflows */
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
`;
const modalVariant = {
  initial: { opacity: 0 },
  isOpen: { opacity: 1 },
  exit: { opacity: 0 }
};
const containerVariant = {
  initial: { top: "-50%", transition: { type: "spring" } },
  isOpen: { top: "50%" },
  exit: { top: "-50%" }
};

const UrlModal = ({ isOpen, onClose, url }) => {
  const modalRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={"initial"}
          animate={"isOpen"}
          exit={"exit"}
          variants={modalVariant}
        >
          <ModalContainer variants={containerVariant} ref={modalRef}>
            <div className="relative p-8 bg-white w-fulll h-full max-w-3xl max-h-3xl m-auto flex-col flex rounded-md transition-opacity duration-300 ease-in-out">
              <button
                className="absolute top-4 right-4 text-xl text-gray-600"
                onClick={onClose}
              >
                &times;
              </button>
              {isLoading ? (
                <div className='flex space-x-2 justify-center items-center bg-white h-screen'>
                  <span className='sr-only'>Loading...</span>
                  <div className='h-8 w-8 bg-red-500 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                  <div className='h-8 w-8 bg-red-500 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                  <div className='h-8 w-8 bg-red-500 rounded-full animate-bounce'></div>
                </div>
              ) : (
                <iframe
                  src={url}
                  title="Modal Content"
                  className="w-full h-full"
                  style={{ border: 'none' }}
                ></iframe>
              )}
            </div>
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default UrlModal;
