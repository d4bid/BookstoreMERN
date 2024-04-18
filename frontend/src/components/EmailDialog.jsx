import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const EmailDialog = ({ isOpen, onClose, imagePath, setIsSelectFocused }) => {
  const [emailType, setEmailType] = useState('@gmail.com');
  const [email, setEmail] = useState('');
  const [customEmailType, setCustomEmailType] = useState('');
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSend = async () => {
    const completeEmail = customEmailType ? email + customEmailType : email + emailType;
    const subject = 'Hytec Power Inc. Photo Booth';
    const text = 'Thank you for visiting Hytec Power Incorporated. Please find the attached image. For more information, visit us at https://hytecpower.com or contact Engr. Eric Jude S. Soliman, President & CEO, at 09175311624.';

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5555/photos/send-email', {
        to: completeEmail,
        subject,
        text,
        imagePath,
      });
      enqueueSnackbar('Email sent successfully', { variant: 'success' });
      onClose();
    } catch (error) {
      enqueueSnackbar('Failed to send email', { variant: 'error' });
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

  const handleCustomEmailTypeChange = (e) => {
    setCustomEmailType(e.target.value);
  };

  const handleSelectFocus = () => {
    setIsSelectFocused(true); 
  };

  const handleSelectBlur = () => {
    setIsSelectFocused(false); 
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Send Email</h2>
        <div className="flex mb-4">
          <TextField
            variant="outlined"
            label="Recipient Email"
            type="email"
            className="w-70 p-2 border rounded-r-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl variant="outlined" className="border rounded-l-none">
            <Select
              value={emailType}
              onChange={handleEmailTypeChange}
              onFocus={handleSelectFocus}
              onBlur={handleSelectBlur}
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
              placeholder='e.g. @edu.com'
              onChange={handleCustomEmailTypeChange}
            />
          </div>
        )}
        <div className="flex justify-end mt-2">
          <LoadingButton
            onClick={handleSend}
            loading={loading}
            endIcon={<SendIcon />}
            variant="contained"
            sx={{ marginRight: 2 }}
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
