import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../../components/Spinner";
import PhotoCard from "../../../components/PhotoCard";
import BackButton from "../../../components/BackButtonHome";
import hytecLogo from "../../../assets/hytecLogo.png";
import { MdOutlineChecklist, MdOutlineIosShare, MdDeleteForever, MdOutlineCancel } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

const ImageGallery = ({ isAdmin = true }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showBackButton, setShowBackButton] = useState(true);

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
  };

  const toggleBackButton = () => {
    setShowActions(false);
    setShowBackButton(true);
  };

  return (
    <div className="relative">
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

      <div style={{ paddingTop: '11rem', paddingBottom:'13rem' }}>
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
                  />
                </div>
              ))}
            </div>
            <p className="text-center text-gray-500 mt-4">NOTE: Only pictures taken within the day are displayed here.</p>
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
            <button className="bg-red-500 text-white rounded-full p-4 flex items-center justify-center" style={{ width: '20vw', height: '20vw', padding: '2rem', margin: '0 10px' }}>
              <MdDeleteForever className="h-10 sm:h-12 md:h-16 lg:h-20 xl:h-23 w-auto" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGallery;
