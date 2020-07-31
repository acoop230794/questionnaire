import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Quiz.css';

function Quiz() {

    //QUIZ
    const [questionDetails, setQuestionDetails] = useState({
        question: "",
        correctAnswer: "",
        incorrectAnswer1: "",
        incorrectAnswer2: "",
        incorrectAnswer3: ""
    });

    //SCORE
    const [scoreAndTime, setScoreAndTime] = useState({
        userScore: 0,
        //userTime: 0,
        userEmail: ""
    });

    const getApi = async () => {

        const res = await axios.get("https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple");
        //console.log(res.data.results[0]);
    
        // const question = Map(res.data.results.question);
    
        // console.log(question);
    
        setQuestionDetails({
          question: res.data.results[0].question,
          correctAnswer: res.data.results[0].correct_answer,
          incorrectAnswer1: res.data.results[0].incorrect_answers[0],
          incorrectAnswer2: res.data.results[0].incorrect_answers[1],
          incorrectAnswer3: res.data.results[0].incorrect_answers[2]
        })
      }

      const registerScoreAndTime = async (e) => {

        e.preventDefault();
    
        const body = JSON.stringify({
          score: scoreAndTime.userScore,
          //time: scoreAndTime.userTime,
          email: scoreAndTime.userEmail
        });
    
        console.log(body);
    
        const config = {
          headers:{
            'Content-Type': 'application/json'
          }
        }
    
        const res = await axios.post("/quiz", body, config);
    
        console.log(res.data.result);
    
        getApi();
    }

    useEffect(() => {
        getApi();
        console.log('Page loaded')
    }, [] );

    const setScore = (e) => {

        setScoreAndTime({
          ...scoreAndTime,
          [e.target.name]: + 1
        })
        console.log(e.target.name);
    }
    
    const setWrongScore = (e) => {

        setScoreAndTime({
            ...scoreAndTime,
            [e.target.name]: + 0
        })
        console.log(e.target.name);
    }

    const setData = (e) => {
        setScoreAndTime({
          ...scoreAndTime,
          [e.target.name]: e.target.value
        })
    }

    return(
        <div className="Quiz">
            <h2>Quiz</h2>
            <h2>{questionDetails.question}</h2>
            <form>
                <input type="text" name ="userEmail" placeholder="Enter your email..." onChange={setData}/><br />
                <input type="radio" name="userScore" id="answer"  onChange={setScore}/>
                <label htmlFor="answer">{questionDetails.correctAnswer}</label> <br />
                <input type="radio" name="userScoreWrong" id="wrong1"  onChange={setWrongScore}/>
                <label htmlFor="wrongAnswer1">{questionDetails.incorrectAnswer1}</label> <br />
                <input type="radio" name="userScoreWrong" id="wrong2"  onChange={setWrongScore}/>
                <label htmlFor="wrongAnswer2">{questionDetails.incorrectAnswer2}</label> <br />
                <input type="radio" name="userScoreWrong" id="wrong3"  onChange={setWrongScore}/>
                <label htmlFor="wrongAnswer3">{questionDetails.incorrectAnswer3}</label> <br />
                <button type="submit" onClick={registerScoreAndTime}>ANSWER</button>
            </form>
            <h3>Score: {scoreAndTime.userScore}</h3>
        </div>
    );
    
}


export default Quiz;