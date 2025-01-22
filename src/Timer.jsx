import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/free-solid-svg-icons";

export default function Timer({onTimerEnd, onStartClicked, handleShuffleClick, hasStarted, score}) {

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
      return "#1F51FF";
    }
  }

  return (
    <div>
    {!hasStarted ? <button className="start" onClick={handleStart}>Start</button> : <><br></br><br></br></> }
    <div className="top-button-container">
    <button className="shuffle-button" onClick={handleShuffleClick}>
      <FontAwesomeIcon icon={faRandom} className="shuffle-icon" />
    </button>
    <button className="time" style={{backgroundColor: getColor()}}>{time}</button>
    <button className="score">{score}</button>
    </div>
    </div>
  );
}
