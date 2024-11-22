import React from 'react';
const Card = ({ text, img,onClick }) => {
    return (
        <div className='group' onClick={onClick}>
            <div className='bg-blue-950 bg-opacity-80 rounded-xl py-[25px] px-[40px] flex flex-col justify-center items-center gap-3 hover:scale-105 transition duration-300 ease-in-out border border-white/20 backdrop-blur-md group-hover:bg-opacity-100 group-hover:shadow-lg group-hover:shadow-black'>
                <h1 className='text-white text-4xl'>{text}</h1>
                {img}
            </div>
        </div>
    );
};

export default Card;
