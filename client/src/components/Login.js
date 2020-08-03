import React from 'react';
import './Login.css';

const Login = (props) => {
    
    return(
      <div className="login">
        <div className="login-inner">
          <div className="login-left">
            <h2>Quizzical</h2>
            <h4>Ready to test your brain against<br /> our skull busting question?</h4>
          </div>
          <div className="login-right">
            <div className="login-heading">
              <i class="fas fa-user-lock fa-2x"></i>
              <h2>Login</h2>
            </div>
            <form>
                <input type="email" name="userEmail" placeholder="Enter email..." onChange={props.setData} />

                <input type="password" name="userPassword" placeholder="Enter password..." onChange={props.setData}/>
                <button type="submit" onClick={props.loginForm}>LOG IN</button>
            </form>
            <p>Not registered? Head on over to our register page.</p>
          </div>
          
        </div>
        </div>
    )
}

export default Login;