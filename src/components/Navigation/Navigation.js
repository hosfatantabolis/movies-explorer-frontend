import React from 'react';
import { Link } from 'react-router-dom';
import accountLogo from '../../images/account-logo.svg';

import './Navigation.css';

function Navigation() {
  return (
    <nav className='navigation'>
      <ul className='navigation__links'>
        <li className='navigation__list-item '>
          <Link to='/movies' className='navigation__link'>
            Фильмы
          </Link>
        </li>
        <li className='navigation__list-item'>
          <Link to='/saved-movies' className='navigation__link'>
            Сохранённые фильмы
          </Link>
        </li>
        <li className='navigation__list-item navigation__list-item_type-account'>
          <Link to='/profile' className='navigation__link '>
            Аккаунт
            <div className='navigation__acc-logo_container'>
              <img
                src={accountLogo}
                alt='иконка аккаунта'
                className='navigation__acc-logo'
              />
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
