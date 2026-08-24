import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Questy() {
  const [questy, setQuesty] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Podmień ścieżkę na właściwą dla Twojego projektu
    fetch('/data/questy.json')
      .then((response) => response.json())
      .then((data) => {
        setQuesty(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Błąd pobierania questów:', error);
        setIsLoading(false);
      });
  }, []); // Pusta tablica oznacza, że fetch wykona się tylko raz przy montowaniu

  return (
    <article id="questy">
      <Link to="/harcerz" className="custom-back-btn">
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
      <h2 className="major">Aktywne Questy</h2>
      
      <div id="quests-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
        {isLoading ? (
          <p>Ładowanie zadań...</p>
        ) : questy.length > 0 ? (
          questy.map((quest, index) => (
            <div key={index} className="quest-card">
              <h4>{quest.nazwa}</h4>
              <p>{quest.opis}</p>
              <span className="points">Punkty: {quest.punkty}</span>
            </div>
          ))
        ) : (
          <p>Brak aktywnych questów w tym momencie.</p>
        )}
      </div>
    </article>
  );
}