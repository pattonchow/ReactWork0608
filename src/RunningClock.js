import React, { useState, useEffect } from "react";

const RunningClock = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else {
          if (minutes > 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          } else {
            setIsRunning(false);
          }
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, minutes, seconds]);

  const startCountdown = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const pauseResumeCountdown = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const resetCountdown = () => {
    setMinutes(0);
    setSeconds(0);
    setIsRunning(false);
  };

  const formatTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  return (
    <div>
      <label>
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(parseInt(e.target.value, 10))}
        />
        Minutes
      </label>
      <label>
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(parseInt(e.target.value, 10))}
        />
        Seconds
      </label>

      <button onClick={startCountdown}>START</button>
      <button onClick={pauseResumeCountdown}>PAUSE | RESUME</button>
      <button onClick={resetCountdown}>RESET</button>

      <h1 data-testid="running-clock">{`${formatTime(minutes)}:${formatTime(
        seconds
      )}`}</h1>
    </div>
  );
};

export default RunningClock;
