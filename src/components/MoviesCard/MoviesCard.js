import React from 'react';
import { useLocation } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';

//Иконки
import iconSave from '../../images/icon-save.svg';
import iconSaved from '../../images/icon-saved.svg';
import iconDelete from '../../images/icon-delete.svg';

//Стили
import './MoviesCard.css';
import api from '../../utils/MainApi';

function MoviesCard({
  card,
  cardTitle,
  cardImageLink,
  duration,
  trailerLink,
  savedMovies,
  setSavedMovieList,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const location = useLocation();
  const [isSaved, setIsSaved] = React.useState(false);

  React.useEffect(() => {
    if (savedMovies.length > 0) {
      if (!isSaved) {
        setIsSaved(
          savedMovies.some(
            (savedMovie) =>
              savedMovie.movieId === card.id &&
              savedMovie.owner === currentUser._id
          )
        );
      } else {
        setIsSaved(false);
      }
    }
  }, []);
  const moviesIcon = isSaved ? iconSaved : iconSave;
  const icon = location.pathname === '/movies' ? moviesIcon : iconDelete;

  const handleLike = () => {
    if (!isSaved) {
      for (let key in card) {
        if (card[key] === null || card[key] === '') card[key] = 'нет данных';
      }

      api.saveMovie(card);
      setIsSaved(true);
    } else {
      savedMovies.forEach((savedMovie) => {
        if (savedMovie.movieId === card.id) {
          api.deleteMovie(savedMovie._id);
        }
      });
      setIsSaved(false);
    }
  };

  const unsave = () => {
    api.deleteMovie(card._id);
    const newSavedMoviesList = savedMovies.filter(function (c) {
      return c._id !== card._id;
    });
    setSavedMovieList(newSavedMoviesList);
  };

  return (
    <li className='movies-card'>
      <div className='movies-card__row'>
        <div className='movies-card__column'>
          <p className='movies-card__title'>{cardTitle}</p>
          <p className='movies-card__time'>{duration}</p>
        </div>
        <div className='movies-card__column'>
          <img
            className='movies-card__icon'
            src={icon}
            alt='иконка'
            onClick={location.pathname === '/movies' ? handleLike : unsave}
          />
        </div>
      </div>
      <a href={trailerLink} target='_blank' rel='noreferrer'>
        <img
          className='movies-card__image'
          src={cardImageLink}
          alt='карточка'
        />
      </a>
    </li>
  );
}

export default MoviesCard;
