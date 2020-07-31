import React, {useState, useEffect} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Quiz from './components/Quiz';
import Register from './components/Register';
import Leaderboard from './components/Leaderboard';
import axios from 'axios';


function App() {

  //USER
  const [userDetails, setUserDetails] = useState({
    username: "",
    userEmail: "",
    userPassword: "",
    userConfPassword: ""
  });

  // //QUIZ
  // const [questionDetails, setQuestionDetails] = useState({
  //   question: "",
  //   correctAnswer: "",
  //   incorrectAnswer1: "",
  //   incorrectAnswer2: "",
  //   incorrectAnswer3: ""
  // });

  // //SCORE
  // const [scoreAndTime, setScoreAndTime] = useState({
  //   userScore: 0,
  //   userTime: 0,
  //   password: userDetails.userPassword
  // });

  useEffect(() => {
    //getApi();
    console.log('Page loaded')
  }, [] );

  //REGISTER SCORE AND TIME
  // const registerScoreAndTime = async (e) => {

  //   e.preventDefault();

  //   const body = JSON.stringify({
  //     score: scoreAndTime.userScore,
  //     time: scoreAndTime.userTime,
  //     password: userDetails.userPassword
  //   });

  //   console.log(body);

  //   const config = {
  //     headers:{
  //       'Content-Type': 'application/json'
  //     }
  //   }

  //   const res = await axios.post("/quiz", body, config);

  //   console.log(res.data.result);

  //   // if([e.target.name] === questionDetails.correctAnswer){

  //   //   setScoreAndTime({
  //   //     ...scoreAndTime,
  //   //     [e.target.name]: + 1
  //   //   })

  //   // } else {

  //   //   setScoreAndTime({
  //   //     ...scoreAndTime,
  //   //     [e.target.name]: + 0
  //   //   })
  //   // }

  //   getApi();
  // }

  //RETREIVING INFO FROM API
  // const getApi = async () => {

  //   const res = await axios.get("https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple");
  //   //console.log(res.data.results[0]);

  //   // const question = Map(res.data.results.question);

  //   // console.log(question);

  //   setQuestionDetails({
  //     question: res.data.results[0].question,
  //     correctAnswer: res.data.results[0].correct_answer,
  //     incorrectAnswer1: res.data.results[0].incorrect_answers[0],
  //     incorrectAnswer2: res.data.results[0].incorrect_answers[1],
  //     incorrectAnswer3: res.data.results[0].incorrect_answers[2]
  //   })
  // }

  //LOGIN
  const loginForm = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({
      email: userDetails.userEmail,
      password: userDetails.userPassword
    });

    console.log(body);

    const config = {
      headers:{
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post("/login", body, config);

    console.log(res.data.result);
  }

  //REGISTER USER
  const registerUserDetails = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({
      username: userDetails.username,
      email: userDetails.userEmail,
      password: userDetails.userPassword,
      passwordConf: userDetails.userConfPassword
    });

    console.log(body);

    const config = {
      headers:{
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post("/register", body, config);

    console.log(res.data.result);
  }

  const setData = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    })
  }

  // const setScore = (e) => {

  //   setScoreAndTime({
  //     ...scoreAndTime,
  //     [e.target.name]: + 1
  //   })
  //   console.log(e.target.name);
  // }

  // const setWrongScore = (e) => {

  //   setScoreAndTime({
  //     ...scoreAndTime,
  //     [e.target.name]: + 0
  //   })
  //   console.log(e.target.name);
  // }

  //POST send to db
  //GET retrieve from db
  //DELETE  axios.delete('/users') BACK-END app.delete('/users')
  //PUT     axios.put('/users') BACK-END app.put('/users')

  return (
    <div className="App">

      <React.Fragment>
        <BrowserRouter>
          <Navbar  />
          <Switch>
            <Route exact path = "/quiz" render = {() => <Quiz />} />
            <Route exact path = "/register" render = {() => <Register registerUser = {registerUserDetails} setUserData = {setData} />} />
            <Route exact path = "/leaderboard" render = {() => <Leaderboard />} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>

      <div className="login">
      <h2>Login</h2>
        <form>
          <input type="email" name="userEmail" onChange={setData}/>
          <input type="password" name="userPassword" onChange={setData}/>
          <button type="submit" onClick={loginForm}>LOG IN</button>
        </form>
        <p>Not registered? Head on over to our register page.</p>
      </div>

      {/* <div className="Quiz">
        <h2>Quiz</h2>
        <h2>{questionDetails.question}</h2>
        <form>
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
      </div> */}
    </div>
  );
}

export default App;
