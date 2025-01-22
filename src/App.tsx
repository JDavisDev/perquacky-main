import { Key, Suspense, useEffect, useState } from "react";
import "./App.css";
import Timer from "./Timer";
import dictImport from "../src/assets/masterWordList.txt";
import ModalDialog from "./ModalDialog";
import { createPortal } from "react-dom";
import WordHistory from "./WordHistory";
import ScoreSection from "./ScoreSection";

export default function App() {
  const [word, setWord] = useState("");
  const [letters, setLetters] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [submittedWords, setSubmittedWords] = useState([]);
  const [threeLetterWordCount, setThreeLetterWordCount] = useState(0);
  const [fourLetterWordCount, setFourLetterWordCount] = useState(0);
  const [fiveLetterWordCount, setFiveLetterWordCount] = useState(0);
  const [sixLetterWordCount, setSixLetterWordCount] = useState(0);
  const [sevenLetterWordCount, setSevenLetterWordCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      fetch("https://perquacky-backend.vercel.app/letters")
        .then((response) => response.text())
        .then((data) => {
          setLetters(data.split(""));
        });
    };
    fetchData();
  }, []);

  // const url = 'https://jdavisdev.github.io/perquacky-main/masterWordList.txt';
  // const debugUrl = 'http://localhost:5173/src/assets/masterWordList.txt';
  let dict = [];
  fetch(dictImport)
    .then((response) => response.text())
    .then((data) => {
      dict = data.split("\n").map((word) => word.trim().toUpperCase());
    });

  function clearWord() {
    setWord("");
  }

  function clearStats() {
    setThreeLetterWordCount(0);
    setFourLetterWordCount(0);
    setFiveLetterWordCount(0);
    setSixLetterWordCount(0);
    setSevenLetterWordCount(0);
    setScore(0);
    setSubmittedWords([]);
    setWord("");
  }

  function calculateStats(update: string[]) {
    let tempScore = 0;
    setThreeLetterWordCount(0);
    setFourLetterWordCount(0);
    setFiveLetterWordCount(0);
    setSixLetterWordCount(0);
    setSevenLetterWordCount(0);

    let threeLetterCount = 0;
    let fourLetterCount = 0;
    let fiveLetterCount = 0;
    let sixLetterCount = 0;
    let sevenLetterCount = 0;

    update.forEach((word) => {
      switch (word.length) {
        case 3:
          threeLetterCount++;
          tempScore += 10;
          break;
        case 4:
          fourLetterCount++;
          tempScore += 20;
          break;
        case 5:
          fiveLetterCount++;
          tempScore += 40;
          break;
        case 6:
          sixLetterCount++;
          tempScore += 80;
          break;
        case 7:
          sevenLetterCount++;
          tempScore += 200;
          break;
        case 8:
          tempScore += 500;
          break;
        case 9:
          tempScore += 1000;
          break;
      }
    });

    setThreeLetterWordCount(threeLetterCount);
    setFourLetterWordCount(fourLetterCount);
    setFiveLetterWordCount(fiveLetterCount);
    setSixLetterWordCount(sixLetterCount);
    setSevenLetterWordCount(sevenLetterCount);

    if (threeLetterCount >= 3) {
      tempScore += 100;
    }
    if (fourLetterWordCount >= 3) {
      tempScore += 200;
    }
    if (fiveLetterWordCount >= 3) {
      tempScore += 300;
    }
    if (sixLetterWordCount >= 3) {
      tempScore += 400;
    }
    if (sevenLetterWordCount >= 3) {
      tempScore += 500;
    }
    if (
      threeLetterCount > 0 &&
      fourLetterCount > 0 &&
      fiveLetterCount > 0 &&
      sixLetterCount > 0 &&
      sevenLetterCount > 0
    ) {
      tempScore += 1000;
    }
    setScore(tempScore);
  }

  function submitWord() {
    // add it to word history and store locally for scoring
    if (
      word.length > 2 &&
      hasStarted &&
      dict.includes(word.trim().toUpperCase()) &&
      !submittedWords.includes(word)
    ) {
      const update = [...submittedWords, word];
      setSubmittedWords(update);
      clearWord();
      calculateStats(update);
    } else {
      // show error or highlight the input field
      // setSubmittedWords([...submittedWords, 'Invalid word']);
      clearWord();
    }
  }

  function onLetterClick(letter: string, index: number) {
    const clickedLetter = word[index];
    if (clickedLetter === letter) {
      setWord(
        (prevWord) => prevWord.slice(0, index) + prevWord.slice(index + 1)
      );
    }
  }

  function onTimerEnd() {
    clearWord();
    setShowModal(true);
    setHasStarted(false);
  }

  const handleStartClick = () => {
    setHasStarted(true);
    clearStats();
  };

  function handleShuffleClick() {
    const arr = letters;
    const shuffledArray = arr
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
    setLetters(shuffledArray);
  }

  // const Dialog = ({ isOpen, children }) => {
  //   setShowDialog(false);

  //   return (
  //     <div className="dialog-overlay">
  //       <div className="dialog-content">
  //         {children}
  //         <button onClick={() => setShowDialog(false)}>Close</button>
  //         <br></br><br></br>
  //         <Share />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <Suspense fallback={<h2>Loading...</h2>}>
        <div className="content">
          <ScoreSection
            threeLetterWordCount={threeLetterWordCount}
            fourLetterWordCount={fourLetterWordCount}
            fiveLetterWordCount={fiveLetterWordCount}
            sixLetterWordCount={sixLetterWordCount}
            sevenLetterWordCount={sevenLetterWordCount}
          ></ScoreSection>
          <div className="column-content">
            <Timer
              onTimerEnd={onTimerEnd}
              onStartClicked={handleStartClick}
              handleShuffleClick={handleShuffleClick}
              hasStarted={hasStarted}
              score={score}
            />
            <WordInputField word={word} onLetterClick={onLetterClick} />
            <LettersGrid
              setWord={setWord}
              word={word}
              letters={letters}
              hasStarted={hasStarted}
              clearWord={clearWord}
              submitWord={submitWord}
            />
          </div>
          <WordHistory submittedWords={submittedWords} />
        </div>
      </Suspense>
      {/* <img src={logo} alt="Quackle Logo" height="128px" /> */}
      {showModal &&
        createPortal(
          <ModalDialog onClose={() => setShowModal(false)} />,
          document.body
        )}
    </>
  );
}

