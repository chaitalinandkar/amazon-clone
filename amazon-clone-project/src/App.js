import React from 'react';
import './CSS/App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from './Header';
import Home from './Home';
import Groceries from './Groceries';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Header />} />
        </Routes>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
        <Routes>
          <Route path='/groceries' element={<Groceries />} />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;