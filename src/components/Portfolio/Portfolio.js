import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__list'>
        <li className='portfolio__list_item'>
          <a
            className='portfolio__link'
            href='https://github.com/hosfatantabolis/how-to-learn'
            target='_blank'
            rel='noreferrer'
          >
            Статичный сайт
            <span>↗</span>
          </a>
        </li>
        <li className='portfolio__list_item'>
          <a
            className='portfolio__link'
            href='https://github.com/hosfatantabolis/russian-travel'
            target='_blank'
            rel='noreferrer'
          >
            Адаптивный сайт
            <span>↗</span>
          </a>
        </li>
        <li className='portfolio__list_item'>
          <a
            className='portfolio__link'
            href='https://github.com/hosfatantabolis/react-mesto-api-full'
            target='_blank'
            rel='noreferrer'
          >
            Одностраничное приложение
            <span>↗</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
