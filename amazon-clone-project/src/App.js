import React, { useEffect } from 'react';
import './CSS/App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './Home';
import Header from './Header';
import Checkout from './Checkout';
import Login from './Login';
import { auth } from "./firebase";
import { useStateValue } from './StateProvider';
import CreateAccount from './CreateAccount';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders';


const promise = loadStripe("Publishable Key");

function App() {

  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    // will only run once the app component loads...
    auth.onAuthStateChanged(authUser => {
      console.log(`THE USER IS >>> `, authUser);
      if (authUser) {
        // the user just logged in / the user was logged in 
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
        <Routes>
          <Route path='/createAccount'element={<CreateAccount />}/>
        </Routes>
        <Routes>
          <Route path='/' element={<Header />} />
        </Routes>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>

        <Routes>
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
        <Elements stripe={promise}>
          <Routes>
            <Route path='/payment' element={<Payment />} />
          </Routes>
        </Elements>
        <Routes>
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
