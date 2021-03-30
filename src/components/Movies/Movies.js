import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ShowMore from '../ShowMore/ShowMore';
// import Preloader from '../Preloader/Preloader';

import './Movies.css';

function Movies() {
  return (
    <main className='movies'>
      <SearchForm />
      <MoviesCardList />
      <ShowMore />
      {/* <Preloader /> */}
    </main>
  );
}

export default Movies;
