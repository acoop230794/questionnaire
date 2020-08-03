import React from 'react';
import './Register.css';

const Register = (props) => {
    
    return(
        <div className = "register">
            <div className="container">
                <h2>Register to play quizzical</h2>
                <form>
                    <input type="text" name="username" onChange={props.setUserData} placeholder="Enter username..."/><br />
                    <input type="email" name="userEmail" onChange={props.setUserData} placeholder="Enter email..." /><br />
                    <input type="password" name="userPassword" onChange={props.setUserData} placeholder="Enter password..."/><br />
                    <input type="password" name="userConfPassword" onChange={props.setUserData} placeholder="Confirm password..."/><br />
                    <button type="submit" onClick={props.registerUser}>REGISTER</button>
                </form>
            </div> 
        </div>
    )
}

export default Register;