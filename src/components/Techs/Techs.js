import React from 'react';
import './Techs.css';
import MainSectionTitle from '../MainSectionTitle/MainSectionTitle';

function Techs() {
  return (
    <section className='techs' id='techs'>
      <MainSectionTitle titleText='Технологии' />
      <div className='techs__container'>
        <h3 className='techs__title'>7 технологий</h3>
        <p className='techs__text'>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className='techs__links'>
          <li className='techs__list_item'>
            <a
              className='techs__link'
              href='https://developer.mozilla.org/ru/docs/Web/HTML'
            >
              HTML
            </a>
          </li>
          <li className='techs__list_item'>
            <a
              className='techs__link'
              href='https://developer.mozilla.org/ru/docs/Web/CSS'
            >
              CSS
            </a>
          </li>
          <li className='techs__list_item'>
            <a
              className='techs__link'
              href='https://developer.mozilla.org/ru/docs/Web/JavaScript'
            >
              JS
            </a>
          </li>
          <li className='techs__list_item'>
            <a
              className='techs__link'
              href='https://reactjs.org/docs/getting-started.html'
            >
              React
            </a>
          </li>
          <li className='techs__list_item'>
            <a className='techs__link' href='https://git-scm.com/doc'>
              Git
            </a>
          </li>
          <li className='techs__list_item'>
            <a className='techs__link' href='https://expressjs.com/'>
              Express.js
            </a>
          </li>
          <li className='techs__list_item'>
            <a className='techs__link' href='https://docs.mongodb.com/'>
              mongoDB
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
