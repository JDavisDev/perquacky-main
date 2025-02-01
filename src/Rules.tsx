import { Link } from "react-router";
import "./Rules.css";

export default function Rules() {
  return (
    <div className="rules-page">
      <Link to={"/perquacky-main"} className="back-button"></Link>
      <div className="game-instructions">
        <p className="intro-text">
          You have 90 seconds to create as many words, three letters or longer,
          as possible!
        </p>

        <h3>Scoring</h3>

        <div className="table-container">
          <table className="score-table">
            <thead>
              <tr>
                <th>Letters</th>
                <th>Points</th>
                <th>Bonus (3 words)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>3</td>
                <td>10</td>
                <td>100</td>
              </tr>
              <tr>
                <td>4</td>
                <td>20</td>
                <td>200</td>
              </tr>
              <tr>
                <td>5</td>
                <td>40</td>
                <td>400</td>
              </tr>
              <tr>
                <td>6</td>
                <td>80</td>
                <td>600</td>
              </tr>
              <tr>
                <td>7</td>
                <td>160</td>
                <td>—</td>
              </tr>
              <tr>
                <td>8</td>
                <td>320</td>
                <td>—</td>
              </tr>
              <tr>
                <td>9</td>
                <td>640</td>
                <td>—</td>
              </tr>
              <tr>
                <td>10</td>
                <td>1500</td>
                <td>—</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="bonus-text">
          <strong>Bonus:</strong> Earn <strong>500 points</strong> if you score
          a 3, 4, 5, and 6-letter word.
        </p>
      </div>
    </div>
  );
}
