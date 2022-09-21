import React, {useState} from 'react';
import "./CSS/CreateAccount.css";
import amazon_logo from "./Images/amazon-logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";


function CreateAccount() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = e => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
      //it successfully created a new user with email and password
        console.log(auth);
        if (auth) {
          navigate('/');
        }
    })
    .catch(error => alert(error.message))
  }
  return (
    <div className='createAccount'>
      <Link to='/'>
        <img className='amazon__logo' src={amazon_logo} alt='amazon-logo'></img>
      </Link>

      <div className='createAccount__container'>
        <h2>Create Account</h2>

        <form>
          <p>Name</p>
          <input type='text' placeholder='First and last name' required></input>
          <p>E-mail</p>
          <input type='text' value={email} onChange={e => setEmail(e.target.value)} required></input>
          <p>Password</p>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} required></input>
          <button className='createAccountButton' onClick={register}>Continue</button>
        </form>
        <p>
           By creating an account, you agree to Amazon's <a href='/'>Conditions of Use</a> and <a href='/'>Privacy Notice</a>.
        </p>
        <hr />
        <h5 className='alreadyAccount'> 
          Already have an account? <a href='/login'>Sign In</a>
        </h5>
      </div>
        
    </div>
      
  )
}

export default CreateAccount