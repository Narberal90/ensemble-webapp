// HeroHeader.jsx
import React from "react";
import "../styles/components/HeroHeader.css";

const HeroHeader = () => {
  const scrollToMainContent = () => {
    const mainContent = document.getElementById('main-content');
    window.scrollTo({
      top: mainContent.offsetTop,
      behavior: 'smooth',
    });
  };

  return (
    <section className="hero-header">
      <div className="hero-content" data-aos="fade-right" data-aos-duration="1500">
        <h1>Ансамбль струнних інструментів</h1>
        <p data-aos="fade-right" data-aos-duration="1100" data-aos-delay="400">Мистецької школи №11 м. Одеси</p>
      </div>
      <a onClick={scrollToMainContent} className="scroll-down">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 28 28"
          className="arrow-svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="40"
          height="40"
        >
          <path d="M12 19l-7-7 1.4-1.4L12 16.2l5.6-5.6L19 12z"/>
        </svg>
      </a>
    </section>
  );
};

export default HeroHeader;
