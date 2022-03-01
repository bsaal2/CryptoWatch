import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


import { RouteList } from './routes';
import { TheFooter, TheHeader } from './containers';

function App() {
  return (
    <Router>
        <TheHeader />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            { RouteList.map((route, index) => {
              return route.component && (
                <Route
                  key={index}
                  path={route.path}
                  name={route.name}
                  element={route.component}
                />
              )
            })}
          </Routes>
        </Suspense>
        <TheFooter />
    </Router>
  );
}

export default App;
