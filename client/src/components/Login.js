import React from 'react';
import './Login.css';

const Login = (props) => {
    
    return(
      <div className="login">
        <h2>Login</h2>
            <form>
            <input type="email" name="userEmail" placeholder="Enter email..." onChange={props.setData}/>
            <input type="password" name="userPassword" placeholder="Enter password..." onChange={props.setData}/>
            <button type="submit" onClick={props.loginForm}>LOG IN</button>
            </form>
            <p>Not registered? Head on over to our register page.</p>
      </div>
    )
}

export default Login;