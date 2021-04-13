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

  //если в локальном хранилище есть что-то, то показываем
  React.useEffect(() => {
    if (initialCards.length > 0) {
      setQueryResult(initialCards);
      setRenderedCards(initialCards.slice(0, initialCardsCount));
    }
  }, []);

  React.useEffect(() => {
    if (queryResult.length > renderedCards.length) {
      setShowMoreVisible(true);
    } else {
      setShowMoreVisible(false);
    }

    if (queryResult.length <= 0) {
      setMovieListVisible(false);
    }
  }, [renderedCards, queryResult]);

  function search(e) {
    setClickCounter(1);
    e.preventDefault();
    if (location.pathname === '/movies') {
      if (!localStorage.getItem('movies')) {
        MoviesApi.getMovies()
          .then((movieList) => {
            localStorage.setItem('movies', JSON.stringify(movieList));
          })
          .catch((err) => {
            console.log(err);
          });
        return;
      }
      const filteredMovies = filter(initialCards);
      if (filteredMovies.length <= 0) {
        setSearchErrorVisible(true);
      }
      setQueryResult(filteredMovies);
      setRenderedCards(filteredMovies.slice(0, initialCardsCount));
    } else {
      const filteredMovies = filter(savedMovieList);
      setQueryResult(filteredMovies);
      setSavedMovieListFound(filteredMovies);
    }
  }

  function filter(movieList) {
    const filteredMovies = movieList.filter((movie) => {
      const movieToLC = movie.nameRU.toLowerCase();
      return movieToLC.includes(searchQuery.toLowerCase());
    });
    if (checkboxChecked) {
      return handleShortFilms(filteredMovies);
    }
    return filteredMovies;
  }

  function handleShortFilms(movieList) {
    console.log(movieList);
    return movieList.filter((movie) => {
      console.log(movie.duration);
      return movie.duration <= SHORT_MOVIE_LENGTH;
    });
  }

  function handleShowMore() {
    setClickCounter(clickCounter + 1);
    setRenderedCards(
      queryResult.slice(0, initialCardsCount + howManyToRender * clickCounter)
    );
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
          if (location.pathname === '/saved-movies') {
            setQueryResult(movies);
          }
        }
      })
      .catch((err) => console.log(err));
  }, [location]);

  //если на странице сохранённых, то показывать карточки
  React.useEffect(() => {
    // setSearchQuery('');

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
      //   console.log(renderedCards);
      //   console.log(initialCards);
      //   console.log(queryResult);
      //   //   setQueryResult();
      setMovieListVisible(true);
      setPreloaderVisible(false);
    }
    setSavedMovieListFound([]); //
  }, [location.pathname, savedMovieList.length]);

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

//   React.useEffect(() => {
//     if (initialCards.length > renderedCards.length) {
//       setShowMoreVisible(true);
//     } else {
//       setShowMoreVisible(false);
//     }
//     if (initialCards) {
//       console.log(initialCards);
//       setMovieListVisible(true);
//       setQueryResult(initialCards);
//     }
//     // console.log(initialCardsCount);
//     // console.log(howManyToRender);
//     // console.log('начальные: ' + initialCards.length);
//     // console.log('отрисованные: ' + renderedCards.length);
//   }, [renderedCards, initialCards]);

//   function shortMovieHandle(movies) {
//     return JSON.parse(movies).filter(
//       (movie) => movie.duration <= SHORT_MOVIE_LENGTH
//     );
//   }

//   //функция поиска по фильмам
//   const doTheSearch = (e) => {
//     e.preventDefault();
//     setClickCounter(1);
//     setPreloaderVisible(true);
//     if (location.pathname === '/movies') {
//       if (!localStorage.getItem('movies')) {
//         MoviesApi.getMovies()
//           .then((movieList) => {
//             localStorage.setItem('movies', JSON.stringify(movieList));
//             filterMovies(localStorage.getItem('movies'));
//             e.target.reset();
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//         return;
//       } else {
//         filterMovies(localStorage.getItem('movies'));
//       }
//       e.target.reset();
//     }
//     if (location.pathname === '/saved-movies') {
//       filterSavedMovies();
//       e.target.reset();
//     }
//     setCheckboxChecked(false);
//     setSearchQuery('');
//   };

//   //фильтр по запросу
//   const filterMovies = (movieList) => {
//     let nW = [];
//     if (checkboxChecked) {
//       nW = JSON.stringify(shortMovieHandle(movieList));
//     } else {
//       nW = movieList;
//     }
//     const filteredMovies = JSON.parse(nW).filter((movie) => {
//       const movieToLC = movie.nameRU.toLowerCase();
//       return movieToLC.includes(searchQuery.toLowerCase());
//     });
//     if (filteredMovies.length > 0) {
//       setInitialCards(filteredMovies);
//       setRenderedCards(filteredMovies.slice(0, initialCardsCount));
//       setQueryResult(filteredMovies);
//       setMovieListVisible(true);
//       setSearchErrorVisible(false);
//     } else {
//       setSearchErrorVisible(true);
//     }
//     setPreloaderVisible(false);
//   };

//   const filterSavedMovies = () => {
//     let nW = [];
//     if (checkboxChecked) {
//       nW = shortMovieHandle(JSON.stringify(savedMovieList));
//     } else {
//       nW = savedMovieList;
//     }
//     const filteredMovies = nW.filter((movie) => {
//       const movieToLC = movie.nameRU.toLowerCase();
//       return movieToLC.includes(searchQuery.toLowerCase());
//     });
//     if (filteredMovies.length > 0) {
//       setSavedMovieListFound(filteredMovies);
//       setMovieListVisible(true);
//       setSearchErrorVisible(false);
//     } else {
//       setSearchErrorVisible(true);
//     }

//     setPreloaderVisible(false);
//   };
