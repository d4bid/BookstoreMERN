import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { FaSave, FaTrash } from "react-icons/fa"; // Importing react-icons
import ConfirmDialog from "../../components/ConfirmDialog";
import UrlModal from '../../components/UrlModal'; // Importing UrlModal
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

const PartnerInfoModal = ({ partner, onClose, isAdmin }) => {
  const modalRef = useRef(null);
  const [editedPartner, setEditedPartner] = useState(partner);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [redirectUrl, setRedirectUrl] = useState(null); // Added redirectUrl state
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate(); // Added useNavigate

  const handleCloseModal = () => {
    onClose();
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    previewImage(selectedImage);
  };

  const previewImage = (image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedPartner({
      ...editedPartner,
      [name]: value,
    });
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSaveChanges = async () => {
    try {
      let base64Image = editedPartner.image ? editedPartner.image.base64 : '';

      if (image) {
        base64Image = await convertImageToBase64(image);
      } else if (imagePreview) {
        const base64ImageFromPreview = await convertImageToBase64(imagePreview);
        base64Image = base64ImageFromPreview;
      }

      const requestData = {
        name: editedPartner.name,
        type: editedPartner.type,
        address: editedPartner.address || '',
        contact: editedPartner.contact || '',
        email: editedPartner.email || '',
        website: editedPartner.website || '',
        image: {
          base64: base64Image,
          subType: "00",
        },
      };

      const response = await axios.put(`http://localhost:5555/partners/${partner._id}`, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        enqueueSnackbar('Partner updated successfully', { variant: 'success' });
        onClose();
        window.dispatchEvent(new Event('partnerUpdated'));
      }
    } catch (error) {
      enqueueSnackbar(`Error updating partner: ${error.response ? error.response.data.message : error.message}`, { variant: 'error' });
      console.log(error.response ? error.response.data.message : error.message);
    }
  };

  const handleDelete = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5555/partners/${partner._id}`
      );
      if (response.status === 200) {
        enqueueSnackbar("Partner deleted successfully", { variant: "success" });
        onClose();
        window.dispatchEvent(new Event("partnerUpdated"));
      }
    } catch (error) {
      enqueueSnackbar("Error deleting partner", { variant: "error" });
      console.log(error.message);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target) &&
      event.target.tagName !== "UL" &&
      event.target.tagName !== "LI" &&
      event.target.tagName !== "INPUT" &&
      event.target.tagName !== "SELECT" &&
      event.target.tagName !== "OPTION"
    ) {
      handleCloseModal();
    }
  };


  return (
    <div className="fixed flex scale-150 top-0 left-0 w-full h-full bg-black bg-opacity-50 justify-center items-center z-999">
      <div ref={modalRef} className="bg-white rounded-lg max-w-width p-6">
        <button
          className="absolute top-4 right-4 text-xl text-gray-500"
          onClick={handleCloseModal}
        >
          &times;
        </button>
        {imagePreview ? (
          <img
            src={imagePreview}
            alt={editedPartner.name}
            className="w-full h-40 object-cover rounded-lg mb-2"
            style={{ objectFit: 'contain' }}
          />
        ) : (
          editedPartner.image && (
            <img
              src={`data:image/png;base64,${editedPartner.image}`}
              alt={editedPartner.name}
              className="w-full h-40 object-cover rounded-lg mb-2"
              style={{ objectFit: 'contain' }}
            />
          )
        )}

        {isAdmin && (
          <div className="mb-4">
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
        )}
        <div className="my-4">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            name="name"
            value={editedPartner.name}
            onChange={isAdmin ? handleInputChange : null}
            readOnly={!isAdmin}
            fullWidth
          />
        </div>
        {isAdmin && (
          <div className="my-4">
            <FormControl fullWidth>
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                labelId="type-label"
                id="outlined-basic"
                name="type"
                value={editedPartner.type}
                onChange={handleInputChange}
                variant="outlined"
                label="Type"
              >
                <MenuItem value="academe">Academe</MenuItem>
                <MenuItem value="company">Company</MenuItem>
              </Select>
            </FormControl>
          </div>
        )}

        <div className="my-4">
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            name="address"
            value={editedPartner.address || ""}
            onChange={isAdmin ? handleInputChange : null}
            readOnly={!isAdmin}
            fullWidth
            placeholder="No address provided"
          />
        </div>
        <div className="my-4">
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            name="contact"
            value={editedPartner.contact || ""}
            onChange={isAdmin ? handleInputChange : null}
            readOnly={!isAdmin}
            fullWidth
            placeholder="No contact provided"
          />
        </div>
        <div className="my-4">
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="email"
            value={editedPartner.email || ""}
            onChange={isAdmin ? handleInputChange : null}
            readOnly={!isAdmin}
            fullWidth
            placeholder="No email provided"
          />
        </div>
        <div className="my-4">
          <TextField
            id="outlined-basic"
            label="Website"
            variant="outlined"
            name="website"
            value={editedPartner.website || ""}
            onChange={isAdmin ? handleInputChange : null}
            readOnly={!isAdmin}
            fullWidth
            placeholder="No website provided"
          />
          {redirectUrl && (
            <UrlModal
              isOpen={true}
              onClose={() => setRedirectUrl(null)}
              url={redirectUrl}
            />
          )}
        </div>

        <div className="flex justify-end mt-4">
          {isAdmin && (
            <Button
              variant="contained"
              color="secondary"
              className="mr-2"
              startIcon={<FaTrash />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}
          {isAdmin && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<FaSave />}
              onClick={handleSaveChanges}
            >
              Save
            </Button>
          )}
        </div>

        <ConfirmDialog
          title="Confirm Delete"
          message="Are you sure you want to delete this partner?"
          isOpen={isConfirmOpen}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  );
};

export default PartnerInfoModal;