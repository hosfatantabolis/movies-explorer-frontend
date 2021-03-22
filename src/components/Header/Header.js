import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Header.css';

function Header() {
  return (
    <header className='header'>
      <img src={logo} alt='Логотип' className='header__logo' />
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
    </header>
  );
}

export default Header;
