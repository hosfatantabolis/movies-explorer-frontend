import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import noImage from '../../images/no-image.png';

function MoviesCardList({
  movieListVisible,
  movies,
  savedMovies,
  setSavedMovieList,
  savedMovieListFound,
  checkboxChecked,
  isSaved,
  setIsSaved,
}) {
  const location = useLocation();
  const [sm, setSm] = React.useState([]);
  React.useEffect(() => {
    if (savedMovieListFound.length > 0) {
      setSm(savedMovieListFound);
    } else {
      setSm(savedMovies);
    }
  }, [savedMovieListFound, savedMovies]);
  const convertTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const finalResult = `${hours}ч ${minutes}м`;
    return finalResult;
  };

  return (
    <ul
      className={`movies-card-list ${
        !movieListVisible && 'movies-card-list_hidden'
      }`}
    >
      {location.pathname === '/movies' &&
        movies.map((card) => (
          <MoviesCard
            card={card}
            key={card.id}
            cardTitle={card.nameRU}
            cardImageLink={
              card.image
                ? `https://api.nomoreparties.co` + card.image.url
                : noImage
            }
            trailerLink={card.trailerLink}
            duration={convertTime(card.duration)}
            savedMovies={savedMovies}
          />
        ))}
      {location.pathname === '/saved-movies' &&
        sm.map((card) => (
          <MoviesCard
            card={card}
            key={card._id}
            cardTitle={card.nameRU}
            cardImageLink={card.image ? card.image : noImage}
            trailerLink={card.trailer}
            duration={convertTime(card.duration)}
            savedMovies={savedMovies}
            setSavedMovieList={setSavedMovieList}
          />
        ))}
    </ul>
  );
}

export default MoviesCardList;
