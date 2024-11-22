import React from 'react'

const Buttons = ({text,onClick}) => {
  return (
    <div>
      <button className='bg-blue-950 text-white px-10 py-3 rounded-md text-lg min-w-[120px] hover:scale-105 transition duration-300 ease-in-out border border-black' onClick={onClick}>{text}</button>
    </div>
  )
}

export default Buttons
