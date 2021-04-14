import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ShowMore from '../ShowMore/ShowMore';
import Preloader from '../Preloader/Preloader';
import { SHORT_MOVIE_LENGTH } from '../../utils/constants';

import './Movies.css';

//API
import MoviesApi from '../../utils/MoviesApi';
import api from '../../utils/MainApi';

function Movies() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = React.useState(''); //текст запроса
  const [queryResult, setQueryResult] = React.useState([]); //результат поиска по фильмам
  const [checkboxChecked, setCheckboxChecked] = React.useState(false); //фильтр короткометражек
  const [preloaderVisible, setPreloaderVisible] = React.useState(false); //видимость прелоадера
  const [showMoreVisible, setShowMoreVisible] = React.useState(false); //видимость кнопки ещё
  const [movieListVisible, setMovieListVisible] = React.useState(false); //видимость списка фильмов
  const [savedMovieList, setSavedMovieList] = React.useState([]); //список сохраненных фильмов
  const [savedMovieListFound, setSavedMovieListFound] = React.useState([]); //список фильмов найденных в сохраненном
  const [searchErrorVisible, setSearchErrorVisible] = React.useState(false);
  const [wasThereASearch, setWasThereASearch] = React.useState(false); //производился ли уже поиск
  const [howManyToRender, setHowManyToRender] = React.useState(3);
  const [clickCounter, setClickCounter] = React.useState(1);

  const [initialCards, setInitialCards] = React.useState(
    JSON.parse(localStorage.getItem('movies')) || []
  );
  const [initialCardsCount, setInitialCardsCount] = React.useState(12);

  const [renderedCards, setRenderedCards] = React.useState([]);

  const [windowSize, setWindowSize] = React.useState({
    width: undefined,
  });

  //размеры окна
  React.useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    howManyCards();
    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize.width, location]);

  function howManyCards() {
    if (windowSize.width <= 480) {
      setInitialCardsCount(5);
      setHowManyToRender(2);
      setClickCounter(1);
    } else if (windowSize.width <= 1000) {
      setInitialCardsCount(8);
      setHowManyToRender(2);
      setClickCounter(1);
    } else {
      setInitialCardsCount(12);
      setHowManyToRender(3);
      setClickCounter(1);
    }
  }

  React.useEffect(() => {
    // setRenderedCards([]);
    // console.log(renderedCards);
    api
      .getSavedMovies()
      .then((movies) => {
        if (movies.message) {
          console.log(movies.message);
        }
        if (movies.length > 0 && movies !== undefined) {
          setSavedMovieList(movies);
          setSearchErrorVisible(false);
          if (location.pathname === '/saved-movies') {
            setQueryResult(movies);
          } else {
            setQueryResult(initialCards);
          }
        }
      })
      .catch((err) => console.log(err));
  }, [location]);

  //если на странице сохранённых, то показывать карточки
  React.useEffect(() => {
    if (location.pathname === '/saved-movies') {
      if (savedMovieList.length > 0) {
        setMovieListVisible(true);
        setSearchErrorVisible(false);
      } else {
        setSearchErrorVisible(true);
      }
    }
    if (location.pathname === '/movies' && localStorage.getItem('movies')) {
      setSearchErrorVisible(false);
      setRenderedCards(initialCards.slice(0, initialCardsCount));
      setMovieListVisible(true);
      setPreloaderVisible(false);
      setShowMoreVisible(true);
      // console.log(showMoreVisible);
    }
    setSavedMovieListFound([]); //
  }, [location.pathname, savedMovieList.length]);

  //если в локальном хранилище есть что-то, то показываем
  React.useEffect(() => {
    if (initialCards.length > 0 || initialCards !== null) {
      setQueryResult(initialCards);
      setRenderedCards(initialCards.slice(0, initialCardsCount));
    }
  }, [initialCardsCount]);

  React.useEffect(() => {
    if (queryResult.length > renderedCards.length) {
      setShowMoreVisible(true);
    } else {
      setShowMoreVisible(false);
    }

    if (queryResult.length <= 0) {
      setMovieListVisible(false);
      setSearchErrorVisible(true);
      setShowMoreVisible(false);
    } else {
      setMovieListVisible(true);
      setSearchErrorVisible(false);
    }
  }, [renderedCards, queryResult]);

  React.useEffect(() => {
    if (wasThereASearch && searchQuery !== '') handleSearch();
  }, [checkboxChecked]);

  function handleSearch() {
    setWasThereASearch(true);
    setClickCounter(1);
    setPreloaderVisible(true);
    if (location.pathname === '/movies') {
      if (!localStorage.getItem('movies')) {
        MoviesApi.getMovies()
          .then((movieList) => {
            localStorage.setItem('movies', JSON.stringify(movieList));
            setInitialCards(JSON.parse(localStorage.getItem('movies')));
            const filteredMovies = filter(
              JSON.parse(localStorage.getItem('movies'))
            );
            setMovieListVisible(true);
            setQueryResult(filteredMovies);
            setRenderedCards(filteredMovies.slice(0, initialCardsCount));
          })
          .catch((err) => {
            console.log(err);
          });
        setInitialCards(JSON.parse(localStorage.getItem('movies')));
        // console.log(initialCards);
        return;
      }
      const filteredMovies = filter(initialCards);
      if (filteredMovies.length <= 0) {
        setSearchErrorVisible(true);
      } else {
        setSearchErrorVisible(false);
        setMovieListVisible(true);
      }
      setQueryResult(filteredMovies);
      setRenderedCards(filteredMovies.slice(0, initialCardsCount));
    } else {
      const filteredMovies = filter(savedMovieList);
      setQueryResult(filteredMovies);
      setSavedMovieListFound(filteredMovies);
    }
  }

  function search(e) {
    e.preventDefault();
    handleSearch();
  }

  function filter(movieList) {
    const filteredMovies = movieList.filter((movie) => {
      const movieToLC = movie.nameRU.toLowerCase();
      return movieToLC.includes(searchQuery.toLowerCase());
    });
    if (checkboxChecked) {
      setPreloaderVisible(false);
      return handleShortFilms(filteredMovies);
    }
    setPreloaderVisible(false);
    return filteredMovies;
  }

  function handleShortFilms(movieList) {
    return movieList.filter((movie) => {
      return movie.duration <= SHORT_MOVIE_LENGTH;
    });
  }

  function handleShowMore() {
    setClickCounter(clickCounter + 1);
    setRenderedCards(
      queryResult.slice(0, initialCardsCount + howManyToRender * clickCounter)
    );
  }

  return (
    <main className='movies'>
      <SearchForm
        handleSearch={search}
        // searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        checkboxChecked={checkboxChecked}
        setCheckboxChecked={setCheckboxChecked}
        // handleShortFilms={handleShortFilms}
      />
      {searchErrorVisible ||
      (!localStorage.getItem('movies') && location.pathname === '/movies') ? (
        <p className='movies_error'>
          Ничего не найдено. Попробуйте изменить запрос
        </p>
      ) : (
        <MoviesCardList
          movies={renderedCards}
          savedMovies={savedMovieList}
          savedMovieListFound={savedMovieListFound}
          setSavedMovieList={setSavedMovieList}
          movieListVisible={movieListVisible}
          checkboxChecked={checkboxChecked}
        />
      )}

      <Preloader preloaderVisible={preloaderVisible} />
      {location.pathname === '/movies' && (
        <ShowMore
          showMoreVisible={showMoreVisible}
          handleShowMore={handleShowMore}
        />
      )}
    </main>
  );
}

export default Movies;
