// FrameSelector.jsx
import React from 'react';
import frametest from '../../assets/2a.png';

const FrameSelector = ({ onSelectFrame }) => {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <button onClick={() => onSelectFrame(null)} className="border p-2 rounded-md">None</button>
      <button onClick={() => onSelectFrame(frametest)} className="border p-2 rounded-md">Test Frame</button>
    </div>
  );
};

export default FrameSelector;
