import React from 'react';
import { useNavigate } from 'react-router-dom';
import mp4Background from '../../src/assets/hytecscreensaver.mp4';
import { Ripple, initTWE } from "tw-elements";
initTWE({ Ripple });

const LandingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-end"
      style={{
        position: 'relative',
        paddingBottom: '20vh'  // Added padding to the bottom to position the text
      }}
      onClick={handleClick}
    >
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          zIndex: '-1',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      >
        <source src={mp4Background} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p
        className="text-white text-5xl cursor-pointer mb-4"
        data-twe-ripple-init
        data-twe-ripple-color="white"
        data-twe-ripple-unbound="true"
        data-twe-ripple-duration="1000ms"
      >
        Touch to Start
      </p>

    </div>
  );
};

export default LandingPage;
