// InitialPage.js
import React from 'react';
import Slideshow from '../components/Home/Slideshow';
import Card from '../components/Home/Card';
import { useNavigate } from 'react-router-dom';

const InitialPage = () => {
    const slideshowImages = [
        'path/to/image1.jpg',
        'path/to/image2.jpg',
        'path/to/image3.jpg',
    ];

    const navigate = useNavigate();

    const handlePhotoboothClick = () => {
        navigate('/photobooth');
    };

    const handleAboutUsClick = () => {
        // Handle About Us click
        navigate('/');

    };

    const handleClientsClick = () => {
        // Handle Clients & Partners click
        navigate('/');

    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-500">
          <Slideshow images={slideshowImages} />
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Card 
              title="About Us" 
              onClick={handleAboutUsClick}
            />
            <Card 
              title="Clients & Partners" 
              onClick={handleClientsClick}
            />
            <Card 
              title="Photobooth" 
              onClick={handlePhotoboothClick} 
            />
          </div>
        </div>
      );
};

export default InitialPage;
