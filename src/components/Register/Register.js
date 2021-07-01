import React from 'react';
import Form from '../Form/Form';
import { useHistory } from 'react-router-dom';

import './Register.css';

function Register({ onRegister, onLogin }) {
  const texts = {
    buttonText: 'Зарегистрироваться',
    subText: 'Уже зарегистрированы?',
    linkText: 'Войти',
    linkAddr: '/signin',
  };

  const [data, setData] = React.useState({ name: '', email: '', password: '' });
  const [responseError, setResponseError] = React.useState('');
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  const history = useHistory();

  React.useEffect(() => {
    if (
      errors.name === '' &&
      errors.email === '' &&
      errors.password === '' &&
      data.email !== '' &&
      data.password !== '' &&
      data.name !== ''
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [errors, data]);

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
    if (errors.name !== '' || errors.password !== '' || errors.email !== '') {
      setResponseError('Некорректно заполнено одно из полей');
      return;
    }
    onRegister(data.name, data.password, data.email).then((res) => {
      if (res.message) {
        setResponseError(res.message);
        return;
      }
      if (res) {
        onLogin(data.password, res.emailForResponse);
        history.push('/movies');
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
        buttonDisabled={buttonDisabled}
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
