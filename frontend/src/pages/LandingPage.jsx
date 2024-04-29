import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mp4Background from '../../src/assets/hytecscreensaver.mp4';
import { AnimatePresence, motion } from "framer-motion";
import { MdTouchApp } from "react-icons/md";

const LandingPage = () => {
  const navigate = useNavigate();

  const [showPrivacyScreen, setShowPrivacyScreen] = useState(false);

  const handleClick = () => {
    setShowPrivacyScreen(true); // Show privacy screen when clicked
    setTimeout(() => navigate("/home", { state: { fromLanding: true } }), 1000);
  };

  return (
    <div className="relative min-h-screen">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{
          zIndex: '-1',
        }}
      >
        <source src={mp4Background} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <AnimatePresence>
        {showPrivacyScreen && (
          <motion.div
            key="privacy-screen"
            initial={{ scaleX: 0, originX: 1 }}
            animate={{ scaleX: 1, transition: { duration: 0.5 } }}
            exit={{ scaleX: 1, transition: { duration: 0.5 } }}
            style={{ originX: 0 }}
            className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-red-500 z-2"
            onClick={() => setShowPrivacyScreen(false)}
          >
          </motion.div>
        )}
      </AnimatePresence>
      {!showPrivacyScreen && (
        <div
          className="min-h-screen flex flex-col items-center justify-end"
          style={{
            position: 'relative',
            paddingBottom: '20vh'
          }}
          onClick={handleClick}
        >

          <MdTouchApp className=" text-white  p-4 flex items-center justify-center animate-pulse"
            style={{ width: '15vw', height: '15vw' }} />
          <p
            className="text-white text-3xl cursor-pointer mb-4 animate-pulse"
          >
            Touch to start
          </p>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
