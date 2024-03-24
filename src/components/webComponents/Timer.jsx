import React, { useState, useEffect } from 'react';

function Timer({ initialTime, onTimeOut }) {
  const [time, setTime] = useState(initialTime);
  const [timeOutCalled, setTimeOutCalled] = useState(false);

  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else {
      if (!timeOutCalled) {
        onTimeOut();
        setTimeOutCalled(true);
      }
    }
  }, [time, onTimeOut, timeOutCalled]);

  return <div>{time} sec</div>;
}

export default Timer;