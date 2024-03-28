import React from 'react';

const PreviewModal = ({ imageSrc, onClose, onSave, onSendEmail }) => {
  const handleSaveImage = async () => {
    onSave();
  };

  const handleSendEmail = () => {
    onSendEmail();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-4 rounded-md">
        <img src={imageSrc} alt="Captured" className="w-full rounded-md" />
        <div className="flex justify-between mt-2">
          <button onClick={handleSaveImage} className="bg-blue-500 text-white p-2 rounded-md mr-2">
            Save Image
          </button>
          <button onClick={handleSendEmail} className="bg-green-500 text-white p-2 rounded-md">
            Send to Email
          </button>
          <button onClick={onClose} className="bg-red-500 text-white p-2 rounded-md ml-2">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
