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
        <div className="min-h-screen flex flex-col">
            <Slideshow images={slideshowImages} />
            <div className="flex-grow flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Card
                        title="About Us"
                        onClick={handleAboutUsClick}
                    />
                    <Card
                        title="Clients & Partners"
                        onClick={handleClientsClick}
                    />
                </div>
            </div>
            <div className="flex justify-center mb-4">
                <button
                    onClick={handlePhotoboothClick}
                    className="w-full md:w-auto bg-blue-500 text-white py-6 md:py-4 rounded-none flex items-center justify-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-6 md:w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Photobooth
                </button>
            </div>
        </div>
    );
};

export default InitialPage;
