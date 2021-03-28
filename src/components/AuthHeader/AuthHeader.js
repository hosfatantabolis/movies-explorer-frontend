import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

import './AuthHeader.css';

function AuthHeader(props) {
  return (
    <header className='auth-header'>
      <Link to='/'>
        <img src={logo} alt='Логотип' className='auth-header__logo' />
      </Link>
      <h1 className='auth-header__title'>{props.text}</h1>
    </header>
  );
}

export default AuthHeader;
