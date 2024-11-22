import React, { useState } from 'react'
// import Buttons from './buttons'


const Stopwatch = () => {
    const [hours, setHours] = useState(0)
    const [mints, setMints] = useState(0)
    const [secs, setSecs] = useState(0)
    const [miliSec, setMiliSec] = useState(0)
    const [intervalId, setIntervalId] = useState(null);

    const startTime = () => {
        if (!intervalId) {
            const newIntervalId = setInterval(timer, 10);
            setIntervalId(newIntervalId);
        }
    }
    function timer() {
        setMiliSec((prevMiliSec) => {
            if (prevMiliSec === 59) {
                setSecs((prevSecs) => {
                    if (prevSecs === 59) {
                        setMints((prevMints) => {
                            if (prevMints === 59) {
                                setHours((prevHours) => prevHours + 1);
                                return 0;
                            }
                            return prevMints + 1;
                        });
                        return 0;
                    }
                    return prevSecs + 1;
                });
                return 0;
            }
            return prevMiliSec + 1;
        });
    }

    const stopTime = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };
    const resetTime = () => {
        stopTime();
        setHours(0)
        setMints(0)
        setSecs(0)
        setMiliSec(0)
    }
    return (
        <div className='relative'>
            <div class="absolute top-[50px] left-[170px] w-[320px] h-[220px] flex gap-5 justify-center align-middle items-center">
                <div className='bg-black text-white h-[100px] w-[130px] rounded-xl text-4xl flex align-middle justify-center items-center'>{String(hours).padStart(2, '0')}</div>
                <div className='bg-black text-white h-[100px] w-[130px] rounded-xl text-4xl flex align-middle justify-center items-center'>{String(mints).padStart(2, '0')}</div>
                <div className='bg-black text-white h-[100px] w-[130px] rounded-xl text-4xl flex align-middle justify-center items-center'>{String(secs).padStart(2, '0')}</div>
                <div className='bg-black text-white h-[100px] w-[130px] rounded-xl text-4xl flex align-middle justify-center items-center'>{String(miliSec).padStart(2, '0')}</div>
            </div>
            <div className='flex gap-5 justify-center align-middle items-center min-h-screen'>
                {/* <Buttons text="Start" onClick={startTime}/>
                <Buttons text="Stop" onClick={stopTime} />
                <Buttons text="Reset" onClick={resetTime} /> */}
                <button className='bg-green-500 px-4 py-2 rounded-lg text-2xl text-white hover:bg-green-600 transition duration-300' onClick={startTime}>Start</button>
                <button className='bg-yellow-400 px-4 py-2 rounded-lg text-2xl text-white hover:bg-yellow-600 transition duration-300' onClick={stopTime}>Stop</button>
                <button className='bg-red-600 px-4 py-2 rounded-lg text-2xl text-white hover:bg-red-600 transition duration-300' onClick={resetTime}>Reset</button>

            </div>
        </div>
    )
}

export default Stopwatch
