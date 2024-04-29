import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../../components/Spinner";
import { MdOutlineAddBox } from "react-icons/md";
import ImageCard from "../../../components/ImageCard";
import AddImageModal from "../../../components/AddImageModal";
import ConfirmDialog from '../../../components/ConfirmDialog';

// navbar
import BackButton from "../../../components/BackButtonHome";
import hytecLogo from "../../../assets/hytecLogo.png";
import { IoMdAdd } from "react-icons/io";

const ImageList = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmImageId, setConfirmImageId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Add this state

  useEffect(() => {
    setLoading(true);
    fetchImages();
    window.addEventListener('newImagesAdded', fetchImages);
    return () => {
      window.removeEventListener('newImagesAdded', fetchImages);
    };
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:5555/slideshow");
      setImages(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setConfirmImageId(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5555/slideshow/${confirmImageId}`);
      setImages(images.filter((image) => image._id !== confirmImageId));
      setLoading(false);
      setIsConfirmOpen(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setIsConfirmOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleSwitchChange = async (id, isActive) => {
    try {
      const response = await axios.put(`http://localhost:5555/slideshow/${id}`, {
        isActive,
      });
      const updatedImage = response.data;
      setImages((prevImages) =>
        prevImages.map((image) =>
          image._id === id ? { ...image, isActive: updatedImage.isActive } : image
        )
      );
    } catch (error) {
      console.error('Error updating image active status:', error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
        {/* Nav bar */}
        <div className="w-full flex items-center justify-between fixed top-0 z-10 bg-white">
        <BackButton destination="/admin" />
        <div className="flex-grow" style={{ maxWidth: "20vw" }}>
          <img src={hytecLogo} alt="Photo Booth" />
        </div>
        <IoMdAdd className="bg-white text-red-500 rounded-full p-4 flex items-center justify-center" onClick={() => setIsAddModalOpen(true)} style={{ width: '15vw', height: '15vw', padding: '2rem', margin: '0 10px' }} />
      </div>


      <div style={{ paddingTop: '13rem', paddingBottom: '13rem' }}>
         <h1 className="text-3xl ">Image List</h1>

      {isAddModalOpen && <AddImageModal onClose={handleCloseAddModal} />}
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <ImageCard
              key={image._id}
              image={image.image}
              isActive={image.isActive}
              _id={image._id}
              onDelete={() => handleDelete(image._id)}
              onSwitchChange={(isActive) => handleSwitchChange(image._id, isActive)}
              onOpenModal={handleOpenModal}
              onCloseModal={handleCloseModal}
              isModalOpen={isModalOpen}
            />
          ))}
        </div>
      )}

      {/* ConfirmDialog component */}
      <ConfirmDialog
        title="Confirm Delete"
        message="Are you sure you want to delete this image?"
        isOpen={isConfirmOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
    </div>
  );
};

export default ImageList;
