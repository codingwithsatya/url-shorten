import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Redirect from './components/Redirect';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/redirect/:code" element={<Redirect />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
