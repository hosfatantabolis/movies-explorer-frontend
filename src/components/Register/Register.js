import React from 'react';
import { useHistory } from 'react-router-dom';
import Form from '../Form/Form';

import './Register.css';

function Register() {
  const texts = {
    buttonText: 'Зарегистрироваться',
    subText: 'Уже зарегистрированы?',
    linkText: 'Войти',
    linkAddr: '/signin',
  };
  const [data, setData] = React.useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    password: '',
  });
  // const history = useHistory();
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
    // onRegister(data.password, data.email).then((data) => {
    //   if (data) {
    //     history.push('/signin');
    //   }
    // });
  };
  return (
    <main className='register'>
      <Form
        handleSubmit={handleSubmit}
        errors={errors}
        data={data}
        handleChange={handleChange}
        texts={texts}
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
