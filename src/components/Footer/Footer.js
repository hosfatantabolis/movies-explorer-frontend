import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__text'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className='footer__columns'>
        <div className='footer__column'>
          <p className='footer__copyright'>&copy; 2020</p>
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
