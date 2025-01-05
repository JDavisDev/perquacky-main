/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Key, useState } from 'react'
import './App.css'
// import Timer from './Timer'
import dictImport from '../src/assets/masterWordList.txt'

export default function App() {
  const [word, setWord] = useState('');
  const [submittedWords, setSubmittedWords] = useState([]);
  const [threeLetterWordCount, setThreeLetterWordCount] = useState(0);
  const [fourLetterWordCount, setFourLetterWordCount] = useState(0);
  const [fiveLetterWordCount, setFiveLetterWordCount] = useState(0);
  const [sixLetterWordCount, setSixLetterWordCount] = useState(0);
  const [sevenLetterWordCount, setSevenLetterWordCount] = useState(0);
  // const [, setShowDialog] = useState(false);
  const [, setScore] = useState(0);

  // const url = 'https://jdavisdev.github.io/perquacky-main/masterWordList.txt';
  // const debugUrl = 'http://localhost:5173/src/assets/masterWordList.txt';
  let dict = '';
  fetch(dictImport)
  .then(response => response.text())
  .then((data) => {
   dict = data;
  })

  function clearWord() {
    setWord('');
  }

  // function clearStats() {
  //   setThreeLetterWordCount(0);
  //   setFourLetterWordCount(0);
  //   setFiveLetterWordCount(0);
  //   setSixLetterWordCount(0);
  //   setSevenLetterWordCount(0);
  //   setScore(0);
  //   setSubmittedWords([]);
  //   setWord('');
  // }

  function calculateStats() {
    let tempScore = 0;
    submittedWords.forEach((word) => {
      switch (word.length) {
        case 3: setThreeLetterWordCount((prevCount) => prevCount + 1);
        break;
        case 4: setFourLetterWordCount((prevCount) => prevCount + 1);
        break;
        case 5: setFiveLetterWordCount((prevCount) => prevCount + 1);
        break;
        case 6: setSixLetterWordCount((prevCount) => prevCount + 1);
        break;
        case 7: setSevenLetterWordCount((prevCount) => prevCount + 1);
        break;
        case 8: tempScore += 500;
        break;
        case 9: tempScore += 1000;
        break;
      }
    });

    if (threeLetterWordCount === 3) {
      tempScore += 100;
    }
    if (fourLetterWordCount === 3) {
      tempScore += 200;
    }
    if (fiveLetterWordCount === 3) {
      tempScore += 300;
    }
    if (sixLetterWordCount === 3) {
      tempScore += 400;
    }
    if (sevenLetterWordCount === 3) {
      tempScore += 500;
    }

    setScore(tempScore);
  }

  function submitWord() {
    // Send the word to the backend
    // add it to word history and store locally for scoring
    if (word.length > 2 && dict.includes(word) && !submittedWords.includes(word)) {
      const update = [...submittedWords, word];
      setSubmittedWords(update);
      clearWord();
      calculateStats();
    } else {
      // show error or highlight the input field
      // setSubmittedWords([...submittedWords, 'Invalid word']);
    }
  }

  function onLetterClick(letter, index) {
    const clickedLetter = word[index];
    if (clickedLetter === letter) {
      setWord((prevWord) => prevWord.slice(0, index) + prevWord.slice(index + 1));
    }
  }

  // function onTimerEnd() {
  //   clearWord();
  //   setShowDialog(true);
  // }

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
      <LettersGrid setWord = { setWord }/>
      <WordInputField word={word} onLetterClick={onLetterClick} clearWord={clearWord} submitWord={submitWord}/>
      <WordHistory wordHistory={submittedWords} />
      <Score submittedWords = {submittedWords} threeLetterWordCount={threeLetterWordCount} />
      {/* {showDialog ? <Dialog isOpen={showDialog}>
        <h1 style={{color: 'black'}}>Game Over!</h1>
        <p>Score</p>
      </Dialog> : null} */}
    </>
  )
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

function LettersGrid(props) {
  const [letter, setLetter] = useState(['A', 'R', 'S', 'E', 'T', 'L', 'I', 'N', 'K']);
  // Function to shuffle the array
const shuffleArray = (arr: any[]) => {
  return arr
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

const handleLetterClick =  (letter: string) => {
  props.setWord((prevWord) => prevWord + letter);
}

const handleShuffleClick = () => {
  const shuffledArray = shuffleArray(letter);
  setLetter(shuffledArray);
};

  return (
    <>
    <button onClick={handleShuffleClick}>
      Shuffle v2
      </button>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
    {letter.map((item, index) => (
      <button key={index} className="grid-cell" style={{ padding: "30px", fontSize: "40px", backgroundColor: "antiquewhite", color: "black", border: "1px solid black" }} onClick={() => handleLetterClick(item)}>
        {item}
      </button>
    ))}
  </div>
    </>
  );
};

function WordInputField({ word, onLetterClick, clearWord, submitWord }) {
return (
  <>
  <div className="scrabble-word">
    {word.split('').map((letter: string, index: Key) => (
      <div
        key={index}
        className="scrabble-tile"
        onClick={() => onLetterClick(letter, index)}
      >
        {letter.toUpperCase()}
      </div>
    ))}
  </div>
  <input style={{ padding: "8px", width:"35%", height: "50px", marginRight:"50px", fontSize:"24px"}}type="reset" value="Clear" alt="Clear the search form" onClick={clearWord}></input>
  <input style={{ padding: "8px", width:"35%", height: "50px", fontSize:"24px"}}type="submit" value="Submit" onClick={submitWord}></input>
  </>
);
}

function WordHistory({ wordHistory}) {
return (
  <div>
    {wordHistory.map((word) => (
      <p key={word}>{word}</p>
    ))}
  </div>
);
}

function Score({submittedWords, threeLetterWordCount}) {
  let newScore = 0;
  for (const element of submittedWords) {
    newScore = newScore + element.length **2;
  }
return (
  <div>
    <p>Score: {newScore}</p>
    <p>Words: {submittedWords.length}</p>
    <p style={{color: threeLetterWordCount >= 3 ? 'green' : 'gray'}}>3 letter words</p>
    <p style={{color: false ? 'green' : 'gray'}}>4 letter words</p>
    <p style={{color: false ? 'green' : 'gray'}}>5 letter words</p>
    <p style={{color: false ? 'green' : 'gray'}}>6 letter words</p>
    <p style={{color: false ? 'green' : 'gray'}}>7 letter words</p>
    <p style={{color: false ? 'green' : 'gray'}}>8 letter words</p>
  </div>
);
}