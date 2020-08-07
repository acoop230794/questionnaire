import React from "react";
import "./Result.css"
const Result = ({score, playAgain, registerScore}) => (
  <div className="score-board">
    <div className="score">You scored {score} / 10 correct answers!</div>
    <button className="playBtn" onClick={playAgain}>
      Play again!
    </button>
    <form>
        <button type="submit" onClick={registerScore}>SAVE SCORE</button>
    </form>
  </div>
);
export default Result;