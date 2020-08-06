import React, {useState, useEffect} from 'react';
import Timer from './Timer';
import Dropdown from './Dropdown';
import axios from 'axios';
import './Quiz.css';

function Quiz() {

    //QUIZ
    const [questionDetails, setQuestionDetails] = useState({
        question: "",
        correctAnswer: "",
        incorrectAnswer1: "",
        incorrectAnswer2: "",
        incorrectAnswer3: "",
        data: ""
    });

    // DROPDOWN STATE
    const [ dropdown, setDropDown ] = useState( {
        category: '',
        difficulty: '' 
    });

    //SCORE COUNTER BEFORE SAVE
    const [tempScore, setTemp] = useState({
        score: 0
    });

    //EMAIL
    const [scoreAndTime, setScoreAndTime] = useState({
        userEmail: ""
    });

    const getApi = async () => {

        const category = dropdown.category;
        const difficulty = dropdown.difficulty;

        const res = await axios.get(`https://opentdb.com/api.php?amount=20&category=${category}&difficulty=${difficulty}&type=multiple`);
        
        setQuestionDetails({
            question: res.data.results[0].question,
            correctAnswer: res.data.results[0].correct_answer,
            incorrectAnswer1: res.data.results[0].incorrect_answers[0],
            incorrectAnswer2: res.data.results[0].incorrect_answers[1],
            incorrectAnswer3: res.data.results[0].incorrect_answers[2],
            data: res.data.results
        })
    }

    const nextQuestion = (e) => {
        e.preventDefault();

        getApi();
    }

    const registerScoreAndTime = async (e) => {

        e.preventDefault();
    
        const body = JSON.stringify({
          score: tempScore.score,
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
    }

    useEffect(() => {
        getApi();
        console.log('Page loaded')
    }, [] );

    const setScore = (e) => {
        e.preventDefault();

        setTemp({
          [e.target.name]: tempScore.score + parseInt(e.target.value),
          counter: tempScore.counter + 1
        })
        console.log(e.target.value);
    }

    const setData = (e) => {
        setScoreAndTime({
          ...scoreAndTime,
          [e.target.name]: e.target.value
        })
    }

    const setApi =  (e) => {
        e.preventDefault();

        setDropDown({
         [e.target.name] : e.target.value
       })
    }

    if(questionDetails.data < 20){
    return  (
        <div className="quiz">
          <div className="container">
            <h2>Quizzical</h2>
                <h2><Dropdown setApi={setApi}/></h2>  
                <h2>{questionDetails.question}</h2>
                <h3 className="playerScore">Score: {tempScore.score}</h3>
            <form className="quiz-btns">
                <input type="text" className="quizEmail" name ="userEmail" placeholder="Enter your email..." onChange={setData}/><br />
                <button className="btn-ans" type="submit" name="score" value={1} onClick={setScore}>{questionDetails.correctAnswer}</button>
                <button className="btn-ans" type="submit" name="score" value={0} onClick={setScore}>{questionDetails.incorrectAnswer1}</button>
                <button className="btn-ans" type="submit" name="score" value={0} onClick={setScore}>{questionDetails.incorrectAnswer2}</button>
                <button className="btn-ans" type="submit" name="score" value={0} onClick={setScore}>{questionDetails.incorrectAnswer3}</button>
                <button className="btn-next" type="submit" onClick={nextQuestion}>NEXT<i class="fa fa-angle-double-right"></i></button>
            </form>
            <form>
                  <button className="btn-save" type="submit" onClick={registerScoreAndTime}>SAVE SCORE</button>
            </form>
              
            <Timer />
          </div>
        </div>
    )} else {
        return(
            <div className="quiz">
                <div className="container">
                    <h2>Quizzical</h2>
                    <h3>FINISHED!!</h3>
                    <form>
                        <button type="submit" onClick={registerScoreAndTime}>SAVE SCORE</button>
                    </form>
                </div>
            </div>
        )
    }
    
}


export default Quiz;