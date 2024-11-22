import React, { useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";

const AlarmSetter = ({ setPopup, onSet }) => {
    const [hour, setHour] = useState(null);
    const [mints, setMints] = useState(null);
    const [day, setDay] = useState("");
    const [zone, setZone] = useState("");

    const handleSubmit = () => {
        if (hour === 0 || mints === 0 || day === "" || zone === "") {
            alert("Enter Complete Details")
        }
        else {
            onSet({ hour, mints, day, zone });
            setPopup(null)
        }
    }

    return (
        <div>
            <div className='text-black flex justify-center align-middle items-center gap-8'>
                <div className='flex flex-col gap-[30px]'>
                    <div className='flex justify-center align-middle items-center py-3 bg-gradient-to-r from-blue-200 to-blue-500 px-4 rounded-2xl'>
                        <label htmlFor='hour' className='text-2xl'>Set-Hours</label>
                        <input type="number" min="1" max="12" step="1" name="hour" value={hour} onChange={(e) => setHour(e.target.value)} className='ml-2 bg-white border border-blue-950 rounded-xl px-2 text-xl outline-none border-none' />
                    </div>
                    <div className='flex justify-center align-middle items-center py-3 bg-gradient-to-r from-blue-200 to-blue-500 px-4 rounded-2xl gap-2'>
                        <label htmlFor='Day' className='text-2xl'>Set-Day</label>
                        <select name="options" id="options" value={day} onChange={(e) => setDay(e.target.value)} className=' bg-white border border-blue-950 rounded-lg text-md outline-none border-none'>
                            <option value="" disabled>select day</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                        </select>
                    </div>
                </div>

                <div className='flex flex-col gap-[30px]'>
                    <div className='flex justify-center align-middle items-center py-3 bg-gradient-to-r from-blue-200 to-blue-500 px-4 rounded-2xl'>
                        <label htmlFor='mints' className='text-2xl'>Set-Minutes</label>
                        <input type="number" min="0" max="59" step="1" name="hour" value={mints} onChange={(e) => setMints(e.target.value)} className='ml-2 bg-white border border-blue-950 rounded-xl px-2 text-xl outline-none border-none' />
                    </div>
                    <div className='flex justify-center align-middle items-center py-3 bg-gradient-to-r from-blue-200 to-blue-500 px-4 rounded-2xl gap-2'>
                        <label htmlFor='Zone' className='text-2xl'>Set-Zone</label>
                        <select name="Zone" value={zone} onChange={(e) => setZone(e.target.value)} className=' bg-white border border-blue-950 rounded-lg text-md outline-none w-[90px] border-none'>
                            <option value="" disabled>select zone</option>
                            <option value="am">am</option>
                            <option value="pm">pm</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='flex justify-center mt-5'>
                <button className='bg-black text-white px-7 py-3 rounded-lg hover:scale-105 transition duration-300 ease-in-out' onClick={handleSubmit}>ADD</button>
            </div>
            <div className='text-white text-3xl absolute top-[20px]' onClick={() => setPopup(null)}>
                <IoMdArrowRoundBack />
            </div>
        </div>

    )
}

export default AlarmSetter


