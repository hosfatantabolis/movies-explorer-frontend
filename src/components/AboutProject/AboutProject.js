import React from 'react';
import './AboutProject.css';
import Diagram from '../Diagram/Diagram';
import MainSectionTitle from '../MainSectionTitle/MainSectionTitle';

function AboutProject() {
  return (
    <section className='about-project' id='about'>
      <MainSectionTitle titleText='О проекте' />
      <div className='about-project__columns'>
        <div className='about-project__column'>
          <h3 className='about-project__column-title'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about-project__column-text'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className='about-project__column'>
          <h3 className='about-project__column-title'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about-project__column-text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <Diagram />
    </section>
  );
}

export default AboutProject;
