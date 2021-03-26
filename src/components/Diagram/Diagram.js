import React from 'react';
import './Diagram.css';

function Diagram() {
  return (
    <div className='diagram'>
      <div className='diagram__item' style={{ width: '20%' }}>
        <div className='diagram__bg diagram__bg-light'>
          <p className='diagram__text diagram__text-dark'>1 неделя</p>
        </div>
        <p className='diagram__sub'>Back-end</p>
      </div>
      <div className='diagram__item' style={{ width: '80%' }}>
        <div className='diagram__bg'>
          <p className='diagram__text'>4 недели</p>
        </div>
        <p className='diagram__sub'>Front-end</p>
      </div>
    </div>
  );
}

export default Diagram;
