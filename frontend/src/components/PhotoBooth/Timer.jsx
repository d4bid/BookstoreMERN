import React, { useEffect, useState } from 'react';

const Timer = ({ durationInSeconds, onCountdownEnd }) => {
  const [seconds, setSeconds] = useState(durationInSeconds);

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

  // Define inline styles for the Timer component
  const timerTextStyle = {
    fontSize: '30vw',
    color: 'red',
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Display only the remaining seconds */}
      <div style={timerTextStyle}>{seconds < 10 ? `0${seconds}` : seconds}</div>
    </div>
  );
};

export default Timer;
