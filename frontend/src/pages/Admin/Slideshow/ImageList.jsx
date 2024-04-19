import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../../components/Spinner";
import { MdOutlineAddBox } from "react-icons/md";
import ImageCard from "../../../components/ImageCard"; 
import AddImageModal from "../../../components/AddImageModal"; 
import ConfirmDialog from '../../../components/ConfirmDialog'; 

const ImageList = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmImageId, setConfirmImageId] = useState(null);

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

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Image List</h1>
        <div className="flex space-x-4">
          <button onClick={() => setIsAddModalOpen(true)}>
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </button>
        </div>
      </div>
      {isAddModalOpen && <AddImageModal onClose={handleCloseAddModal} />}
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <ImageCard
              key={image._id}
              image={image.image}
              onDelete={() => handleDelete(image._id)}
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
  );
};

export default ImageList;
