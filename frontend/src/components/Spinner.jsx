import React from 'react';
import hytecLogo from '../assets/hytecLogo.png';

const Spinner = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <img src={hytecLogo} alt="Loading..." className='w-1/4 animate-zoom' />
    </div>
  );
}

export default Spinner;
