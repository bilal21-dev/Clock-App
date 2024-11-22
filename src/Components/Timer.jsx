import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [inputTime, setInputTime] = useState(60); // Input for setting time (default 60 seconds)
  const [time, setTime] = useState(60); // Timer value in seconds
  const [isRunning, setIsRunning] = useState(false);

  // Timer countdown logic using useEffect
  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  // Function to format time into MM:SS
  const formatTime = (seconds) => {
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const getMinutes = `0${Math.floor(seconds / 60)}`.slice(-2);
    return `${getMinutes}:${getSeconds}`;
  };

  // Start, Stop, Reset functions
  const startTimer = () => {
    if (time > 0) {
      setIsRunning(true);
    }
  };
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(inputTime); // Reset to initial input time
  };

  // Handle input change for the timer
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 0) {
      setInputTime(value);
      setTime(value);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center text-white mt-4'>
      <div className='bg-white bg-opacity-10 p-8 rounded-lg shadow-md'>
        <h2 className='text-4xl font-bold mb-6'>Timer</h2>

        <div className='text-6xl font-mono mb-8'>{formatTime(time)}</div>

        {/* Input for setting the timer */}
        <div className='mb-6'>
          <label htmlFor="timer-input" className='block text-xl font-semibold mb-2'>Set Timer (in seconds):</label>
          <input
            id="timer-input"
            type="number"
            value={inputTime}
            onChange={handleInputChange}
            className='px-4 py-2 rounded-lg text-black text-center w-32'
            disabled={isRunning}
          />
        </div>

        <div className='flex gap-4'>
          <button
            onClick={startTimer}
            className='bg-green-500 px-4 py-2 rounded-lg text-white text-xl hover:bg-green-600 transition duration-300'
            disabled={isRunning}
          >
            Start
          </button>
          <button
            onClick={stopTimer}
            className='bg-yellow-500 px-4 py-2 rounded-lg text-white text-xl hover:bg-yellow-600 transition duration-300'
          >
            Stop
          </button>
          <button
            onClick={resetTimer}
            className='bg-red-500 px-4 py-2 rounded-lg text-white text-xl hover:bg-red-600 transition duration-300'
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
