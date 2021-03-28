import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const location = useLocation();

  let footerVisible = false;
  if (location.pathname === '/saved-movies') {
    footerVisible = true;
  } else if (location.pathname === '/movies') {
    footerVisible = true;
  } else if (location.pathname === '/profile') {
    footerVisible = true;
  } else if (location.pathname === '/') {
    footerVisible = true;
  } else {
    footerVisible = false;
  }
  return (
    <footer className={`footer ${footerVisible ? '' : 'footer_hidden'}`}>
      <p className='footer__text'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className='footer__columns'>
        <div className='footer__column'>
          <p className='footer__copyright'>&copy;2020</p>
        </div>
        <nav className='footer__column'>
          <ul className='footer__column-list'>
            <li className='footer__column-list_item'>
              <a
                href='https://praktikum.yandex.ru/'
                className='footer__link'
                target='_blank'
                rel='noreferrer'
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className='footer__column-list_item'>
              <a
                href='https://github.com/hosfatantabolis'
                className='footer__link'
                target='_blank'
                rel='noreferrer'
              >
                Github
              </a>
            </li>
            <li className='footer__column-list_item'>
              <a
                href='https://www.facebook.com/hosfatantabolis/'
                className='footer__link'
                target='_blank'
                rel='noreferrer'
              >
                Facebook
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
