import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {
  const location = useLocation();

  let headerVisible = false;
  let navigationVisible = false;
  if (
    location.pathname === '/saved-movies' ||
    location.pathname === '/movies' ||
    location.pathname === '/profile'
  ) {
    headerVisible = true;
    navigationVisible = true;
  } else if (location.pathname === '/' && !loggedIn) {
    headerVisible = true;
    navigationVisible = false;
  } else if (location.pathname === '/' && loggedIn) {
    headerVisible = true;
    navigationVisible = true;
  } else {
    headerVisible = false;
  }

  return (
    <header className={`header ${headerVisible ? '' : 'header_hidden'}`}>
      <Link to='/'>
        <img src={logo} alt='Логотип' className='header__logo' />
      </Link>
      {navigationVisible ? (
        <Navigation />
      ) : (
        <div className='header__buttons-group'>
          <Link to='/signup'>
            <button className='header__button'>Регистрация</button>
          </Link>
          <Link to='/signin'>
            <button className='header__button header__button_modified'>
              Войти
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
