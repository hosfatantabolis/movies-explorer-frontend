import React from 'react';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import Header from '../Header/Header';

import './Main.css';

function Main() {
  return (
    <main className='main'>
      <Promo>
        <NavTab />
      </Promo>
    </main>
  );
}

export default Main;
