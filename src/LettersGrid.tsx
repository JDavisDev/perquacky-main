import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

export default function LettersGrid({
  setLetters,
  setWord,
  word,
  letters,
  hasStarted,
  clearWord,
  submitWord,
  handleShuffleClick,
}) {
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
      <span className="button-row">
        <button className="clear" onClick={clearWord}>
          X
        </button>
        <button className="shuffle-button" onClick={handleShuffleClick}>
          <FontAwesomeIcon icon={faRandom} className="shuffle-icon" />
        </button>
        <button className="submit" onClick={submitWord}>
          Submit
        </button>
      </span>
    </>
  );
}
