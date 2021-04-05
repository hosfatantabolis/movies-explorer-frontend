import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import {
  Route,
  useHistory,
  Switch,
  BrowserRouter,
  Redirect,
} from 'react-router-dom';

import './App.css';

//Компоненты
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
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

// API
import { auth, api } from '../../utils/MainApi';

function App() {
  const history = useHistory();
  const [successState, setSuccessState] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  console.log(loggedIn);
  const [currentUser, setCurrentUser] = React.useState({
    name: 'Загрузка...',
    email: 'Загрузка...',
  });

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      tokenCheck(jwt);
    }
  }, []);

  React.useEffect(() => {
    if (loggedIn === true) {
      api
        .getUserInfo()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  const [permission, setPermission] = React.useState(false);
  const tokenCheck = (jwt) => {
    auth
      .tokenCheck(jwt)
      .then((res) => {
        api.setHeaders(jwt);
        console.log(res);
        setCurrentUser(res);
        setLoggedIn(true);
      })
      .catch((err) => {
        if (err.status === 401) {
          console.log('Переданный токен некорректен. Ошибка: ' + err.status);
        }
      })
      .finally(() => {
        setPermission(true);
      });
  };

  if (!permission) {
    return null;
  }

  const handleRegister = (name, password, email) => {
    return auth
      .register(name, password, email)
      .then((data) => {
        console.log(data);
        if (data.message) {
          setSuccessState(false);
          return;
        } else {
          setSuccessState(true);
        }

        // handleInfoTooltip();
        return data;
      })
      .catch((err) => {
        setSuccessState(false);
        if (err.status === 400) {
          console.log('Некорректно заполнено одно из полей ');
          return { message: 'Некорректно заполнено одно из полей' };
        } else {
          console.log('Неизвестная ошибка: ' + err.status);
        }
        // handleInfoTooltip();
      });
  };

  const handleLogin = (password, email) => {
    return auth
      .login(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          api.setHeaders(data.token);
          // setEmail(email);
          setLoggedIn(true);
          // console.log(data);
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          console.log('Пользователь с таким e-mail не найден');
        } else if (err.status === 400) {
          console.log('Не передано одно из полей');
        } else {
          console.log('Неизвестная ошибка: ' + err.status);
        }
        // handleInfoTooltip();
      });
  };
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  };

  const handleUpdateProfile = (email, name) => {
    api
      .setUserInfo(email, name)
      .then((res) => {
        if (res.ok) {
          setCurrentUser({ name: name, email: email });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        <BrowserRouter history={history}>
          <Switch>
            <Route exact path='/'>
              <Header />
              <Main />
              <Footer />
            </Route>
            <Route exact path='/signin'>
              <AuthHeader text='Рады видеть!' />
              {loggedIn ? (
                <Redirect to='/movies' />
              ) : (
                <Login onLogin={handleLogin} />
              )}
            </Route>
            <Route exact path='/signup'>
              <AuthHeader text='Добро пожаловать!' />
              {loggedIn ? (
                <Redirect to='/movies' />
              ) : (
                <Register onRegister={handleRegister} />
              )}
            </Route>
            <Route exact path='/profile'>
              <Header />
              <ProtectedRoute
                exact
                path='/profile'
                component={Profile}
                onLogOut={handleLogout}
                onUpdateUser={handleUpdateProfile}
                loggedIn={loggedIn}
              />
            </Route>
            {/* <ProtectedRoute exact path='/profile'>
              <Header />
              <Profile
                onLogOut={handleLogout}
                onUpdateUser={handleUpdateProfile}
                loggedIn={loggedIn}
                redirectTo='/profile'
              />
            </ProtectedRoute> */}
            <Route exact path='/saved-movies'>
              <Header />
              <ProtectedRoute
                component={SavedMovies}
                onLogOut={handleLogout}
                loggedIn={loggedIn}
              />
              <Footer />
            </Route>
            <Route exact path='/movies'>
              <Header />
              <ProtectedRoute
                component={Movies}
                onLogOut={handleLogout}
                loggedIn={loggedIn}
              />
              <Footer />
            </Route>
            <Route exact path='/*'>
              <NotFound />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
