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
import Movies from '../Movies/Movies.js';
import Profile from '../Profile/Profile.js';
import Header from '../Header/Header.js';
import AuthHeader from '../AuthHeader/AuthHeader';
import Footer from '../Footer/Footer.js';

// API
import api from '../../utils/MainApi';

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [permission, setPermission] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    name: 'Загрузка...',
    email: 'Загрузка...',
    _id: '',
  });

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      tokenCheck(jwt);
    } else {
      setPermission(true);
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

  const tokenCheck = (jwt) => {
    api
      .tokenCheck(jwt)
      .then((res) => {
        api.setHeaders(jwt);
        setCurrentUser(res);
        setLoggedIn(true);
        setPermission(true);
      })
      .catch((err) => {
        if (err.status === 401) {
          console.log('Переданный токен некорректен. Ошибка: ' + err.status);
          setPermission(true);
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
    return api
      .register(name, password, email)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log('Некорректно заполнено одно из полей ');
          return { message: 'Некорректно заполнено одно из полей' };
        } else {
          console.log('Неизвестная ошибка: ' + err.status);
          return { message: 'Неизвестная ошибка: ' + err.status };
        }
        // handleInfoTooltip();
      });
  };

  const handleLogin = (password, email) => {
    return api
      .login(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          api.setHeaders(data.token);
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          console.log('Пользователь с таким e-mail не найден');
          return { message: 'Пользователь с таким e-mail не найден' };
        } else if (err.status === 400) {
          console.log('Не передано одно из полей');
          return { message: 'Не передано одно из полей' };
        } else {
          console.log('Неизвестная ошибка: ' + err.status);
          return { message: 'Неизвестная ошибка: ' + err.status };
        }
      });
  };
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  };

  const handleUpdateProfile = (email, name) => {
    return api
      .setUserInfo(email, name)
      .then((res) => {
        if (res.ok) {
          setCurrentUser({ ...currentUser, name: name, email: email });
        }
        return res;
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
              <Header loggedIn={loggedIn} />
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
                <Register onRegister={handleRegister} onLogin={handleLogin} />
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
            <Route exact path='/saved-movies'>
              <Header />
              <ProtectedRoute
                component={Movies}
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
