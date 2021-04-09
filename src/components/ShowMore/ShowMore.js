import React from 'react';

import './ShowMore.css';

function ShowMore({ showMoreVisible }) {
  return (
    <div className={`show-more ${!showMoreVisible && 'show-more_hidden'}`}>
      <button className='show-more__button'>Ещё</button>
    </div>
  );
}

export default ShowMore;
