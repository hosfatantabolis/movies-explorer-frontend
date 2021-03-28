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
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import NotFound from '../NotFound/NotFound.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Movies from '../Movies/Movies.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={Main}></Route>
          <Route exact path='/signin' component={Login}></Route>
          <Route exact path='/signup' component={Register}></Route>
          <Route exact path='/saved-movies' component={SavedMovies}></Route>
          <Route exact path='/movies' component={Movies}></Route>
          <Route exact path='/*' component={NotFound}></Route>
          {/* <Main /> */}
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
