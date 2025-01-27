import { Suspense, useState } from "react";
import "./App.css";
import Timer from "./Timer";
import dictImport from "../src/assets/masterWordList.txt";
import ModalDialog from "./ModalDialog";
import { createPortal } from "react-dom";
import WordInput from "./WordInput";
import LettersGrid from "./LettersGrid";
import logo from "./assets/quackle.png";

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
  const [hasPlayedToday, setHasPlayedToday] = useState(false);
  const [todayDay, setTodayDay] = useState("");
  const [dict, setDict] = useState([]);

  // const url = 'https://jdavisdev.github.io/perquacky-main/masterWordList.txt';
  // const debugUrl = 'http://localhost:5173/src/assets/masterWordList.txt';
  if (dict.length === 0) {
    fetch(dictImport)
      .then((response) => response.text())
      .then((data) => {
        const dictTemp = data
          .split("\n")
          .map((word) => word.trim().toUpperCase());
        setDict(dictTemp);
      });
  }

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

    if (threeLetterWordCount >= 3) {
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
      sixLetterCount > 0
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
    const today = todayDay;
    localStorage.setItem("score", score.toString());
    localStorage.setItem("date", today);
  }

  function getToday(): string {
    const date = new Date();
    const update = new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeZone: "America/New_York",
    }).format(date); // 1/24/2025
    return update;
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

  function setDate(date: string) {
    setTodayDay(date);
    const dateString = date; // MM/DD/YYYY format
    const oneDate = new Date(dateString); // Parse the string into a Date object
    const oneMilli = oneDate.getTime();
    const localDate = new Date(localStorage.getItem("date"));
    const localMilli = localDate.getTime();
    const didPlayToday = oneMilli === localMilli;
    setHasPlayedToday(didPlayToday);
  }

  return (
    <>
      {true ? (
        <Suspense fallback={<h2>Loading...</h2>}>
          <div className="content">
            {/* <ScoreSection
          threeLetterWordCount={threeLetterWordCount}
          fourLetterWordCount={fourLetterWordCount}
          fiveLetterWordCount={fiveLetterWordCount}
          sixLetterWordCount={sixLetterWordCount}
          ></ScoreSection> */}
            <div className="column-content">
              <Timer
                onTimerEnd={onTimerEnd}
                onStartClicked={handleStartClick}
                hasStarted={hasStarted}
                score={score}
              />
              <WordInput
                word={word}
                onLetterClick={onLetterClick}
                clearWord={clearWord}
              />
              <LettersGrid
                setLetters={setLetters}
                setWord={setWord}
                word={word}
                letters={letters}
                hasStarted={hasStarted}
                submitWord={submitWord}
                handleShuffleClick={handleShuffleClick}
                setDate={setDate}
              />
            </div>
            {/* <WordHistory submittedWords={submittedWords} /> */}
          </div>
        </Suspense>
      ) : (
        <div>
          <img src={logo} alt="Quackle Logo" height="128px" />
          <h1>You played today: {getToday()}</h1>
          <h1>Score: {localStorage.getItem("score")}</h1>
        </div>
      )}
      {/* <img src={logo} alt="Quackle Logo" height="128px" /> */}
      {showModal &&
        createPortal(
          <ModalDialog
            score={score}
            date={todayDay}
            onClose={() => setShowModal(false)}
          />,
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
