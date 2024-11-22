import { useState } from 'react'
import Card from './Components/Card'
import { GiStopwatch } from "react-icons/gi"
import { BsAlarmFill } from "react-icons/bs";
import { IoTimer } from "react-icons/io5";
import { GiWorld } from "react-icons/gi";
import Stopwatch from './Components/Stopwatch';
import Alarm from './Components/Alarm';
import Timer from './Components/Timer';
import WorldClock from './Components/WorldClock';

function App() {
  const [display, setDisplay] = useState(null)
  const closeModal = () => setDisplay(null);

  return (
    <>
      <img src='https://t4.ftcdn.net/jpg/06/63/99/45/360_F_663994561_qy30RA6KgMrrHIWTK6y7V2RRKQxwQInj.jpg' className='back' />
      <div className='flex gap-5 align-middle justify-center items-center min-h-screen'>
        <Card text="STOP-WATCH" img={<GiStopwatch className='text-white text-5xl' />} onClick={() => setDisplay('Stopwatch')} />
        <Card text="ALARM" img={<BsAlarmFill className='text-white text-5xl' />} onClick={() => setDisplay('Alarm')} />
        <Card text="TIMER" img={<IoTimer className='text-white text-5xl' />} onClick={() => setDisplay('Timer')} />
        <Card text="WORLD-CLOCK" img={<GiWorld className='text-white text-5xl' />} onClick={() => setDisplay('WorldClock')} />
      </div>

      {display && (
        <div
          className='fixed inset-0 bg-black/50 flex justify-center items-center z-20'
          onClick={closeModal} // Click outside modal to close
        >
          <div
            className="p-5 rounded-lg shadow-lg h-[450px] w-[700px] bg-gradient-to-r from-blue-400 to-green-500"
            onClick={(e) => e.stopPropagation()}
          >
            {display === 'Stopwatch' && <Stopwatch />}
            {display === 'Alarm' && <Alarm setDisplay={setDisplay}/>}
            {display === 'Timer' && <Timer />}
            {display === 'WorldClock' && <WorldClock />}  {/* Placeholder component */}
          </div>
        </div>
      )}

    </>
  )
}

export default App
