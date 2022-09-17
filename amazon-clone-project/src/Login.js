import React, { useState } from 'react'
import './CSS/Login.css';
import amazon_logo from "./Images/amazon-logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = e => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        navigate('/');
      })
      .catch(error => alert(`Invalid email or password, please try again!`));
  }


  // const switchToCreateAccountPage = () => {
  //   auth.
  //     isSignInWithEmailLink(email, password)
  //     .then((auth) => {
  //       navigate('/CreateAccount');
  //   })
  // }
  return (
    <div className='login'>
      <Link to='/'>
        <img className='amazon__logo' src={amazon_logo} alt='amazon-logo'></img>
      </Link>

      <div className='login__container'>
        <h1>Sign in</h1>

        <form>
          <h5>E-mail</h5>
          <input type='text' value={email} onChange={e => setEmail(e.target.value)}></input>
          <h5>Password</h5>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)}></input>
          <button className='login__signInButton' type='submit' onClick={signIn}>Sign In</button>
        </form>
        <p>
            By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use and Sale. 
            Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
        </p>
        
      </div>
      <div className='new__to__amazon'>
        <hr></hr>
        <h5>New to Amazon?</h5>
        <hr></hr>
      </div>
      <Link to='/createAccount'>
        <button className='login__registerButton'>Create Your Amazon Account</button>
      </Link>
      
    </div>
  )
}

export default Login