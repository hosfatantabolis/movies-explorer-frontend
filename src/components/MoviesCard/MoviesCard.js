import React from 'react';
import { useLocation } from 'react-router-dom';
import iconSave from '../../images/icon-save.svg';
import iconSaved from '../../images/icon-saved.svg';
import iconDelete from '../../images/icon-delete.svg';
import testCard from '../../images/test-card.jpg';

import './MoviesCard.css';

function MoviesCard() {
  const location = useLocation();
  const isSaved = true;
  const savedMoviesIcon = isSaved ? iconDelete : iconSave;
  const moviesIcon = isSaved ? iconSaved : iconSave;
  const icon = location.pathname === '/movies' ? moviesIcon : savedMoviesIcon;

  return (
    <li className='movies-card'>
      <div className='movies-card__row'>
        <div className='movies-card__column'>
          <p className='movies-card__title'>33 слова о дизайне</p>
          <p className='movies-card__time'>1ч 47м</p>
        </div>
        <div className='movies-card__column'>
          <img className='movies-card__icon' src={icon} alt='иконка' />
        </div>
      </div>
      <img className='movies-card__image' src={testCard} alt='карточка' />
    </li>
  );
}

export default MoviesCard;
