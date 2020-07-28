import React, {useState, useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import axios from 'axios';

function App() {

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

  // const getApi = async () => {

  //   // const res = await axios.get("/results");
  //   // console.log(res.data);

  //   // setUserDetails({
  //   //   name: res.data.name,
  //   //   city: res.data.city,
  //   //   age: res.data.age
  //   // })
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

  //POST send to db
  //GET retrieve from db
  //DELETE  axios.delete('/users') BACK-END app.delete('/users')
  //PUT     axios.put('/users') BACK-END app.put('/users')

  return (
    <div className="App">
      <React.Fragment>
        <Navbar />
        <Home />
        <Register />
      </React.Fragment>

      <h2>Login</h2>
      <form>
        <input type="email" name="userEmail" onChange={setData}/>
        <input type="password" name="userPassword" onChange={setData}/>
        <button type="submit" onClick={loginForm}>LOG IN</button>
      </form>

      <h2>Register</h2>
          <form>
              <input type="text" name="username" onChange={setData} placeholder="Enter username..."/>
              <input type="email" name="userEmail" onChange={setData} placeholder="Enter email..." />
              <input type="password" name="userPassword" onChange={setData} placeholder="Enter password..."/>
              <input type="password" name="userConfPassword" onChange={setData} placeholder="Confirm password..."/>
              <button type="submit" onClick={registerUserDetails}>REGISTER</button>
          </form>
    </div>
  );
}

export default App;
