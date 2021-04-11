import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ShowMore from '../ShowMore/ShowMore';
import Preloader from '../Preloader/Preloader';

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

  React.useEffect(() => {
    if (initialCards.length > renderedCards.length) {
      setShowMoreVisible(true);
    } else {
      setShowMoreVisible(false);
    }
    // console.log(initialCardsCount);
    // console.log(howManyToRender);
    // console.log('начальные: ' + initialCards.length);
    // console.log('отрисованные: ' + renderedCards.length);
  }, [renderedCards, initialCards]);

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
    } else if (windowSize.width <= 1000) {
      setInitialCardsCount(8);
      setHowManyToRender(2);
    } else {
      setInitialCardsCount(12);
      setHowManyToRender(3);
    }
  }

  function handleShowMore() {
    // setHowManyToRender(howManyToRender + clickCounter * initialCardsCount);
    setClickCounter(clickCounter + 1);
    setRenderedCards(
      initialCards.slice(0, initialCardsCount + howManyToRender * clickCounter)
    );
    setQueryResult(renderedCards);
  }

  React.useEffect(() => {
    api
      .getSavedMovies()
      .then((movies) => {
        if (movies.message) {
          console.log(movies.message);
        }
        if (movies.length > 0 && movies !== undefined) {
          setSavedMovieList(movies);
          setSearchErrorVisible(false);
        }
      })
      .catch((err) => console.log(err));
  }, [location]);

  //если на странице сохранённых, то показывать карточки
  React.useEffect(() => {
    setSearchQuery('');

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
      setQueryResult(renderedCards);
      setMovieListVisible(true);
      setPreloaderVisible(false);
    }
    setSavedMovieListFound([]); //
  }, [location.pathname, savedMovieList.length, renderedCards]);

  function shortMovieHandle(movies) {
    return JSON.parse(movies).filter((movie) => movie.duration <= 40);
  }

  //функция поиска по фильмам
  const doTheSearch = (e) => {
    e.preventDefault();
    setClickCounter(1);
    setPreloaderVisible(true);
    if (location.pathname === '/movies') {
      if (!localStorage.getItem('movies')) {
        MoviesApi.getMovies()
          .then((movieList) => {
            localStorage.setItem('movies', JSON.stringify(movieList));
            filterMovies(localStorage.getItem('movies'));
            e.target.reset();
          })
          .catch((err) => {
            console.log(err);
          });
        return;
      }

      // filterMovies(localStorage.getItem('movies'));
      filterMovies(localStorage.getItem('movies'));
      e.target.reset();
    }
    if (location.pathname === '/saved-movies') {
      filterSavedMovies();
      e.target.reset();
    }
    setCheckboxChecked(false);
    setSearchQuery('');
  };

  //фильтр по запросу
  const filterMovies = (movieList) => {
    let nW = [];
    if (checkboxChecked) {
      nW = JSON.stringify(shortMovieHandle(movieList));
      //console.log(nW);
    } else {
      nW = movieList;
    }
    const filteredMovies = JSON.parse(nW).filter((movie) => {
      const movieToLC = movie.nameRU.toLowerCase();
      return movieToLC.includes(searchQuery.toLowerCase());
    });
    if (filteredMovies.length > 0) {
      // console.log(filteredMovies);
      setInitialCards(filteredMovies);
      setRenderedCards(
        // filteredMovies.slice(0, initialCardsCount + howManyToRender)
        filteredMovies.slice(0, initialCardsCount)
      );
      setQueryResult(filteredMovies);
      setMovieListVisible(true);
      setSearchErrorVisible(false);
    } else {
      // console.log('nothing found');
      setSearchErrorVisible(true);
    }

    setPreloaderVisible(false);
    //console.log(queryResult);
  };

  const filterSavedMovies = () => {
    // console.log('filterSaved');
    let nW = [];
    if (checkboxChecked) {
      nW = shortMovieHandle(JSON.stringify(savedMovieList));
      // console.log(nW);
    } else {
      nW = savedMovieList;
    }
    const filteredMovies = nW.filter((movie) => {
      const movieToLC = movie.nameRU.toLowerCase();
      return movieToLC.includes(searchQuery.toLowerCase());
    });
    if (filteredMovies.length > 0) {
      // console.log(filteredMovies);
      setSavedMovieListFound(filteredMovies);
      setMovieListVisible(true);
      setSearchErrorVisible(false);
    } else {
      // console.log('nothing found');
      setSearchErrorVisible(true);
    }

    setPreloaderVisible(false);
    //console.log(queryResult);
  };

  return (
    <main className='movies'>
      <SearchForm
        handleSearch={doTheSearch}
        // searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        checkboxChecked={checkboxChecked}
        setCheckboxChecked={setCheckboxChecked}
      />
      {searchErrorVisible || !localStorage.getItem('movies') ? (
        <p className='movies_error'>
          Ничего не найдено. Попробуйте изменить запрос
        </p>
      ) : (
        <MoviesCardList
          movies={queryResult}
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
