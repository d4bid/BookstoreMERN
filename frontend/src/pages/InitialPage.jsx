import React, { useState } from 'react';
import Slideshow from '../components/Home/Slideshow';
import Card from '../components/Home/Card';
import PhotoboothButton from '../components/Home/PhotoboothButton';
import UrlModal from '../components/UrlModal';
import { useNavigate } from 'react-router-dom';

// fdffs


const InitialPage = () => {
  const slideshowImages = [
    '../src/assets/frametest.png',
    '../src/assets/slideshow/slide2.jpg',
    '../src/assets/slideshow/slide3.jpg',
  ];

  const navigate = useNavigate();
  const [isAboutUsModalOpen, setIsAboutUsModalOpen] = useState(false);
  const [isClientsModalOpen, setIsClientsModalOpen] = useState(false);

  const handlePhotoboothClick = () => {
    navigate('/photobooth');
  };

  const handleAboutUsClick = () => {
    setIsAboutUsModalOpen(true);
  };

  const handleClientsClick = () => {
    setIsClientsModalOpen(true);
  };

  const closeAboutUsModal = () => {
    setIsAboutUsModalOpen(false);
  };

  const closeClientsModal = () => {
    setIsClientsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center relative">
      <div className="flex-grow">
        <Slideshow images={slideshowImages} className="w-full" />
      </div>
      <div className="absolute left-0 right-0 mb-0 flex justify-center">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <Card title="About Us" onClick={handleAboutUsClick} />
          <Card title="Clients & Partners" onClick={handleClientsClick} />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 mb-4 flex justify-center">
        <PhotoboothButton
          title="Tap to open photo booth"
          onClick={handlePhotoboothClick}
        />
      </div>
      
      {/* About Us UrlModal */}
      <UrlModal
        isOpen={isAboutUsModalOpen}
        onClose={closeAboutUsModal}
        url="https://hytecpower.com/about-us/"
      />

      {/* Clients & Partners UrlModal */}
      <UrlModal
        isOpen={isClientsModalOpen}
        onClose={closeClientsModal}
        url="https://hytecpower.com/"
      />
    </div>
  );
};

export default InitialPage;
