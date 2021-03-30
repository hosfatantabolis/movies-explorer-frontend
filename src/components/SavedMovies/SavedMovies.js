import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

function SavedMovies() {
  return (
    <main className='saved-movies'>
      <SearchForm />
      <MoviesCardList />
      <Preloader />
    </main>
  );
}

export default SavedMovies;
