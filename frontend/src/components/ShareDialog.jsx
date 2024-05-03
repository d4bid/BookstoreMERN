import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const ShareDialog = ({ isOpen, onClose, selectedImages, isMultiple }) => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [emailType, setEmailType] = useState('@gmail.com');
  const [customEmailType, setCustomEmailType] = useState('');
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSend = async () => {
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5555/photos/multiple", { ids: selectedImages });
      const images = response.data;

      let toEmail = recipientEmail + emailType;
      if (emailType === 'others') {
        toEmail = recipientEmail + customEmailType;
      }

      const emailData = {
        to: toEmail,
        subject: "Hytec Power Inc. Photo Booth",
        text: "Thank you for visiting Hytec Power Incorporated. Please find the attached images. For more information, visit us at https://hytecpower.com or contact Engr. Eric Jude S. Soliman, President & CEO, at 09175311624.",
        images: images
      };

      await axios.post("http://localhost:5555/photos/send-email-multiple", emailData);
      enqueueSnackbar("Email sent successfully", { variant: "success" });
      onClose();
      setRecipientEmail('');
      setEmailType('@gmail.com');
      setCustomEmailType('');
    } catch (error) {
      console.error('Error sending email with multiple photos:', error);
      enqueueSnackbar("Failed to send email", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleEmailTypeChange = (e) => {
    setEmailType(e.target.value);
    if (e.target.value !== 'others') {
      setCustomEmailType('');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Share Photos</h2>
        <div className="mb-4 flex items-center">
          <TextField
            variant="outlined"
            label="Recipient Email"
            type="email"
            className="w-70"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
          />
          <FormControl variant="outlined" className="ml-4">
            <Select
              value={emailType}
              onChange={handleEmailTypeChange}
            >
              <MenuItem value="@gmail.com">@gmail.com</MenuItem>
              <MenuItem value="@yahoo.com">@yahoo.com</MenuItem>
              <MenuItem value="@outlook.com">@outlook.com</MenuItem>
              <MenuItem value="others">Others</MenuItem>
            </Select>
          </FormControl>
        </div>
        {emailType === 'others' && (
          <div className="mb-4">
            <TextField
              variant="outlined"
              label="Custom Email Domain"
              className="w-full"
              value={customEmailType}
              onChange={(e) => setCustomEmailType(e.target.value)}
            />
          </div>
        )}
        <div className="flex justify-end mt-2">
          <LoadingButton
            onClick={handleSend}
            loading={loading}
            endIcon={<SendIcon />}
            variant="contained"
            sx={{ marginRight: 1 }}
            disabled={!recipientEmail}
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

export default ShareDialog;
