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
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [errors, setErrors] = React.useState({
    email: '',
    password: '',
  });

  const history = useHistory();
  React.useEffect(() => {
    if (
      errors.email === '' &&
      errors.password === '' &&
      data.email !== '' &&
      data.password !== ''
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
    if (errors.password !== '' || errors.email !== '') {
      setResponseError('Некорректно заполнено одно из полей');
      return;
    }
    setButtonDisabled(true);
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
        buttonDisabled={buttonDisabled}
      />
    </main>
  );
}

export default Login;
