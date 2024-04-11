import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from 'notistack';
import ConfirmDialog from '../../components/ConfirmDialog';

const PartnerInfoModal = ({ partner, onClose, showDeleteButton = false }) => {
  const modalRef = useRef(null);
  const [editedPartner, setEditedPartner] = useState(partner);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

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
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSaveChanges = async () => {
    try {
      let base64Image = editedPartner.image; // Default to the current image
  
      if (image) {
        base64Image = await convertImageToBase64(image);
      }
  
      const requestData = {
        name: editedPartner.name,
        type: editedPartner.type,
        address: editedPartner.address || '',
        contact: editedPartner.contact || '',
        email: editedPartner.email || '',
        website: editedPartner.website || '',
        image: base64Image,
      };
  
      const response = await axios.put(`http://localhost:5555/partners/${partner._id}`, requestData);
  
      if (response.status === 200) {
        enqueueSnackbar('Partner updated successfully', { variant: 'success' });
        onClose();
        window.dispatchEvent(new Event('partnerUpdated')); // Trigger re-fetch in Parent Component
      }
    } catch (error) {
      enqueueSnackbar('Error updating partner', { variant: 'error' });
      console.log(error.message);
    }
  };
  
  const handleDelete = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5555/partners/${partner._id}`);
      if (response.status === 200) {
        enqueueSnackbar('Partner deleted successfully', { variant: 'success' });
        onClose();
        window.dispatchEvent(new Event('partnerUpdated')); // Trigger re-fetch in Parent Component
      }
    } catch (error) {
      enqueueSnackbar('Error deleting partner', { variant: 'error' });
      console.log(error.message);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg w-70vw p-6">
        <button className="absolute top-4 right-4 text-xl text-gray-500" onClick={handleCloseModal}>
          &times;
        </button>
        {imagePreview ? (
          <img src={imagePreview} alt={editedPartner.name} className="w-full h-40 object-cover rounded-lg mb-2" />
        ) : (
          editedPartner.image && (
            <img src={`data:image/png;base64,${editedPartner.image}`} alt={editedPartner.name} className="w-full h-40 object-cover rounded-lg mb-2" />
          )
        )}
        <div className="mb-4">
          <label htmlFor="imageInput" className="text-xl mr-4 text-gray-500">Change Image</label>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Name</label>
          <input
            type='text'
            name='name'
            value={editedPartner.name}
            onChange={handleInputChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Type</label>
          <select
            name='type'
            value={editedPartner.type}
            onChange={handleInputChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value='academe'>Academe</option>
            <option value='company'>Company</option>
          </select>
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Address</label>
          <input
            type='text'
            name='address'
            value={editedPartner.address || ''}
            onChange={handleInputChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
            placeholder='No address provided'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Contact</label>
          <input
            type='text'
            name='contact'
            value={editedPartner.contact || ''}
            onChange={handleInputChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
            placeholder='No contact provided'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Email</label>
          <input
            type='text'
            name='email'
            value={editedPartner.email || ''}
            onChange={handleInputChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
            placeholder='No email provided'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Website</label>
          <input
            type='text'
            name='website'
            value={editedPartner.website || ''}
            onChange={handleInputChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
            placeholder='No website provided'
          />
        </div>
        <div className="flex justify-between mt-4">
          {showDeleteButton && (
            <button className='p-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2' onClick={handleDelete}>
              Delete
            </button>
          )}
          <button className='p-2 bg-blue-500 text-white rounded hover:bg-blue-600' onClick={handleSaveChanges}>
            Save Changes
          </button>
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
