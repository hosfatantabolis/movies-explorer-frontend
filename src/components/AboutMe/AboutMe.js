import React from 'react';
import './AboutMe.css';
import MainSectionTitle from '../MainSectionTitle/MainSectionTitle';
import avatar from '../../images/avatar.jpg';

function AboutMe() {
  return (
    <section className='about-me' id='student'>
      <MainSectionTitle titleText='Студент' />
      <div className='about-me__columns'>
        <div className='about-me__column'>
          <h3 className='about-me__title'>Виталий</h3>
          <p className='about-me__subtitle'>Фронтенд-разработчик, 30 лет</p>
          <p className='about-me__text'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <ul className='about-me__list'>
            <li className='about-me__list-item'>
              <a
                className='about-me__link'
                href='https://www.facebook.com/hosfatantabolis/'
                target='_blank'
                rel='noreferrer'
              >
                Facebook
              </a>
            </li>
            <li className='about-me__list-item'>
              <a
                className='about-me__link'
                href='https://github.com/hosfatantabolis'
                target='_blank'
                rel='noreferrer'
              >
                Github
              </a>
            </li>
          </ul>
        </div>
        <div className='about-me__column'>
          <img className='about-me__photo' src={avatar} alt='Моё фото' />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
