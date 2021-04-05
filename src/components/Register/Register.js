import React from 'react';
import { useHistory } from 'react-router-dom';
import Form from '../Form/Form';

import './Register.css';

function Register({ onRegister }) {
  const texts = {
    buttonText: 'Зарегистрироваться',
    subText: 'Уже зарегистрированы?',
    linkText: 'Войти',
    linkAddr: '/signin',
  };
  const [data, setData] = React.useState({ name: '', email: '', password: '' });
  const [responseError, setResponseError] = React.useState('');
  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    password: '',
  });
  const history = useHistory();
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
    setResponseError('');
    validate(e);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(data.name, data.password, data.email).then((data) => {
      console.log(data);
      if (data.message) {
        setResponseError(data.message);
        return;
      }
      if (data) {
        history.push('/signin');
      }
    });
  };
  return (
    <main className='register'>
      <Form
        handleSubmit={handleSubmit}
        errors={errors}
        data={data}
        handleChange={handleChange}
        texts={texts}
        responseError={responseError}
      >
        <label htmlFor='name' className='form__label'>
          Имя
        </label>
        <input
          id='name'
          type='text'
          name='name'
          minLength='2'
          maxLength='40'
          pattern='[a-zA-Zа-яА-Я -]+'
          className={`form__input ${
            errors.name ? 'form__input_type_error' : ''
          }`}
          placeholder='Имя'
          value={data.name}
          onChange={handleChange}
          required
        ></input>
        <span
          className={`form__error ${errors.name ? 'form__error_visible' : ''}`}
          id='name-error'
        >
          {errors.name}
        </span>
      </Form>
    </main>
  );
}

export default Register;
