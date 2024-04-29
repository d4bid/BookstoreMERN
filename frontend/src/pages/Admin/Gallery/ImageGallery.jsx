import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../../components/Spinner";
import PhotoCard from "../../../components/PhotoCard";
import BackButton from "../../../components/BackButtonHome";
import hytecLogo from "../../../assets/hytecLogo.png";
import { MdOutlineChecklist, MdOutlineIosShare, MdDeleteForever, MdOutlineCancel } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { useSnackbar } from 'notistack'; // Import enqueueSnackbar
import ConfirmDialog from '../../../components/ConfirmDialog'; // Import the ConfirmDialog component

const ImageGallery = ({ isAdmin = true }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showBackButton, setShowBackButton] = useState(true);
  const [checklistMode, setChecklistMode] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const { enqueueSnackbar } = useSnackbar(); // Use enqueueSnackbar for displaying messages

  // Confirmation dialog state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmImageIds, setConfirmImageIds] = useState([]);

  useEffect(() => {
    setLoading(true);
    isAdmin ? fetchImagesAdmin() : fetchImages();
    window.addEventListener('newImagesAdded', isAdmin ? fetchImagesAdmin : fetchImages);
    return () => {
      window.removeEventListener('newImagesAdded', isAdmin ? fetchImagesAdmin : fetchImages);
    };
  }, [isAdmin]);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:5555/photos/user-gallery");
      setImages(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchImagesAdmin = async () => {
    try {
      const response = await axios.get("http://localhost:5555/photos/");
      setImages(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const toggleActions = () => {
    setShowActions(!showActions);
    setShowBackButton(!showBackButton);
    setChecklistMode(!checklistMode);

    // Clear selected images when checklist mode is toggled off
    if (checklistMode) {
      setSelectedImages([]);
    }
  };

  const toggleBackButton = () => {
    setShowActions(false);
    setShowBackButton(true);
    setChecklistMode(false);

    // Clear selected images when checklist mode is toggled off
    if (checklistMode) {
      setSelectedImages([]);
    }
  };

  const handleSelectImage = (imageId) => {
    setSelectedImages(prevSelectedImages => {
      const newSelectedImages = prevSelectedImages.includes(imageId)
        ? prevSelectedImages.filter(id => id !== imageId)
        : [...prevSelectedImages, imageId];

      console.log("Selected Images:", newSelectedImages); // Log selected images
      return newSelectedImages;
    });
  };

  // Function to delete selected images
  const handleDeleteSelected = async () => {
    // Check if there are selected images
    if (selectedImages.length === 0) {
      // If no items are selected, display a message using enqueueSnackbar
      enqueueSnackbar("No items selected for deletion", { variant: "info" });
      return;
    }

    // Open the confirmation dialog
    handleOpenConfirmDialog(selectedImages);
  };

  // Confirmation dialog handlers
  const handleOpenConfirmDialog = (imageIds) => {
    setConfirmImageIds(imageIds);
    setIsConfirmOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setIsConfirmOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      // Send a DELETE request to delete-multiple endpoint
      await axios.delete("http://localhost:5555/photos/delete-multiple", { data: { ids: confirmImageIds } });

      // Refresh images after deletion
      isAdmin ? fetchImagesAdmin() : fetchImages();

      // Clear selected images after deletion
      setSelectedImages([]);

      // Display success message using enqueueSnackbar
      enqueueSnackbar("Selected items deleted successfully", { variant: "success" });

      // Close the confirmation dialog
      handleCloseConfirmDialog();
    } catch (error) {
      console.error('Error deleting selected items:', error);
      // Handle error, display error message, etc.
      enqueueSnackbar("Failed to delete selected items", { variant: "error" });
      // Close the confirmation dialog
      handleCloseConfirmDialog();
    }
  };

  const handleCancelDelete = () => {
    // Close the confirmation dialog without deleting
    handleCloseConfirmDialog();
  };

  return (
    <div className="relative">

  {/* Nav bar */}
      <div className="w-full flex items-center justify-between fixed top-0 z-10 bg-white">
        {showBackButton ? (
          <BackButton destination="/photobooth" />
        ) : (
          <button className="bg-white text-red-500 rounded-full p-4 flex items-center justify-center" onClick={toggleBackButton} style={{ width: '20vw', height: '20vw', padding: '2rem', margin: '0 10px' }}>
            <MdOutlineCancel className="h-10 sm:h-12 md:h-16 lg:h-20 xl:h-23 w-auto" />
          </button>
        )}
        <div className="flex-grow" style={{ maxWidth: "20vw" }}>
          <img src={hytecLogo} alt="Photo Booth" />
        </div>
        <button className="bg-white text-red-500 rounded-full p-4 flex items-center justify-center" onClick={toggleActions} style={{ width: '20vw', height: '20vw', padding: '2rem', margin: '0 10px' }}>
          <MdOutlineChecklist className="h-10 sm:h-12 md:h-16 lg:h-20 xl:h-23 w-auto" />
        </button>
      </div>

      <div style={{ paddingTop: '13rem', paddingBottom: '13rem' }}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
              {images.map((image) => (
                <div key={image._id} className="flex justify-center">
                  <PhotoCard
                    image={image.image}
                    alt={image.alt}
                    checklistMode={checklistMode}
                    onSelectImage={() => handleSelectImage(image._id)}
                    isSelected={selectedImages.includes(image._id)}
                  />
                </div>
              ))}
            </div>
            {!isAdmin && (
              <p className="text-center text-gray-500 mt-4">NOTE: Only pictures taken within the day are displayed here.</p>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {showActions && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="w-full flex items-center justify-between fixed bottom-0 z-10 bg-red-500 px-4"
          >
            <button className="bg-red-500 text-white rounded-full p-4 flex items-center justify-center" style={{ width: '20vw', height: '20vw', padding: '2rem', margin: '0 10px' }}>
              <MdOutlineIosShare className="h-10 sm:h-12 md:h-16 lg:h-20 xl:h-23 w-auto" />
            </button>
            <button
              className="bg-red-500 text-white rounded-full p-4 flex items-center justify-center"
              onClick={handleDeleteSelected}
              style={{ width: '20vw', height: '20vw', padding: '2rem', margin: '0 10px' }}
            >
              <MdDeleteForever className="h-10 sm:h-12 md:h-16 lg:h-20 xl:h-23 w-auto" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ConfirmDialog component */}
      <ConfirmDialog
        title="Confirm Delete"
        message="Are you sure you want to delete the selected image(s)?"
        isOpen={isConfirmOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ImageGallery;
