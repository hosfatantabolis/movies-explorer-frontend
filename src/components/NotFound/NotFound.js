import React from 'react';

import './NotFound.css';
import { useHistory } from 'react-router-dom';

function NotFound() {
  const history = useHistory();
  return (
    <main className='not-found'>
      <div className='not-found__container'>
        <h1 className='not-found__title'>404</h1>
        <p className='not-found__text'>Страница не найдена</p>
      </div>
      <p className='not-found__go-back' onClick={() => history.goBack()}>
        Назад
      </p>
    </main>
  );
}

export default NotFound;
