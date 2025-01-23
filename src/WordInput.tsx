import { Key } from "react";
export default function WordInput({ word, onLetterClick }) {
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
