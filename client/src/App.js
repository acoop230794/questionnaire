import React, {useState, useEffect} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Quiz from './components/Quiz';
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
    //getApi();
    console.log('Page loaded')
  }, [] );

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

    if(res.data.result === "Login successful"){
      window.location.href="/quiz"
    } else {
      window.location.href="/login"
    }
    

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
            <Route exact path = "/login" render = {() => <Login loginForm = {loginForm} setData = {setData} />} />
            <Route exact path = "/quiz" render = {() => <Quiz />} />
            <Route exact path = "/register" render = {() => <Register registerUser = {registerUserDetails} setUserData = {setData} />} />
            <Route exact path = "/leaderboard" render = {() => <Leaderboard />} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    </div>
  );
}

export default App;
