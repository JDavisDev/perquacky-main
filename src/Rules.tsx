import { Link } from "react-router";
import "./Rules.css";

export default function Rules() {
  return (
    <div className="rules-page">
      <Link to={"/perquacky-main"}>Back</Link>
      <p>You have 90 seconds to create as many words as possible!</p>
      <p>
        Tap the letters to form words of at least three letters. Tap the 'X' to
        clear the word or tap a letter in the box to clear the letter.
      </p>
      <h3>Scoring</h3>
      <p>
        Here's the breakdown of points per word based on letters in the word.
      </p>
      <p>Three: 10</p>
      <p>Four: 20</p>
      <p>Five: 40</p>
      <p>Six: 80</p>
      <p>Seven: 200</p>
      <p>Eight: 500</p>
      <p>Nine: 1000</p>
      <p>Ten: 1500</p>
      <br></br>
      <p>For three words of three letters: 100</p>
      <p>For three words of four letters: 200</p>
      <p>For three words of five letters: 300</p>
      <p>For three words of six letters: 500</p>
      <p>
        500 bonus points if you get a three letter word, four letter word, five
        letter word, and a six letter word.
      </p>
    </div>
  );
}
