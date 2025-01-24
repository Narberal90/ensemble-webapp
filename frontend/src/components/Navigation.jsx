import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/components/Navigation.css";

const Navigation = () => {
  useEffect(() => {
    let lastScrollPosition = 0;
    const navBar = document.querySelector('.navigation');

    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition > lastScrollPosition) {
        navBar.classList.add('hidden');
        navBar.classList.remove('scrolled');
      } else {
        navBar.classList.add('scrolled');
        navBar.classList.remove('hidden');
      }

      lastScrollPosition = currentScrollPosition;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="navigation">
      <Link to="/">До дому</Link>
      <Link to="/gallery">Галерея</Link>
      <a href="#contact">Контакти</a>
    </nav>
  );
};

export default Navigation;
