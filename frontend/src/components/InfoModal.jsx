import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const InfoModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSave = async () => {
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5555/visitors', {
        name,
        organization,
        address,
        contact,
        email,
      });

      //enqueueSnackbar('Visitor log created successfully.', { variant: 'success' });
      onClose();
      navigate('/photobooth');
      // Clearing the input fields
      setName('');
      setOrganization('');
      setAddress('');
      setContact('');
      setEmail('');
    } catch (error) {
      enqueueSnackbar('Please fill all the required fields.', { variant: 'error' });
    } finally {
      setLoading(false);
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
        <h2 className="text-xl font-semibold mb-4">Visitor Information</h2>
        <div className="mb-4">
          <TextField
            variant="outlined"
            label="Name"
            className="w-full"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <TextField
            variant="outlined"
            label="Organization / School"
            className="w-full"
            value={organization}
            required
            onChange={(e) => setOrganization(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <TextField
            variant="outlined"
            label="Address"
            className="w-full"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <TextField
            variant="outlined"
            label="Contact"
            className="w-full"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            className="w-full"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex justify-end mt-2">
          <LoadingButton
            onClick={handleSave}
            loading={loading}
            variant="contained"
            sx={{ marginRight: 2 }}
          >
            Save
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

export default InfoModal;
