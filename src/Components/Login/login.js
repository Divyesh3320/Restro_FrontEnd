import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useGoogleLogin} from '@react-oauth/google'
import './login.css'

function Login(){

//google login

const responseGoogle =async(authresult)=>{
  try {
    if(authresult['code']){
      const result =await fetch(`http://localhost:3030/googlelogin?code=${authresult['code']}`,{
          method: 'GET',
          credentials: 'include' // This allows cookies to be sent and received
      })
      const data =await result.json();
      // const {email ,name}= data;
      if(data.admin===0){
        localStorage.setItem("user",JSON.stringify({...data,login:"user"}))
        navigate("/user")
      }else if(data.admin===1){
        localStorage.setItem("user",JSON.stringify({...data,login:"admin"}))
        navigate("/admin")
      }
      console.log("success google login=",  data)
    }
  } catch (error) {
      console.error("error due to responseGoogle :",error)
  }
}

const googleLogin = useGoogleLogin(
 {
  onSuccess:responseGoogle,
  onError:responseGoogle,
  flow:'auth-code'
 }
)




// simple login part
  const navigate=useNavigate()
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleLoginChange = e => {
    const { name, value } = e.target;
    setLoginData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleLoginSubmit = async(e) => {
    e.preventDefault();
    const res= await fetch("http://localhost:3030/login",{
          method:"POST",
          body:JSON.stringify(loginData),
          headers: {"Content-Type":"application/json"}
        })

        var data = await res.json();
        // console.log("data=",data)
        // console.log("Login Data:", loginData);
        if(data==="usernotfound"){
          alert("enter valid email or password")
        }else{
          
            if(data.admin===0){
              localStorage.setItem("user",JSON.stringify({...data,login:"user"}))
              navigate("/user")
            }else if(data.admin===1){
              localStorage.setItem("user",JSON.stringify({...data,login:"admin"}))
              navigate("/admin")
            }
            else{
              alert("not valid password")
           }
        }      
  };

  return (
    <div className="login-container">
      <div className="login-main">
        <div className="login-signup-button">
          <Link className="login-btn active" to="/login">
            Login
          </Link>
          <Link className="signup-btn" to="/signup">
            Signup
          </Link>
        </div>
        
        <form onSubmit={handleLoginSubmit}>
          <div className="login-form-group">
            <label htmlFor="loginEmail" className="login-form-label">
              Email address
            </label>
            <input
              type="email"
              className="login-form-control"
              id="loginEmail"
              name="email"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
            />
          </div>
          <div className="login-form-group">
            <label htmlFor="loginPassword" className="login-form-label">
              Password
            </label>
            <input
              type="password"
              className="login-form-control"
              id="loginPassword"
              name="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
          </div>
          <button type="submit" className="login-submit-btn">
            Login
          </button>

          <div className="login-divider"></div>

          <button 
            onClick={googleLogin} 
            className="login-google-btn" 
            type="button"
          >
            <svg className="login-google-icon" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <p className="login-bottom-text">
            Don't have an account? {' '}
            <Link to="/signup" className="login-bottom-link">
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
