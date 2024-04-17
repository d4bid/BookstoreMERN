import React, { useState } from 'react';
import Slideshow from '../components/Home/Slideshow';
import Card from '../components/Home/Card';
import PhotoboothButton from '../components/Home/PhotoboothButton';
import UrlModal from '../components/UrlModal';
import { useNavigate } from 'react-router-dom';
import { IoPeopleCircleSharp } from "react-icons/io5";
import { IoInformationCircleSharp } from "react-icons/io5";
import { IoNewspaperSharp } from "react-icons/io5";
import { IoPricetagsSharp } from "react-icons/io5";
import { MdWork } from "react-icons/md";

const InitialPage = () => {
  const slideshowImages = [
    '../src/assets/slideshow/slide2.jpg',
    '../src/assets/slideshow/slide3.jpg',
  ];

  const navigate = useNavigate();
  const [isAboutUsModalOpen, setIsAboutUsModalOpen] = useState(false);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isCareersModalOpen, setIsCareersModalOpen] = useState(false);

  const handlePhotoboothClick = () => {
    navigate('/photobooth');
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

  const closeAboutUsModal = () => {
    setIsAboutUsModalOpen(false);
  };

  const closeNewsModal = () => {
    setIsNewsModalOpen(false);
  };

  const closeCareersModal = () => {
    setIsCareersModalOpen(false);
  };

  const handleClientsClick = () => {
    navigate('/partners');
  };

  const handleProductsClick = () => {
    navigate('/partners');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center relative">

      <div className="flex-fill">
        <Slideshow images={slideshowImages} className="w-20vw" />
      </div>

      <div className="flex-grow"></div>

      <div className="relative flex justify-center">
        <div className="flex flex-wrap justify-center">
          <Card title="Partners" icon={IoPeopleCircleSharp} onClick={handleClientsClick} />
          {/* <Card title="Products" icon={IoPricetagsSharp} onClick={handleClientsClick} /> */}
          <Card title="Careers" icon={MdWork} onClick={handleCareersClick} />
          <Card title="News" icon={IoNewspaperSharp} onClick={handleNewsClick} />
          <Card title="About Us" icon={IoInformationCircleSharp} onClick={handleAboutUsClick} />
        </div>
      </div>

      <div className="flex-grow"></div>

      <div className="mb-4 flex justify-center">
        <PhotoboothButton
          title="BETA VERSION"
          onClick={handlePhotoboothClick}
        />
      </div>

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
    </div>
  );
}

export default InitialPage;
