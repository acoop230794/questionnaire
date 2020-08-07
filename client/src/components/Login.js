import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Login.css';

function Login ()  {

    //USER
    const [userDetails, setUserDetails] = useState({
        username: "",
        userEmail: "",
        userPassword: "",
        userConfPassword: ""
    });

    //LOGIN
    const [isLoggedIn, setLogin] = useState({
        cookie: false,
        message: ""
    })

    useEffect(() => {
        
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
        
        setLogin({
            ...isLoggedIn,
            cookie: res.data.cookie,
            message: res.data.result
        })

        if(res.data.cookie === true){
            window.location.href="/quiz"
        } else{
            window.location.href="/"
        }

        console.log(res.data.result);

        alert(res.data.result);
    }

    const setData = (e) => {
        setUserDetails({
          ...userDetails,
          [e.target.name]: e.target.value
        })
    }
    
    return(
        <div className="login">
            <div className="login-inner">
                <div className="login-left">
                    <h2><span>Q</span>uizzical</h2>
                    <ul>
                        <li><i class="far fa-check-square fa-2x"></i>Multiple guess</li>
                        <li><i class="far fa-check-square fa-2x"></i>Skull busting questions</li>
                        <li><i class="far fa-check-square fa-2x"></i>Guaranteed to make you smarter</li>
                    </ul>
                </div>
                <div className="login-right">
                    <div className="login-heading">
                        <i className="fas fa-user-lock fa-2x"></i>
                        <h2>Login</h2>
                    </div>
                    <form>
                        <input type="email" name="userEmail" placeholder="Enter email..." onChange={setData} />
                        <input type="password" name="userPassword" placeholder="Enter password..." onChange={setData}/>
                        <button type="submit" onClick={loginForm}>LOG IN</button>
                    </form>
                    <p>Not registered? Head on over to our register page.</p>
                </div>
            </div>
        </div>
    )
}

export default Login;