import { Key } from "react";
export default function WordInput({
  word,
  onLetterClick,
  clearWord,
  isFlashing,
}) {
  return (
    <>
      <div className="word-input-row">
        <div className={`scrabble-word ${isFlashing ? "flash" : ""}`}>
          {word.split("").map((letter: string, index: Key) => (
            <div
              key={index}
              className="scrabble-tile"
              onClick={() => onLetterClick(letter, index)}
            >
              {letter.toUpperCase()}
            </div>
          ))}
          <button className="clear" onClick={clearWord}>
            X
          </button>
        </div>
      </div>
    </>
  );
}
