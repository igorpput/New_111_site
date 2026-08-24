import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PelnyRanking() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    fetch('/data/ranking.json')
      .then((res) => res.json())
      .then((data) => {
        // Opcjonalnie: posortuj dane, jeśli JSON nie jest posortowany
        const sortedData = data.sort((a, b) => b.punkty - a.punkty);
        setRanking(sortedData);
      })
      .catch((err) => console.error('Błąd pobierania rankingu:', err));
  }, []);

  return (
    <article id="pelny-ranking">
      <Link to="/harcerz" className="custom-back-btn">
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
      <h2 className="major">Tabela punktowa</h2>
      
      <div className="ranking-container" style={{ width: '100%' }}>
        <div className="ranking-list">
          {ranking.map((harcerz, index) => (
            <div key={index} className="ranking-row">
              <span className="ranking-position">{index + 1}.</span>
              <span className="ranking-name">{harcerz.pseudonim}</span>
              <span className="ranking-points">{harcerz.punkty} pkt</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}