import React from 'react';

import './Profile.css';

function Profile({ onLogOut, onUpdateUser, currentUser }) {
  const [responseError, setResponseError] = React.useState('');
  const [response, setResponse] = React.useState('');
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [data, setData] = React.useState({
    name: '',
    email: '',
  });

  React.useEffect(() => {
    if (data.name === currentUser.name && data.email === currentUser.email) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [data]);

  React.useEffect(() => {
    setData({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser]);

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
    setResponseError('');
    setResponse('');
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    validate(e);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.name === '' || data.email === '') {
      setResponseError('Все поля должны быть заполнены');
      return;
    }
    onUpdateUser(data.email, data.name)
      .then((res) => {
        if (res.message) {
          setResponseError(res.message);
        } else {
          setResponse('Данные успешно сохранены');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <main className='profile'>
      <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
      <form
        className='profile-form'
        onSubmit={handleSubmit}
        noValidate='novalidate'
      >
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
        <span
          className={`profile-form__error ${
            responseError ? 'profile-form__error_visible' : ''
          }`}
        >
          {responseError}
        </span>
        <span
          className={`profile-form__response ${
            response ? 'profile-form__response_saved' : ''
          }`}
        >
          {response}
        </span>
        <button
          type='submit'
          className={`profile-form__send ${
            buttonDisabled && 'profile-form__send_disabled'
          }`}
          aria-label='Редактировать'
        >
          Редактировать
        </button>
      </form>
      <button className='profile__logout' onClick={onLogOut}>
        Выйти из аккаунта
      </button>
    </main>
  );
}

export default Profile;
