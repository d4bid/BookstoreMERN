import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';

const EmailDialog = ({ isOpen, onClose, imagePath }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const { enqueueSnackbar } = useSnackbar();

  const handleSend = async () => {
    if (!email) {
      enqueueSnackbar('Please enter a valid email', { variant: 'error' });
      return;
    }

    const subject = 'Hytec Power Inc. Photo Booth';
    const text = 'Thank you for visiting Hytec Power Incorporated. Please find the attached image. For more information, visit us at https://hytecpower.com or contact Engr. Eric Jude S. Soliman, President & CEO, at 09175311624.';

    setLoading(true); // Set loading to true when sending email

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
    } finally {
      setLoading(false); // Reset loading state
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
        <TextField
          variant="outlined"
          label="Recipient Email"
          type="email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <LoadingButton
            onClick={handleSend}
            loading={loading}
            endIcon={<SendIcon />}
            variant="contained"
            sx={{ marginRight: 2 }} // Adjust margin as needed
          >
            Send
          </LoadingButton>
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
