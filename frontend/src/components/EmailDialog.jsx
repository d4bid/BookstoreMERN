import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';

const EmailDialog = ({ isOpen, onClose, imagePath, setIsSelectFocused, selectedImages, isMultiple }) => {
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [position, setPosition] = useState('');
  const [contact, setContact] = useState('');
  const [emailType, setEmailType] = useState('@gmail.com');
  const [email, setEmail] = useState('');
  const [customEmailType, setCustomEmailType] = useState('');
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const sessionID = localStorage.getItem('sessionId');

  useEffect(() => {
    const fetchLatestVisitor = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/visitors/latest/${sessionID}`);
        const latestVisitor = response.data;

        if (latestVisitor.sessionID === sessionID) {
          // Set name and organization
          setName(latestVisitor.name);
          setOrganization(latestVisitor.organization);
          setPosition(latestVisitor.position);
          setContact(latestVisitor.contact);

          // Split email address into name and domain
          const [namePart, domain] = latestVisitor.email.split('@');

          // Set email
          setEmail(namePart);

          // Check domain and set values accordingly
          if (domain === 'gmail.com') {
            setEmailType('@gmail.com');
          } else if (domain === 'yahoo.com') {
            setEmailType('@yahoo.com');
          } else if (domain === 'outlook.com') {
            setEmailType('@outlook.com');
          } else {
            setEmailType('others');
            setCustomEmailType(`@${domain}`);
          }
        }
      } catch (error) {
        console.log('There is no existing visitor log in this session.');
      }
    };

    if (isOpen) {
      fetchLatestVisitor();
    }
  }, [isOpen, sessionID]);


  const handleSendSingleImage = async () => {
    // Check if name, organization, and email are provided
    if (!name || !organization || !email || !sessionID) {
      enqueueSnackbar('Please fill all the required fields.', { variant: 'error' });
      return;
    }

    const completeEmail = customEmailType ? email + customEmailType : email + emailType;
    const subject = 'Hytec Power Inc. Photo Booth';
    const text = `Thank you for visiting Hytec Power Incorporated, ${name} from ${organization}. Please find the attached image. For more information, visit us at https://hytecpower.com or contact Engr. Eric Jude S. Soliman, President & CEO, at 09175311624.`;

    setLoading(true);

    try {
      // Log the visitor
      await axios.post('http://localhost:5555/visitors', {
        sessionID,
        name,
        organization,
        position,
        contact,
        email: completeEmail,
      });

      // Send the email with the image
      const response = await axios.post('http://localhost:5555/photos/send-email', {
        to: completeEmail,
        subject,
        text,
        imagePath,
      });

      if (response.status === 200) {
        enqueueSnackbar('Email sent successfully', { variant: 'success' });
        onClose();
      }
    } catch (error) {
      enqueueSnackbar('Failed to send email', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSendMultipleImages = async () => {
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5555/photos/multiple", { ids: selectedImages });
      const images = response.data;

      const completeEmail = customEmailType ? email + customEmailType : email + emailType;

      const emailData = {
        to: completeEmail,
        subject: "Hytec Power Inc. Photo Booth",
        text: `Thank you for visiting Hytec Power Incorporated, ${name} from ${organization}. Please find the attached image. For more information, visit us at https://hytecpower.com or contact Engr. Eric Jude S. Soliman, President & CEO, at 09175311624.`,
        images: images
      };

      await axios.post("http://localhost:5555/photos/send-email-multiple", emailData);
      enqueueSnackbar("Email sent successfully", { variant: "success" });
      onClose();
    } catch (error) {
      console.error('Error sending email with multiple photos:', error);
      enqueueSnackbar("Failed to send email", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSend = isMultiple ? handleSendMultipleImages : handleSendSingleImage;

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

  const handleContactChange = (e) => {
    const input = e.target.value;
    // Check if input is a number
    if (!isNaN(input)) {
      setContact(input);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{isMultiple ? 'Share Photos' : 'Share Photo'}</h2>
        <div className="mb-4">
          <TextField
            variant="outlined"
            label="Name"
            className="w-full mb-2"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <TextField
            variant="outlined"
            label="Organization"
            className="w-full mb-2"
            value={organization}
            placeholder='Company / School Name'
            required
            onChange={(e) => setOrganization(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <TextField
            variant="outlined"
            label="Position"
            className="w-full mb-2"
            value={position}
            placeholder='e.g. Student'
            required
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <div className='mb-4'>
            <TextField
              variant="outlined"
              label="Contact"
              className="w-full mb-2"
              value={contact}
              required
              onChange={handleContactChange}
            />
          </div>
        </div>
        <div className="flex mb-4">
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            className="w-70 p-2 border rounded-r-none"
            value={email}
            placeholder='e.g. juandelacruz'
            required
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
              placeholder='e.g. @edu.ph'
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
            disabled={!email || !name || !organization || !position || !contact}
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