// function Share() {
//   const handleShare = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: "Quackle",
//           text: "You suck!",
//           url: "https://jdavisdev.github.io/perquacky-main/",
//         });
//       } catch (error) {
//         console.error('Error sharing:', error);
//       }
//     } else {
//       // Fallback behavior if Web Share API is not supported
//       console.log('Web Share API not supported');
//     }
//   };

//   return (
//     <button onClick={handleShare}>Share</button>
//   );
// }

function LettersGrid({
  setWord,
  word,
  letters,
  hasStarted,
  clearWord,
  submitWord,
}) {
  const handleLetterClick = (letter: string) => {
    setWord((prevWord: string) => prevWord + letter);
  };

  function isTileDisabled(item, hasStarted: boolean) {
    if (!hasStarted) {
      return true;
    }
    const wordLetterCount = word
      .toString()
      .split("")
      .filter((currLetter: string) => currLetter === item).length;
    return (
      word.length > 0 &&
      letters
        .toString()
        .split("")
        .filter((currLetter: string) => currLetter === item).length ==
        wordLetterCount
    );
  }

  return (
    <>
      <div className="grid-container">
        {letters.map((item, index) => (
          <button
            key={index}
            className="grid-cell"
            disabled={isTileDisabled(item, hasStarted)}
            onClick={() => handleLetterClick(item)}
          >
            {hasStarted ? item : "?"}
          </button>
        ))}
      </div>
      <br></br>
      <span>
        <button className="clear" onClick={clearWord}>
          X
        </button>
        <button className="submit" onClick={submitWord}>
          Submit
        </button>
      </span>
    </>
  );
}

function WordInputField({ word, onLetterClick }) {
  return (
    <>
      <div className="scrabble-word">
        {word.split("").map((letter: string, index: Key) => (
          <div
            key={index}
            className="scrabble-tile"
            onClick={() => onLetterClick(letter, index)}
          >
            {letter.toUpperCase()}
          </div>
        ))}
      </div>
    </>
  );
}

// function Score({ submittedWords, threeLetterWordCount }) {
//   let newScore = 0;
//   for (const element of submittedWords) {
//     newScore = newScore + element.length ** 2;
//   }
//   return (
//     <div>
//       <p>Score: {newScore}</p>
//       <p>Words: {submittedWords.length}</p>
//       <p style={{ color: threeLetterWordCount >= 3 ? "green" : "gray" }}>
//         3 letter words
//       </p>
//       <p style={{ color: false ? "green" : "gray" }}>4 letter words</p>
//       <p style={{ color: false ? "green" : "gray" }}>5 letter words</p>
//       <p style={{ color: false ? "green" : "gray" }}>6 letter words</p>
//       <p style={{ color: false ? "green" : "gray" }}>7 letter words</p>
//       <p style={{ color: false ? "green" : "gray" }}>8 letter words</p>
//     </div>
//   );
// }
