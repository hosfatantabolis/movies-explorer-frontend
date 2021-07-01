import React from 'react';

import './Form.css';

function Form({
  handleSubmit,
  errors,
  data,
  handleChange,
  texts,
  responseError,
  buttonDisabled,
  children,
}) {
  return (
    <>
      <form onSubmit={handleSubmit} className='form' noValidate='novalidate'>
        {children}
        <label htmlFor='email' className='form__label'>
          E-mail
        </label>
        <input
          id='email'
          type='email'
          name='email'
          className={`form__input ${
            errors.email ? 'form__input_type_error' : ''
          }`}
          placeholder='E-mail'
          value={data.email}
          onChange={handleChange}
          required
        ></input>
        <span
          className={`form__error ${errors.email ? 'form__error_visible' : ''}`}
          id='email-error'
        >
          {errors.email}
        </span>
        <label htmlFor='password' className='form__label'>
          Пароль
        </label>
        <input
          id='password'
          type='password'
          name='password'
          minLength='6'
          className={`form__input ${
            errors.password ? 'form__input_type_error' : ''
          }`}
          placeholder='Пароль'
          value={data.password}
          onChange={handleChange}
          required
        ></input>
        <span
          className={`form__error ${
            errors.password ? 'form__error_visible' : ''
          }`}
          id='password-error'
        >
          {errors.password}
        </span>
        <span
          className={`form__error ${
            responseError ? 'form__error_visible' : ''
          }`}
        >
          {responseError}
        </span>
        <button
          type='submit'
          className={`form__send ${buttonDisabled && 'form__send_disabled'}`}
          aria-label={texts.buttonText}
          disabled={buttonDisabled}
        >
          {texts.buttonText}
        </button>
      </form>
      <p className='form__text'>
        {texts.subText}
        <a className='form__link' href={texts.linkAddr}>
          {texts.linkText}
        </a>
      </p>
    </>
  );
}

export default Form;
