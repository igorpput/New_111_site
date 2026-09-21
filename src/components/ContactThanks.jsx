import React from 'react';
import { Link } from 'react-router-dom';

export default function ContactThanks() {
  return (
    <article id="contact_thanks">
      <Link to="/" className="custom-back-btn">
          <i className="fa-solid fa-arrow-left"></i>
      </Link>
      <h2 className="major">Dziękujemy za kontakt!</h2>
      <p>Odezwiemy się tak prędko jak to możliwe, czuwaj!</p>
    </article>
  );
}