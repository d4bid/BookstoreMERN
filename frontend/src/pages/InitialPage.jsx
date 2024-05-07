import React, { useState, useEffect } from "react";
import Slideshow from "../components/Home/Slideshow";
import Card from "../components/Home/Card";
import PhotoboothButton from "../components/Home/PhotoboothButton";
import InfoModal from "../components/InfoModal";
import UrlModal from "../components/UrlModal";
import { useNavigate } from "react-router-dom";
import { IoPeopleCircleSharp } from "react-icons/io5";
import { IoInformationCircleSharp } from "react-icons/io5";
import { IoNewspaperSharp } from "react-icons/io5";
import { MdWork } from "react-icons/md";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import backgroundImage from "../assets/1.png";
import BG2 from "../assets/bg.mp4"
import { FaDev } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';

const InitialPage = () => {
  const [slideshowImages, setSlideshowImages] = useState([]);
  const navigate = useNavigate();
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isAboutUsModalOpen, setIsAboutUsModalOpen] = useState(false);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isCareersModalOpen, setIsCareersModalOpen] = useState(false);
  const [isEHytecModalOpen, setEHytecModalOpen] = useState(false);
  const location = useLocation();
  const [showPrivacyScreen, setShowPrivacyScreen] = useState(location.state?.fromLanding ?? false);



  useEffect(() => {
    const fetchSlideshowImages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5555/slideshow/active"
        );
        const fetchedImages = response.data.data.map(
          (image) => `data:image/jpeg;base64,${image.image}`
        );
        setSlideshowImages(fetchedImages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSlideshowImages();
  }, []);



  console.log("Show Privacy Screen:", showPrivacyScreen);

  // const handlePhotoboothClick = () => {
  //   setIsInfoModalOpen(true);
  // };

  const handlePhotoboothClick = () => {
    navigate("/photobooth", { state: { fromLanding: false } }), 1000;
  };

  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
  };

  const handleAboutUsClick = () => {
    setIsAboutUsModalOpen(true);
  };

  const handleNewsClick = () => {
    setIsNewsModalOpen(true);
  };

  const handleCareersClick = () => {
    setIsCareersModalOpen(true);
  };

  const handleEhyteckClick = () => {
    setEHytecModalOpen(true);
  };

  const closeAboutUsModal = () => {
    setIsAboutUsModalOpen(false);
  };

  const closeNewsModal = () => {
    setIsNewsModalOpen(false);
  };

  const closeCareersModal = () => {
    setIsCareersModalOpen(false);
  };

  const closeEHytecModal = () => {
    setEHytecModalOpen(false);
  };

  // const handleClientsClick = () => {
  //   navigate("/partners");
  // };

  return (
    <AnimatePresence>
      {showPrivacyScreen && (
        <motion.div
          key="privacy-screen"
          initial={{ scaleX: 1, originX: 0 }} // Starts from the right
          animate={{ scaleX: 0, transition: { duration: 0.5 } }} // Moves to the left to reveal content
          exit={{ scaleX: 1, transition: { duration: 0.5 } }} // Returns to the right when exiting
          style={{ originX: 0, zIndex: 9999 }}
          className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-red-500 z-2"
          onClick={() => setShowPrivacyScreen(false)} // Hide privacy screen when clicked
        >

        </motion.div>
      )}

      <motion.div
        className="min-h-screen flex flex-col justify-center relative"
        style={{
          // backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
      >
        <video autoPlay muted loop className="absolute inset-0 object-cover">
          <source src={BG2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="flex-fill">
          <Slideshow images={slideshowImages} className="w-20vw" />
        </div>

        <div className="flex-grow"></div>

        <div className="relative flex justify-center">
          <div className="flex flex-wrap justify-center">
            <Card
              title="About Us"
              icon={IoInformationCircleSharp}
              onClick={handleAboutUsClick}
            />
            <Card
              title="E-Hytec"
              icon={IoPeopleCircleSharp}
              onClick={handleEhyteckClick}
            />
            <Card
              title="News"
              icon={IoNewspaperSharp}
              onClick={handleNewsClick}
            />
            <Card
              title="Careers"
              icon={MdWork}
              onClick={handleCareersClick}
            />
          </div>
        </div>

        <div className="flex-grow"></div>

        <div className="mb-4 flex justify-center">
        <a href="/devs">
            <FaDev className="absolute left-2 bottom-3 text-3rem lg:text-4xl text-red-500 mt-2 lg:mt-4 scale-150 ml-4 mb-4">About the devs.</FaDev>
          </a>
          <PhotoboothButton
            onClick={handlePhotoboothClick}

          />
        </div>

        <InfoModal isOpen={isInfoModalOpen} onClose={closeInfoModal} />
        <UrlModal
          isOpen={isAboutUsModalOpen}
          onClose={closeAboutUsModal}
          url="https://hytecpower.com/about-us/"
        />
        <UrlModal
          isOpen={isNewsModalOpen}
          onClose={closeNewsModal}
          url="https://hytecpower.com/news/"
        />
        <UrlModal
          isOpen={isCareersModalOpen}
          onClose={closeCareersModal}
          url="https://hytecpower.com/careers/"
        />
        <UrlModal
          isOpen={isEHytecModalOpen}
          onClose={closeEHytecModal}
          url="https://hytecpower.com/"
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default InitialPage;