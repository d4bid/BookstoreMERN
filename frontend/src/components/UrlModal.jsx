import React, { useRef, useEffect } from 'react';

const UrlModal = ({ isOpen, onClose, url }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Add event listener to detect clicks outside the modal
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Remove event listener on cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
//
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
      <div ref={modalRef} className="relative p-8 bg-white w-3/4 h-3/4 max-w-3xl max-h-3xl m-auto flex-col flex rounded-md">
        <button
          className="absolute top-4 right-4 text-xl text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
        <iframe
          src={url}
          title="Modal Content"
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default UrlModal;
