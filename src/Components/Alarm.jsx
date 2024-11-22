import React, { useEffect, useState, useRef } from 'react';
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdAutoDelete } from "react-icons/md";
import AlarmSetter from './AlarmSetter';
import sound from './../assets/notification-sound.wav';

const Alarm = () => {
  const [popUp, setPopup] = useState(null);
  const [alarms, setAlarm] = useState([]);
  const [ringAlarm, setRinging] = useState(null);
  
  const alarmAudioRef = useRef(new Audio(sound));
  const timeoutRef = useRef(null);

  const closeModal = () => setPopup(null);
  const formatTime = (value) => String(value).padStart(2, '0');

  const handleData = (data) => {
    setAlarm([...alarms, data]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkAlarm();
    }, 1000);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [alarms]);

  const playAlarmSound = () => {
    const audio = alarmAudioRef.current;
    audio.loop = true;
    audio.play();

    // Stop the sound after 30 seconds
    timeoutRef.current = setTimeout(() => {
      stopAlarmSound();
    }, 30000); // 30 seconds in milliseconds
  };

  const stopAlarmSound = () => {
    const audio = alarmAudioRef.current;
    audio.pause();
    audio.currentTime = 0; // Reset to the beginning
    clearTimeout(timeoutRef.current); // Clear the timeout
  };

  const checkAlarm = () => {
    const today = new Date();
    const currentHour = today.getHours();
    const currentMins = today.getMinutes();
    const currentDay = today.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
    const currentZone = currentHour >= 12 ? 'pm' : 'am';

    alarms.forEach((alarm, index) => {
      const formattedHour = (currentHour % 12) || 12;
      
      if (
        parseInt(alarm.hour) === formattedHour &&
        parseInt(alarm.mints) === currentMins &&
        alarm.day.toLowerCase() === currentDay &&
        alarm.zone === currentZone
      ) {
        setRinging(index);
        playAlarmSound();
      } else if (ringAlarm === index) {
        setRinging(null); // Reset if the time has passed
      }
    });
  };

  const removeAlarm = (indexToRemove) => {
    if (indexToRemove === ringAlarm) {
      stopAlarmSound(); // Stop the alarm sound if the alarm is currently ringing
      setRinging(null); // Clear the ringing state
    }

    // Remove the alarm from the list
    setAlarm(alarms.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <div className='text-white text-6xl relative hover:text-black' onClick={() => { setPopup("done"); }}>
        <IoMdAddCircleOutline className='absolute top-[330px] left-[45%]' />
      </div>

      {popUp && (
        <div
          className='fixed inset-0 bg-black/50 flex justify-center items-center z-20'
          onClick={closeModal} // Click outside modal to close
        >
          <div
            className="p-5 rounded-lg shadow-lg h-[250px] w-[650px] backdrop-blur-lg bg-opacity-30 bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <AlarmSetter setPopup={setPopup} onSet={handleData} />
          </div>
        </div>
      )}

      <div className="text-white mt-5">
        <h2 className='text-xl ml-1'>Alarm Details</h2>
        {alarms.map((alarm, index) => (
          <div key={index} id={index} className={`${ringAlarm === index ? "vibrate-1" : ""}`}>
            <div className="flex gap-4 bg-black bg-opacity-30 px-4 py-5 mt-2 rounded-xl align-middle items-center">
              <div className='bg-black bg-opacity-60 px-3 py-3 rounded-lg'>
                {`${formatTime(alarm.hour)}`}H
              </div>
              <div>:</div>
              <div className='bg-black bg-opacity-60 px-3 py-3 rounded-lg'>
                {`${formatTime(alarm.mints)}`}M
              </div>
              <div className='bg-black bg-opacity-60 px-3 py-3 rounded-lg'>
                {`${alarm.zone}`}
              </div>
              <div className='bg-black bg-opacity-60 px-3 py-3 rounded-lg'>
                {`${alarm.day}`}
              </div>
              <div
                className={`text-3xl hover:scale-105 ${ringAlarm === index ? "absolute right-[22px]" : "absolute right-[360px]"}`}
                onClick={() => removeAlarm(index)}
              >
                <MdAutoDelete />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alarm;
