import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { FaSave, FaTrash } from "react-icons/fa"; // Importing react-icons
import ConfirmDialog from "../../components/ConfirmDialog";
import UrlModal from '../../components/UrlModal'; // Importing UrlModal
import { useNavigate } from 'react-router-dom';

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

  const handleVisitWebsite = () => {
    setRedirectUrl(
      editedPartner.website.startsWith('http') ? editedPartner.website : `http://${editedPartner.website}`
    );
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCloseModal();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg w-70vw p-6">
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
            <label htmlFor="imageInput" className="text-xl mr-4 text-gray-500">
              Change Image
            </label>
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
          <label className="text-xl mr-4 text-gray-500">Name</label>
          <input
            type="text"
            name="name"
            value={editedPartner.name}
            onChange={isAdmin ? handleInputChange : null}
            readOnly={!isAdmin}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        {isAdmin && (
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Type</label>
            <select
              name="type"
              value={editedPartner.type}
              onChange={handleInputChange}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            >
              <option value="academe">Academe</option>
              <option value="company">Company</option>
            </select>
          </div>
        )}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Address</label>
          <input
            type="text"
            name="address"
            value={editedPartner.address || ""}
            onChange={isAdmin ? handleInputChange : null}
            readOnly={!isAdmin}
            className="border-2 border-gray-500 px-4 py-2 w-full"
            placeholder="No address provided"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Contact</label>
          <input
            type="text"
            name="contact"
            value={editedPartner.contact || ""}
            onChange={isAdmin ? handleInputChange : null}
            readOnly={!isAdmin}
            className="border-2 border-gray-500 px-4 py-2 w-full"
            placeholder="No contact provided"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Email</label>
          <input
            type="text"
            name="email"
            value={editedPartner.email || ""}
            onChange={isAdmin ? handleInputChange : null}
            readOnly={!isAdmin}
            className="border-2 border-gray-500 px-4 py-2 w-full"
            placeholder="No email provided"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Website</label>
          <div className="flex items-center">
            <input
              type="text"
              name="website"
              value={editedPartner.website || ""}
              onChange={isAdmin ? handleInputChange : null}
              readOnly={!isAdmin}
              className="border-2 border-gray-500 px-4 py-2 w-full mr-2"
              placeholder="No website provided"
            />
            {editedPartner.website && (
              <button
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleVisitWebsite}
              >
                Visit
              </button>
            )}
          </div>
          {redirectUrl && (
            <UrlModal
              isOpen={true}
              onClose={() => setRedirectUrl(null)}
              url={redirectUrl}
            />
          )}
        </div>

        <div className="flex justify-end mt-4"> {/* Changed justify-between to justify-end */}
          {isAdmin && (
            <button
              className="p-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2 w-20 flex items-center justify-center"  // Adjusted width and added flex and items-center
              onClick={handleDelete}
            >
              <FaTrash className="mr-1" /> Delete
            </button>
          )}
          {isAdmin && (
            <button
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-20 flex items-center justify-center"  // Adjusted width and added flex and items-center
              onClick={handleSaveChanges}
            >
              <FaSave className="mr-1" /> Save
            </button>
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
