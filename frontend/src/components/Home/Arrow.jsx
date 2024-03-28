// Arrow.jsx
import React from 'react';

const Arrow = ({ direction }) => {
  return (
    <svg 
      className={`w-6 h-6 ${direction === 'right' ? 'rotate-0' : 'rotate-180'}`} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d={direction === 'right' ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'}
      />
    </svg>
  );
};

export default Arrow;
