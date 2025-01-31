import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";

export default function Timer({onTimerEnd, onStartClicked, hasStarted, score}) {

  const [countdownStarted, setCountdownStarted] = useState(false);
  const [time, setTime] = useState(90);

  useEffect(() => {
    if (!countdownStarted) return;

    if (time <= 0) {
      onTimerEnd();
      return;
    }

    const timerId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timerId);
  }, [countdownStarted, time]);

  function handleStart() {
    setCountdownStarted(true);
    onStartClicked();
  }

  function getColor() {
    if (time <= 10) {
      return "#ff3e30ea";
    }
    if (time <= 30) {
      return "#FFAC1C";
    }
    if (time <= 90) {
      return "#009225ea";
    }
  }

  return (
    <div>
    {!hasStarted ? <button className="start" onClick={handleStart}>Start</button> : <></> }
    {!hasStarted ? <button className="rules"><Link to="/rules">Rules</Link></button> : <></> }
    <div className="top-button-container">
    <button className="time" style={{backgroundColor: getColor()}}>{time}</button>
    <button className="score">{score}</button>
    </div>
    </div>
  );
}
