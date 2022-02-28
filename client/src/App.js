import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';


import { TheFooter, TheHeader } from './containers';
import { Home, Watchlist, Notification } from './views/pages';

function App() {
  return (
    <Router>
        <TheHeader />
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/watchlist' element={<Watchlist/>} />
          <Route exact path='/notification' element={<Notification/>} />
        </Routes>
        <TheFooter />
    </Router>
  );
}

export default App;
