import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import './App.css';
import Main from '../Main/Main.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import NotFound from '../NotFound/NotFound.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Movies from '../Movies/Movies.js';
import Profile from '../Profile/Profile.js';
import Header from '../Header/Header.js';
import AuthHeader from '../AuthHeader/AuthHeader';
import Footer from '../Footer/Footer.js';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Header />
            <Main />
            <Footer />
          </Route>
          <Route exact path='/signin'>
            <AuthHeader text='Рады видеть!' />
            <Login />
          </Route>
          <Route exact path='/signup'>
            <AuthHeader text='Добро пожаловать!' />
            <Register />
          </Route>
          <Route exact path='/profile'>
            <Header />
            <Profile />
          </Route>
          <Route exact path='/saved-movies'>
            <Header />
            <SavedMovies />
            <Footer />
          </Route>
          <Route exact path='/movies'>
            <Header />
            <Movies />
            <Footer />
          </Route>
          <Route exact path='/*'>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
