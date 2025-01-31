import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

export default function LettersGrid({
  setLetters,
  setWord,
  word,
  letters,
  hasStarted,
  submitWord,
  handleShuffleClick,
  setDate,
}) {
  useEffect(() => {
    const fetchData = async () => {
      fetch("https://perquacky-backend.vercel.app/letters")
        .then((response) => response.json())
        .then((data) => {
          setLetters(data.letters.split(""));
          setDate(data.date);
        });
    };
    fetchData();
  }, []);

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
      .filter((currLetter: string) => currLetter == item).length;
    return (
      word.length > 0 &&
      letters
        .toString()
        .split("")
        .filter((currLetter: string) => currLetter == item).length ==
        wordLetterCount
    );
  }

  return (
    <>
      <div className="grid-container">
        {/* first column */}
        <div className="column">
          <div className="grid-cell">
            <button
              key={letters[0]}
              className="grid-cell"
              disabled={isTileDisabled(letters[0], hasStarted)}
              onClick={() => handleLetterClick(letters[0])}
            >
              {hasStarted ? letters[0] : "?"}
            </button>
          </div>
          <div className="grid-cell">
            <button
              key={letters[1]}
              className="grid-cell"
              disabled={isTileDisabled(letters[1], hasStarted)}
              onClick={() => handleLetterClick(letters[1])}
            >
              {hasStarted ? letters[1] : "?"}
            </button>
          </div>
          <div className="grid-cell">
            <button
              key={letters[2]}
              className="grid-cell"
              disabled={isTileDisabled(letters[2], hasStarted)}
              onClick={() => handleLetterClick(letters[2])}
            >
              {hasStarted ? letters[2] : "?"}
            </button>
          </div>
          <button className="shuffle-button" onClick={handleShuffleClick}>
            <FontAwesomeIcon icon={faRandom} className="shuffle-icon" />
          </button>
        </div>

        <div className="column">
          <div className="grid-cell">
            <button
              key={letters[3]}
              className="grid-cell"
              disabled={isTileDisabled(letters[3], hasStarted)}
              onClick={() => handleLetterClick(letters[3])}
            >
              {hasStarted ? letters[3] : "?"}
            </button>
          </div>
          <div className="grid-cell">
            <button
              key={letters[4]}
              className="grid-cell"
              disabled={isTileDisabled(letters[4], hasStarted)}
              onClick={() => handleLetterClick(letters[4])}
            >
              {hasStarted ? letters[4] : "?"}
            </button>
          </div>
          <div className="grid-cell">
            <button
              key={letters[5]}
              className="grid-cell"
              disabled={isTileDisabled(letters[5], hasStarted)}
              onClick={() => handleLetterClick(letters[5])}
            >
              {hasStarted ? letters[5] : "?"}
            </button>
          </div>
          <div className="grid-cell">
            <button
              key={letters[6]}
              className="grid-cell"
              disabled={isTileDisabled(letters[6], hasStarted)}
              onClick={() => handleLetterClick(letters[6])}
            >
              {hasStarted ? letters[6] : "?"}
            </button>
          </div>
        </div>

        <div className="column">
          <div className="grid-cell">
            <button
              key={letters[7]}
              className="grid-cell"
              disabled={isTileDisabled(letters[7], hasStarted)}
              onClick={() => handleLetterClick(letters[7])}
            >
              {hasStarted ? letters[7] : "?"}
            </button>
          </div>
          <div className="grid-cell">
            <button
              key={letters[8]}
              className="grid-cell"
              disabled={isTileDisabled(letters[8], hasStarted)}
              onClick={() => handleLetterClick(letters[8])}
            >
              {hasStarted ? letters[8] : "?"}
            </button>
          </div>
          <div className="grid-cell">
            <button
              key={letters[9]}
              className="grid-cell"
              disabled={isTileDisabled(letters[9], hasStarted)}
              onClick={() => handleLetterClick(letters[9])}
            >
              {hasStarted ? letters[9] : "?"}
            </button>
          </div>
          <button className="submit" onClick={submitWord}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
