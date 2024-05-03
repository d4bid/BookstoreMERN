import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../../components/Spinner";
import PhotoCard from "../../../components/PhotoCard";
import BackButton from "../../../components/BackButtonHome";
import hytecLogo from "../../../assets/hytecLogo.png";
import { MdOutlineChecklist, MdOutlineIosShare, MdDeleteForever, MdOutlineCancel } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { useSnackbar } from 'notistack';
import ConfirmDialog from '../../../components/ConfirmDialog';
import EmailDialog from '../../../components/EmailDialog'; // Import ShareDialog component

const ImageGallery = ({ isAdmin = true }) => {
  const sessionId = localStorage.getItem('sessionId');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showBackButton, setShowBackButton] = useState(true);
  const [checklistMode, setChecklistMode] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmImageIds, setConfirmImageIds] = useState([]);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false); // Define isShareDialogOpen state
  const [isSelectFocused, setIsSelectFocused] = useState(false); // State to track focus on Select


  useEffect(() => {
    setLoading(true);
    isAdmin ? fetchImagesAdmin() : fetchImages(sessionId);
    window.addEventListener('newImagesAdded', isAdmin ? fetchImagesAdmin : fetchImages);
    return () => {
      window.removeEventListener('newImagesAdded', isAdmin ? fetchImagesAdmin : fetchImages);
    };
  }, [isAdmin]);

  const fetchImages = async (sessionId) => { // Modify to accept sessionId as a parameter
    try {
      const response = await axios.get(`http://localhost:5555/photos/user-gallery/${sessionId}`); // Pass sessionId in the URL
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

    if (checklistMode) {
      setSelectedImages([]);
    }
  };

  const toggleBackButton = () => {
    setShowActions(false);
    setShowBackButton(true);
    setChecklistMode(false);

    if (checklistMode) {
      setSelectedImages([]);
    }
  };

  const handleSelectImage = (imageId) => {
    setSelectedImages(prevSelectedImages => {
      const newSelectedImages = prevSelectedImages.includes(imageId)
        ? prevSelectedImages.filter(id => id !== imageId)
        : [...prevSelectedImages, imageId];

      console.log("Selected Images:", newSelectedImages);
      return newSelectedImages;
    });
  };

  const handleDeleteSelected = async () => {
    if (selectedImages.length === 0) {
      enqueueSnackbar("No items selected for deletion", { variant: "info" });
      return;
    }

    handleOpenConfirmDialog(selectedImages);
  };

  const handleOpenConfirmDialog = (imageIds) => {
    setConfirmImageIds(imageIds);
    setIsConfirmOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setIsConfirmOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete("http://localhost:5555/photos/delete-multiple", { data: { ids: confirmImageIds } });
      isAdmin ? fetchImagesAdmin() : fetchImages();
      setSelectedImages([]);
      enqueueSnackbar("Selected items deleted successfully", { variant: "success" });
      handleCloseConfirmDialog();
    } catch (error) {
      console.error('Error deleting selected items:', error);
      enqueueSnackbar("Failed to delete selected items", { variant: "error" });
      handleCloseConfirmDialog();
    }
  };

  const handleCancelDelete = () => {
    handleCloseConfirmDialog();
  };

  // Function to handle sharing multiple photos via email
  const handleShareMultiplePhotos = async () => {
    if (selectedImages.length === 0) {
      enqueueSnackbar("No items selected for sharing", { variant: "info" });
      return;
    }
  
    try {
      setShowActions(false); // Close action buttons
      setShowBackButton(true); // Show back button
      setChecklistMode(false); // Exit checklist mode
      setIsEmailDialogOpen(true); // Open ShareDialog
    } catch (error) {
      console.error('Error fetching multiple photos:', error);
      enqueueSnackbar("Failed to fetch multiple photos", { variant: "error" });
    }
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
              <p className="text-center text-gray-500 mt-4">NOTE: Only pictures taken within this session are displayed here.</p>
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
            <button
              className="bg-red-500 text-white rounded-full p-4 flex items-center justify-center"
              onClick={handleShareMultiplePhotos}
              style={{ width: '20vw', height: '20vw', padding: '2rem', margin: '0 10px' }}
            >
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

      <ConfirmDialog
        title="Confirm Delete"
        message="Are you sure you want to delete the selected image(s)?"
        isOpen={isConfirmOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      {/* Render ShareDialog if isOpen state is true
      <ShareDialog
        isOpen={isShareDialogOpen}
        onClose={() => setIsShareDialogOpen(false)}
        selectedImages={selectedImages}
      /> */}

      {/* EmailDialog */}
        <EmailDialog
          isOpen={isEmailDialogOpen}
          onClose={() => setIsEmailDialogOpen(false)}
          selectedImages={selectedImages}
          setIsSelectFocused={setIsSelectFocused} // Pass setIsSelectFocused to EmailDialog
          isMultiple={true}
        />
    </div>
  );
};

export default ImageGallery;
