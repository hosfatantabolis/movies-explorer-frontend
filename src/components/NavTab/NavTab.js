import React from 'react';

import './NavTab.css';

function NavTab() {
  return (
    <nav className='nav-tab'>
      <ul className='nav-tab__links'>
        <li className='nav-tab__list_item'>
          <a href='#about' className='nav-tab__link'>
            О проекте
          </a>
        </li>
        <li className='nav-tab__list_item'>
          <a href='#techs' className='nav-tab__link'>
            Технологии
          </a>
        </li>
        <li className='nav-tab__list_item'>
          <a href='#student' className='nav-tab__link'>
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
