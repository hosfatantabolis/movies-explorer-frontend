import React from 'react';

import './Profile.css';

function Profile() {
  const [data, setData] = React.useState({
    name: 'Name',
    email: 'email@mail.ru',
  });
  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
  });
  function validate(e) {
    const { name, validationMessage } = e.target;
    setErrors({
      ...errors,
      [name]: validationMessage,
    });
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    validate(e);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <main className='profile'>
      <h1 className='profile__title'>Привет, Виталий!</h1>
      <form className='profile-form' onSubmit={handleSubmit}>
        <label htmlFor='name' className='profile-form__label'>
          Имя
          <input
            id='name'
            type='text'
            name='name'
            minLength='2'
            maxLength='40'
            className={`profile-form__input ${
              errors.name ? 'profile-form__input_type_error' : ''
            }`}
            placeholder='Имя'
            value={data.name}
            onChange={handleChange}
            required
          ></input>
        </label>

        <span
          className={`profile-form__error ${
            errors.name ? 'profile-form__error_visible' : ''
          }`}
          id='name-error'
        >
          {errors.name}
        </span>
        <label htmlFor='email' className='profile-form__label'>
          E-mail
          <input
            id='email'
            type='email'
            name='email'
            className={`profile-form__input ${
              errors.email ? 'profile-form__input_type_error' : ''
            }`}
            placeholder='E-mail'
            value={data.email}
            onChange={handleChange}
            required
          ></input>
        </label>
        <span
          className={`profile-form__error ${
            errors.email ? 'profile-form__error_visible' : ''
          }`}
          id='email-error'
        >
          {errors.email}
        </span>
        <button
          type='submit'
          className='profile-form__send'
          aria-label='Редактировать'
        >
          Редактировать
        </button>
      </form>
      <button className='profile__logout'>Выйти из аккаунта</button>
    </main>
  );
}

export default Profile;
