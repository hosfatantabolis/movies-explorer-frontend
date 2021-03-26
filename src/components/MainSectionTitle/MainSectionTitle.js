import React from 'react';
import './MainSectionTitle.css';

function MainSectionTitle(props) {
  return <h2 className='main-section-title'>{props.titleText}</h2>;
}

export default MainSectionTitle;
