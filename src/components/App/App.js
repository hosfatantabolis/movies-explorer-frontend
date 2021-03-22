import React from 'react';
import {
  Route,
  useHistory,
  Switch,
  BrowserRouter,
  Redirect,
} from 'react-router-dom';

import './App.css';
import Main from '../Main/Main.js';
import Header from '../Header/Header.js';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Main />
      </BrowserRouter>
    </div>
  );
}

export default App;
