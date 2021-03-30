import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import accountLogo from '../../images/account-logo.svg';
import menu from '../../images/menu.svg';
import closeBtn from '../../images/close-btn.svg';

import './Navigation.css';

function Navigation() {
  const location = useLocation();
  const [windowSize, setWindowSize] = React.useState({
    width: undefined,
    height: undefined,
  });

  React.useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    if (windowSize.width > 768) {
      setSideMenuOpened(false);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize.width, location]);

  const [sideMenuOpened, setSideMenuOpened] = React.useState();
  function handleMenuClick() {
    setSideMenuOpened(!sideMenuOpened);
  }
  return (
    <div
      className={`navigation__wrapper ${
        sideMenuOpened ? 'mobile-navigation__wrapper' : ''
      }`}
    >
      <nav
        className={`navigation ${sideMenuOpened ? 'mobile-navigation' : ''}`}
      >
        <button
          className={`navigation__button ${
            sideMenuOpened ? 'navigation__button_close' : ''
          }`}
          onClick={handleMenuClick}
        >
          <img
            src={sideMenuOpened ? closeBtn : menu}
            alt='Меню'
            className='navigation__burger'
          />
        </button>
        <ul className='navigation__links'>
          <div className='navigation__pages'>
            {sideMenuOpened && (
              <li
                className={`navigation__list-item ${
                  sideMenuOpened ? 'mobile-navigation__list-item' : ''
                }`}
              >
                <Link
                  to='/'
                  className='navigation__link'
                  onClick={handleMenuClick}
                >
                  Главная
                </Link>
              </li>
            )}
            <li
              className={`navigation__list-item ${
                sideMenuOpened ? 'mobile-navigation__list-item' : ''
              }`}
            >
              <Link
                to='/movies'
                className={`navigation__link ${
                  location.pathname === '/movies'
                    ? 'navigation__link_active'
                    : ''
                }`}
                onClick={handleMenuClick}
              >
                Фильмы
              </Link>
            </li>
            <li
              className={`navigation__list-item ${
                sideMenuOpened ? 'mobile-navigation__list-item' : ''
              }`}
            >
              <Link
                to='/saved-movies'
                className={`navigation__link ${
                  location.pathname === '/saved-movies'
                    ? 'navigation__link_active'
                    : ''
                }`}
                onClick={handleMenuClick}
              >
                Сохранённые фильмы
              </Link>
            </li>
          </div>
          <li
            className={`navigation__list-item navigation__list-item_type-account ${
              sideMenuOpened ? 'mobile-navigation__list-item' : ''
            }`}
          >
            <Link
              to='/profile'
              className='navigation__link navigation__link_type_account'
              onClick={handleMenuClick}
            >
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
    </div>
  );
}

export default Navigation;
