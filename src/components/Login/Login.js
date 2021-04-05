import React from 'react';
import Form from '../Form/Form';
import { useHistory } from 'react-router-dom';

import './Login.css';

function Login({ onLogin }) {
  const texts = {
    buttonText: 'Войти',
    subText: 'Ещё не зарегистрированы?',
    linkText: 'Регистрация',
    linkAddr: '/signup',
  };
  const [data, setData] = React.useState({ email: '', password: '' });
  const [responseError, setResponseError] = React.useState('');
  const [errors, setErrors] = React.useState({
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
    onLogin(data.password, data.email).then((data) => {
      if (data) {
        if (data.message) {
          setResponseError(data.message);
          return;
        }
        console.log(data);
        history.push('/movies');
      }
    });
  };
  return (
    <main className='login'>
      <Form
        handleSubmit={handleSubmit}
        errors={errors}
        data={data}
        handleChange={handleChange}
        texts={texts}
        responseError={responseError}
      />
    </main>
  );
}

export default Login;
