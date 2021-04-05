import React from 'react';
import searchIcon from '../../images/search-icon.svg';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <form className='search-form'>
      <div className='search-form__container'>
        <img
          className='search-form__icon'
          src={searchIcon}
          alt='иконка поиска'
        />
        <input
          className='search-form__input'
          placeholder='Фильм'
          required
        ></input>
        <button
          className='search-form__send'
          type='submit'
          onClick={handleSubmit}
        >
          Найти
        </button>
      </div>
      <FilterCheckbox />
    </form>
  );
}

export default SearchForm;
