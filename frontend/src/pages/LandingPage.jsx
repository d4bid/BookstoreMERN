import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../src/assets/HPI Logo.jpg';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-red-500" 
      onClick={handleClick}
    >
      <img src={logo} alt="HPI Logo" className="w-1/4 mb-4" />
      <p className="text-white text-2xl cursor-pointer">Touch to Start</p>
    </div>
  );
};

export default LandingPage;
