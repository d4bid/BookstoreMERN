import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FrameSelector = ({ onSelectFrame }) => {
  const [frames, setFrames] = useState([]);
  const [selectedFrame, setSelectedFrame] = useState(null);

  useEffect(() => {
    const fetchFrames = async () => {
      try {
        const response = await axios.get('http://localhost:5555/frames');
        setFrames(response.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchFrames();
  }, []);

  const handleFrameClick = (frame) => {
    if (selectedFrame === frame) {
      setSelectedFrame(null);
      onSelectFrame(null);
    } else {
      setSelectedFrame(frame);
      onSelectFrame(`data:image/jpeg;base64,${frame.image}`);
    }
  };

  return (
    <div className="flex items-center space-x-4 mb-4 overflow-x-auto p-4 bg-white rounded-md" style={{ maxWidth: '80vw', maxHeight: '20vh' }}>
      {frames.map((frame, index) => (
        <button
          key={index}
          onClick={() => handleFrameClick(frame)}
          className={`border p-2 rounded-md transition-colors duration-300 ${selectedFrame === frame ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          style={{ flex: '0 0 grow', minWidth: '20vw', height: '10vh' }} // Adjust size for 6 frames in a row
        >
          <img
            src={`data:image/jpeg;base64,${frame.image}`}
            alt={`Frame ${index + 1}`}
            className="w-full h-full object-cover rounded-md"
          />
          <span className="text-center">{frame.name}</span> {/* Display name below the image */}

        </button>
      ))}
    </div>
  );
};

export default FrameSelector;
