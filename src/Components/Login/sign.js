import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sign.css'

function Signup() {
  
  const [signupData, setSignupData] = useState({
    admin:0,
    name:'',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSignupChange = e => {
    const { name, value } = e.target;
    setSignupData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    console.log("signup="+signupData)

        const res= await fetch("http://localhost:3030/signup",{
          method:"POST",
          body:JSON.stringify(signupData),
          headers: {"Content-Type":"application/json"}
        })

        var data = await res.json();

        alert(data.message)

        setSignupData({
          admin:0,
          name:'',
          email: '',
          password: '',
          confirmPassword: ''
        })
  };

  return (
    <div className="signup-container">
        <div className="signup-main">
            <div className="login-signup-button">
                <Link className="login-btn" to="/login">
                    Login
                </Link>
                <Link className="signup-btn active" to="/signup">
                    Signup
                </Link>
            </div>
            
            <form onSubmit={handleSignupSubmit}>
                <div className="signup-form-group">
                    <label htmlFor="signupName" className="signup-form-label">
                        Full Name
                    </label>
                    <input
                        type="text"
                        className="signup-form-control"
                        id="signupName"
                        name="name"
                        placeholder="Enter your full name"
                        value={signupData.name}
                        onChange={handleSignupChange}
                        required
                    />
                </div>
                <div className="signup-form-group">
                    <label htmlFor="signupEmail" className="signup-form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="signup-form-control"
                        id="signupEmail"
                        name="email"
                        placeholder="Enter your email"
                        value={signupData.email}
                        onChange={handleSignupChange}
                        required
                    />
                </div>
                <div className="signup-form-group">
                    <label htmlFor="signupPassword" className="signup-form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="signup-form-control"
                        id="signupPassword"
                        name="password"
                        placeholder="Create a password"
                        value={signupData.password}
                        onChange={handleSignupChange}
                        required
                    />
                </div>
                <div className="signup-form-group">
                    <label htmlFor="signupConfirmPassword" className="signup-form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="signup-form-control"
                        id="signupConfirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={signupData.confirmPassword}
                        onChange={handleSignupChange}
                        required
                    />
                </div>
                <button type="submit" className="signup-submit-btn">
                    Create Account
                </button>

                <p className="signup-bottom-text">
                    Already have an account? {' '}
                    <Link to="/login" className="signup-bottom-link">
                        Login here
                    </Link>
                </p>
            </form>
        </div>
    </div>
  );
}

export default Signup;
