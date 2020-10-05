import React, {useState, useEffect} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import QuizBee from './components/QuizBee';
import Register from './components/Register';
import Leaderboard from './components/Leaderboard';
import Login from './components/Login';
import axios from 'axios';


function App() {

  //USER
  const [userDetails, setUserDetails] = useState({
    username: "",
    userEmail: "",
    userPassword: "",
    userConfPassword: ""
  });

  useEffect(() => {
    
    console.log('Page loaded')
  }, [] );

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

    alert(res.data.result);

    if(res.data.result === 'User registered') {
      window.location.href="/"
    } else {
      window.location.href="/register"
    }
  }

  const setData = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="App">
      <React.Fragment>
        <BrowserRouter>
          <Navbar  />
          <Switch>
            <Route exact path = "/" render = {() => <Login />} />
            <Route exact path = "/quiz"  render = {() => <QuizBee />} /> 
            <Route exact path = "/register" render = {() => <Register registerUser = {registerUserDetails} setUserData = {setData} />} />
            <Route exact path = "/leaderboard" render = {() => <Leaderboard />} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    </div>
  );
  
}

export default App;
