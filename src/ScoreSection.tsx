import "./ScoreSection.css";

export default function ScoreSection({
  threeLetterWordCount,
  fourLetterWordCount,
  fiveLetterWordCount,
  sixLetterWordCount,
}) {
  return (
    <div className="stats-column">
      <table>
        <tbody>
          <tr>
            <td className="bonus-row-header">3</td>
            <td className="bonus-row-header">4</td>
            <td className="bonus-row-header">5</td>
            <td className="bonus-row-header">6</td>
          </tr>
          <tr>
            <td>
              <CircularProgress
                percentage={getProgressPercentage(threeLetterWordCount)}
                count={getCount(threeLetterWordCount)}
              />
            </td>
            <td>
              <CircularProgress
                percentage={getProgressPercentage(fourLetterWordCount)}
                count={getCount(fourLetterWordCount)}
              />
            </td>
            <td>
              <CircularProgress
                percentage={getProgressPercentage(fiveLetterWordCount)}
                count={getCount(fiveLetterWordCount)}
              />
            </td>
            <td>
              <CircularProgress
                percentage={getProgressPercentage(sixLetterWordCount)}
                count={getCount(sixLetterWordCount)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function getProgressPercentage(count) {
  if (count == 0) {
    return 0;
  } else if (count == 1) {
    return 33;
  } else if (count == 2) {
    return 66;
  } else {
    return 100;
  }
}

function getCount(count) {
  if (count < 3) {
    return count;
  } else {
    return 3;
  }
}

const CircularProgress = ({
  percentage,
  count,
  size = 40,
  strokeWidth = 5,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background Circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#fff"
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Progress Circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#009225ea"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`} // Start from top
        style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
      />

      {/* Percentage Text */}
      <text
        x="50%"
        y="55%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="16px"
        fontWeight="bold"
        fill="#ffff"
      >
        {count >= 3 ? <>&#10004;</> : count}
      </text>
    </svg>
  );
};
