import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';


import { TheFooter, TheHeader, TheContent } from './containers';

function App() {
  return (
    <Router>
        <TheHeader />
        <Routes>
          <Route exact path='/' element={<TheContent/>} />
        </Routes>
        <TheFooter />
    </Router>
  );
}

export default App;
