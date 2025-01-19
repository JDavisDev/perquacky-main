import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/free-solid-svg-icons";

export default function Timer({onTimerEnd, onStartClicked, handleShuffleClick, hasStarted}) {
  // We need ref in this, because we are dealing
  // with JS setInterval to keep track of it and
  // stop it when needed

  const Ref = useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState("90");
  const [didEnd, setDidEnd] = useState(false);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
          (seconds > 9 ? seconds : "0" + seconds)
      );
    } else if (!didEnd) {
      setDidEnd(true);
      setTimer("00");
      // onTimerEnd();
    }
  };

  function handleStart() {
    onStartClicked();
    clearTimer(getDeadTime());
  }

  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer("90");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 90);
    return deadline;
  };

  return (
    <div>
    {!hasStarted ? <button className="start" onClick={handleStart}>Start</button> : <><br></br></> }
    <div className="top-button-container">
    <button className="shuffle-button" onClick={handleShuffleClick}>
      <FontAwesomeIcon icon={faRandom} className="shuffle-icon" />
    </button>
    <button className="time">{timer}</button>
    <button className="score">0000</button>
    </div>
    </div>
  );
}
