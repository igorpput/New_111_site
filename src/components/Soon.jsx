import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Soon() {
  const navigate = useNavigate();

  return (
    <article id="soon">
      <button onClick={() => navigate(-1)} className="custom-back-btn" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <h2 className="major">Już wkrótce!</h2>
      <p>Strona w budowie...</p>
    </article>
  );
}