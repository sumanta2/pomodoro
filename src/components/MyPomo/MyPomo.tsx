import { useState, useEffect } from 'react';
import "./MyPomo.css"

import { RingProgress, Text } from '@mantine/core';


const MyPomo = () => {
  const [remaining, setRemaining] = useState(0);
  const [breakTime, setBreakTime] = useState(false)
  const [cycle, setCycle] = useState(0);
  const [totalCircle, setTotalCircle] = useState(1);
  const [totalTime, setTotalTime] = useState(25 * 60);    //here time in second
  const [totalBreak, setTotalBreak] = useState(5 * 60);  //here time in second
  const [inputTime, setInputTime] = useState(25 * 60);
  const [inputBreak, setInputBreak] = useState(5 * 60);


  useEffect(() => {
    let time: number;
    time = setInterval(() => {

      if (remaining === (totalBreak + 1)) {
        setBreakTime(true);
        setRemaining((prevRemaining) => prevRemaining - 1);
      }
      else if (remaining === 0) {
        if (cycle > 0) {
          setCycle((cycle) => cycle - 1);
          setRemaining(totalTime);
        }
        else {
          clearInterval(time);
        }
        setBreakTime(false);
      }
      else {
        setRemaining((prevRemaining) => prevRemaining - 1);
      }
    }, 1000);

    return () => {
      clearInterval(time);
    }

  }, [remaining]);



  const timer = () => {

    setTotalTime(inputTime + inputBreak);
    setTotalBreak(inputBreak);
    setCycle(totalCircle - 1);
    setRemaining(inputTime + inputBreak);
  };



  return (
    <div className="pomoContainer">
      <span className={breakTime ? "break breakColor" : "break workColor"}>{breakTime ? "Break" : remaining !== 0 ? "Work" : "Pomodoro Clock"}</span>

      <RingProgress
        roundCaps
        size={170}
        thickness={15}
        sections={[{ value: remaining / (totalTime / 100), color: breakTime && remaining >= 1 ? 'red' : remaining < 1 ? "#f1f3f5" : "blue" }]}
        label={
          <Text color={breakTime ? 'red' : remaining === 0 ? "white" : "blue"} weight={700} align="center" size="xl">
            {Math.floor(remaining / 60) + " : " + remaining % 60}
          </Text>
        }
      />
      <div className='inputContainer'>
        <div className="inputWrapper">
          <label htmlFor="">Enter Work</label>
          <input type="number" value={inputTime / 60} onChange={(e) => setInputTime(() => (parseInt(e.target.value ?? 2) * 60))} onBlur={(e) => e.target.value === "" ? setInputTime(25 * 60) : ""} className="repeatNo" placeholder='Time' />
        </div>
        <div className="inputWrapper">
          <label htmlFor="">Enter Break</label>
          <input type="number" value={inputBreak / 60} onChange={(e) => setInputBreak(() => (parseInt(e.target.value ?? 1) * 60))} onBlur={(e) => e.target.value === "" ? setInputBreak(5 * 60) : ""} className="repeatNo" placeholder='Break' />
        </div>
      </div>
      <div className='inputContainer'>
        <input type="number" value={totalCircle} onChange={(e) => setTotalCircle(parseInt(e.target.value ?? 1))} onBlur={(e) => e.target.value === "" ? setTotalCircle(1) : ""} min={1} className="repeatNo" placeholder='total Cycle' />
        <button className='btn' disabled={cycle !== 0 || remaining !== 0} onClick={() => timer()}>Start</button>
      </div>
    </div>
  );
};

export default MyPomo;
