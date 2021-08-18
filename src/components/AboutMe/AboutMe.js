import React from "react";
import "./AboutMe.css";
import MainSectionTitle from "../MainSectionTitle/MainSectionTitle";
import avatar from "../../images/avatar.jpg";

function AboutMe() {
  function calcAge() {
    const bd = { day: 17, month: 12, year: 1993 };
    const today = new Date();
    var age = today.getFullYear() - bd.year;
    if (
      today.getMonth() < bd.month ||
      (today.getMonth() === bd.month && today.getDate() < bd.day)
    ) {
      age--;
    }
    return age;
  }
  return (
    <section className="about-me" id="student">
      <MainSectionTitle titleText="Студент" />
      <div className="about-me__columns">
        <div className="about-me__column">
          <h3 className="about-me__title">Максим</h3>
          <p className="about-me__subtitle">
            Фронтенд-разработчик, {calcAge()} лет
          </p>
          <p className="about-me__text">
            Живу в Санкт-Петербурге, закончил факультет среднего
            профессионального образования ИТМО. Длительное время работал не по
            специальности. В 2021 году закончил курсы Яндекс.Практикума по
            направлению веб-разработки. Хочу заниматься веб-разработкой, потому
            что это мне всегда нравилось. Ещё в школе делал себе ужасный сайт по
            какому-то самоучителю. Меня привлекает перспектива развития,
            возможность видеть результат своих трудов, а также вероятность
            реализовать свой творческий потенциал.
          </p>
          <ul className="about-me__list">
            <li className="about-me__list-item">
              <a
                className="about-me__link"
                href="https://www.facebook.com/hosfatantabolis/"
                target="_blank"
                rel="noreferrer">
                Facebook
              </a>
            </li>
            <li className="about-me__list-item">
              <a
                className="about-me__link"
                href="https://github.com/hosfatantabolis"
                target="_blank"
                rel="noreferrer">
                Github
              </a>
            </li>
          </ul>
        </div>
        <div className="about-me__column">
          <img className="about-me__photo" src={avatar} alt="Моё фото" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
