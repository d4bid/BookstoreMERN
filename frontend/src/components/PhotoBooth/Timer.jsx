import React, { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; // Import the loading icon from React Icons
import CountdownVideo from '../../assets/Countdown.mp4'; // Import the countdown video
import CA1 from '../../assets/VFX/Capture_1.mp3';
import CA2 from '../../assets/VFX/Capture_2.mp3';
import CA3 from '../../assets/VFX/Capture_3.mp3';
import CA4 from '../../assets/VFX/Capture_4.mp3';

const audioFiles = [CA1, CA2, CA3, CA4];

const getRandomIndex = () => Math.floor(Math.random() * audioFiles.length);

const Timer = ({ durationInSeconds, onCountdownEnd }) => {
  const [seconds, setSeconds] = useState(durationInSeconds);
  const [isLoading, setIsLoading] = useState(false); // State to track loading state
  const [audioIndex, setAudioIndex] = useState(getRandomIndex());

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds(prevSeconds => prevSeconds - 1);
      } else {
        clearInterval(intervalId); // Clear the interval when seconds reach 0
        onCountdownEnd(); // Call the countdown end callback function
      }
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [seconds, onCountdownEnd]);

  const handleVideoEnd = () => {
    setIsLoading(false); // Set isLoading to false when the video ends
    onCountdownEnd(); // Call the countdown end callback function
  };

  // Define inline styles for the Timer component
  const timerContainerStyle = {
    textAlign: 'center',
    position: 'relative',
  };

  const loadingIconStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '15vw', // Adjust the size of the loading icon
  };

  return (
    <div style={timerContainerStyle}>
      {/* Display the loading icon if isLoading is true */}
      {isLoading && (
        <AiOutlineLoading3Quarters
          style={loadingIconStyle}
        />
      )}
      {/* Display the countdown video if isLoading is false */}
      {!isLoading && (
        <div style={{ maxWidth: '40vw', maxHeight: '40vw' }}> {/* Adjusted maxHeight */}
          <video
            autoPlay
            muted
            onEnded={handleVideoEnd}
            style={{ width: '100%', height: '100%', objectFit: 'fill' }} // Adjusted height and object-fit property
            playbackrate={4.0} // Set the playback rate to 2.5x
          >
            <source src={CountdownVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <audio src={audioFiles[audioIndex]} autoPlay />

        </div>
      )}
    </div>
  );
};

export default Timer;
