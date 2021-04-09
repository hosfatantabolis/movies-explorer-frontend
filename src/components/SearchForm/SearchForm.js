import React from 'react';
import searchIcon from '../../images/search-icon.svg';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({
  handleSearch,
  setSearchQuery,
  checkboxChecked,
  setCheckboxChecked,
}) {
  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  const handleCheck = () => {
    setCheckboxChecked(!checkboxChecked);
  };

  //сеттим введенные данные в стейт
  function handleChange(e) {
    if (e.target.value === '') {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
      setSearchQuery(e.target.value);
    }
  }

  return (
    <form
      className='search-form'
      onSubmit={handleSearch}
      noValidate='novalidate'
    >
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
          onChange={handleChange}
        ></input>
        <button
          className={`search-form__send ${
            buttonDisabled && 'search-form__send_disabled'
          }`}
          type='submit'
          disabled={buttonDisabled}
        >
          Найти
        </button>
      </div>
      <FilterCheckbox handleCheck={handleCheck} />
    </form>
  );
}

export default SearchForm;
