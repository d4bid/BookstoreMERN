import React, { useState } from 'react';
import Slideshow from '../components/Home/Slideshow';
import Card from '../components/Home/Card';
import PhotoboothButton from '../components/Home/PhotoboothButton';
import UrlModal from '../components/UrlModal';
import { useNavigate } from 'react-router-dom';
import { BsFillPeopleFill } from "react-icons/bs";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoPeopleCircleSharp } from "react-icons/io5";
import { IoInformationCircleSharp } from "react-icons/io5";

const InitialPage = () => {
  const slideshowImages = [
    '../src/assets/slideshow/slide2.jpg',
    '../src/assets/slideshow/slide3.jpg',
  ];

  const navigate = useNavigate();
  const [isAboutUsModalOpen, setIsAboutUsModalOpen] = useState(false);

  const handlePhotoboothClick = () => {
    navigate('/photobooth');
  };

  const handleAboutUsClick = () => {
    setIsAboutUsModalOpen(true);
  };

  const closeAboutUsModal = () => {
    setIsAboutUsModalOpen(false);
  };

  const handleClientsClick = () => {
    navigate('/partners');  // Navigate to the PartnersPage
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
    <Card title="About Us" icon={IoInformationCircleSharp} onClick={handleAboutUsClick} />
    <Card title="About Us" icon={IoInformationCircleSharp} onClick={handleAboutUsClick} />
    <Card title="About Us" icon={IoInformationCircleSharp} onClick={handleAboutUsClick} />
  </div>
</div>

      <div className="flex-grow"></div>

      <div className="mb-4 flex justify-center">
        <PhotoboothButton
          title="Tap to open photo booth"
          onClick={handlePhotoboothClick}
        />
      </div>

      <UrlModal
        isOpen={isAboutUsModalOpen}
        onClose={closeAboutUsModal}
        url="https://hytecpower.com/about-us/"
      />
    </div>
  );

}
export default InitialPage;
