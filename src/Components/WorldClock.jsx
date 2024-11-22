import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";

const WorldClock = () => {
  const [inputValue, setInputValue] = useState(''); // State to track the input field value
  const [city, setCity] = useState(''); // State to store the actual city for the search
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch time from WeatherAPI
  const getCityTime = async () => {
    const API_KEY = '524798097ebf41c3826190310241609'; // Replace with your WeatherAPI key
    const url = `http://api.weatherapi.com/v1/timezone.json?key=${API_KEY}&q=${city}`;

    try {
      const response = await axios.get(url);
      if (response.data) {
        const cityTime = response.data.location.localtime;
        const { formattedTime, formattedDate } = formatTimeTo12Hour(cityTime);
        setTime(formattedTime); 
        setDate(formattedDate); 
        setError(null); 
      }
    } catch (err) {
      setError('Error fetching time data or city not found');
      setTime(null); 
      setDate(null); 
    }
  };

  // Function to format time to 12-hour format and return date
  const formatTimeTo12Hour = (timeString) => {
    const [datePart, timePart] = timeString.split(' '); 
    let [hours, minutes] = timePart.split(':'); 

    const period = hours >= 12 ? 'PM' : 'AM'; 
    hours = hours % 12 || 12; 

    const formattedTime = `${hours}:${minutes} ${period}`; 
    const formattedDate = new Date(datePart).toDateString(); 

    return { formattedTime, formattedDate }; 
  };

  // Handle search button click
  const handleSearchClick = () => {
    setCity(inputValue); // Update the city when the search button is clicked
    getCityTime();
  };

  return (
    <div>
      <div className='flex align-middle justify-center items-center gap-2'>
        <div>
          <input
            type="text"
            placeholder='Enter the name of the city'
            className='px-3 py-3 bg-black bg-opacity-60 rounded-lg text-white outline-none w-[400px]'
            value={inputValue} // Input value is controlled by inputValue state
            onChange={(e) => setInputValue(e.target.value)} // Update inputValue on change
          />
        </div>
        <button className='bg-black bg-opacity-60 px-3 py-3 rounded-lg' onClick={handleSearchClick}>
          <FaSearch className='text-2xl text-white' />
        </button>
      </div>

      {time && date && (
        <div className='bg-black bg-opacity-60 rounded-lg px-5 flex flex-col justify-center align-middle items-center gap-6 py-4 mt-5 text-white'>
          <h2 className='font-extrabold text-3xl'>Local Time in {city}</h2>
          <p className='font-semibold text-lg'>{date}</p>
          <p className='font-semibold text-lg'>{time}</p>
        </div>
      )}

      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default WorldClock;
