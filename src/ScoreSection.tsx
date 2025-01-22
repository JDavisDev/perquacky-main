export default function ScoreSection({
  threeLetterWordCount,
  fourLetterWordCount,
  fiveLetterWordCount,
  sixLetterWordCount,
  sevenLetterWordCount,
}) {
  return (
    <div className="stats-column">
      <h2>Bonus</h2>
      <p>3 Letters {getDots(threeLetterWordCount)}</p>
      <p>4 Letters: {getDots(fourLetterWordCount)}</p>
      <p>5 Letters: {getDots(fiveLetterWordCount)}</p>
      <p>6 Letters: {getDots(sixLetterWordCount)}</p>
      <p>7 Letters: {getDots(sevenLetterWordCount)}</p>
    </div>
  );
}

function getDots(count) {
  if (count <= 3) {
    const filledDots = "•".repeat(count);
    const emptyDots = "○".repeat(3 - count);
    return filledDots + emptyDots;
  } else {
    return "•".repeat(3);
  }
}
