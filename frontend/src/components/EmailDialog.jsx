import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const EmailDialog = ({ isOpen, onClose, imagePath }) => {
  const [email, setEmail] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSend = async () => {
    if (!email) {
      enqueueSnackbar('Please enter a valid email', { variant: 'error' });
      return;
    }

    const subject = 'Captured Hytec Photo Booth';
    const text = 'Thank you for visiting Hytec Power Incorporated. Please find the captured image attached.';

    try {
      const response = await axios.post('http://localhost:5555/photos/send-email', {
        to: email,
        subject,
        text,
        imagePath,
      });
      enqueueSnackbar('Email sent successfully', { variant: 'success' });
      onClose();
    } catch (error) {
      enqueueSnackbar('Failed to send email', { variant: 'error' });
    }
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Send Email</h2>
        <input
          type="email"
          className="w-full p-2 border rounded mb-4"
          placeholder="Recipient Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSend}
          >
            Send
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailDialog;
