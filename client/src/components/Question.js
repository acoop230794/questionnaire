import React, {useState} from "react";
import "./Question.css";
const QuestionBox = ({question, incorrectOne, incorrectTwo, incorrectThree, correct, selected}) => {
  const [answer, setAnswer] = useState({
      incorrectOne: incorrectOne,
      incorrectTwo: incorrectTwo,
      incorrectThree: incorrectThree,
      correct: correct
  });
  return (
    <div className="questionBox">
      <div className="question">{question}</div>
        <div className="answer-btns">
          <button
            className="answerBtn"
            onClick={() => {
                setAnswer({incorrectOne: answer.incorrectOne});
                selected(answer.incorrectOne);
                }}>
                {answer.incorrectOne}
            </button>
            <button
            className="answerBtn"
            onClick={() => {
                setAnswer({incorrectTwo: answer.incorrectTwo});
                selected(answer.incorrectTwo);
                }}>
                {answer.incorrectTwo}
            </button>
            <button
            className="answerBtn"
            onClick={() => {
                setAnswer({incorrectThree: answer.incorrectThree});
                selected(answer.incorrectThree);
                }}>
                {answer.incorrectThree}
            </button>
          <button
            className="answerBtn"
            onClick={() => {
                setAnswer({correct: answer.correct});
                selected(answer.correct);
                }}>
                {answer.correct}
            </button>
        </div>
    </div>
  );
};
export default QuestionBox;