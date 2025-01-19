export default function ScoreSection({
  threeLetterWordCount,
  fourLetterWordCount,
  fiveLetterWordCount,
  sixLetterWordCount,
  sevenLetterWordCount,
  submittedWords,
}) {
  return (
    <div className="score-section">
      <div className="stats-column">
        <h4>Words: {submittedWords.length}</h4>
        <p>3 Letters {getDots(threeLetterWordCount)}</p>
        <p>4 Letters: {getDots(fourLetterWordCount)}</p>
        <p>5 Letters: {getDots(fiveLetterWordCount)}</p>
        <p>6 Letters: {getDots(sixLetterWordCount)}</p>
        <p>7 Letters: {getDots(sevenLetterWordCount)}</p>
      </div>
    </div>
  );
}

function getDots(count) {
  const filledDots = "•".repeat(count);
  const emptyDots = "○".repeat(3 - count);
  return filledDots + emptyDots;
}
