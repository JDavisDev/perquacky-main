export default function WordHistory({ submittedWords }) {
  return (
    <div className="word-history-column">
      <h2>History</h2>
      {submittedWords.map((word: string) => (
        <p className="word-history-row" key={word}>
          {word}
        </p>
      ))}
    </div>
  );
}
