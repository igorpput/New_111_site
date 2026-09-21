import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Questy() {
  const [questy, setQuesty] = useState([]);

  useEffect(() => {
    fetch('/data/questy.json')
      .then((response) => response.json())
      .then((data) => setQuesty(Array.isArray(data) ? data : []))
      .catch((error) => console.error('Awaria silnika questów:', error));
  }, []);

  const getKamykWord = (points) => {
    if (points === 1) return 'kamyk';
    const lastDigit = points % 10;
    const lastTwoDigits = points % 100;
    if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) return 'kamyki';
    return 'kamyków';
  };

  return (
    <article id="questy">
      <Link to="/harcerz" className="custom-back-btn">
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
      <h2 className="major">Aktywne Questy</h2>
      
      <div id="quests-list">
        {questy.length === 0 ? (
          <p>Brak aktywnych zadań na ten moment. Wróć później!</p>
        ) : (
          questy.map((quest, index) => (
            <div key={index} className="quest-card">
              <div className="quest-header">
                <div className="quest-title">
                  <i className="fa-solid fa-bullseye" style={{ marginRight: '6px' }}></i>{quest.tytul}
                </div>
                <div className="quest-reward">
                  {quest.kamyki} {getKamykWord(quest.kamyki)} <i className="fa-solid fa-gem"></i>
                </div>
              </div>
              <div className="quest-desc">
                {/* Bezpieczne łamanie linii /n z JSONa na tagi <br/> */}
                {quest.opis && quest.opis.split('\n').map((line, i) => (
                  <React.Fragment key={i}>{line}<br /></React.Fragment>
                ))}
              </div>
              <div className="quest-footer">
                <span><i className="fa-solid fa-tag"></i> {quest.kategoria}</span>
                {quest.miejsca && (
                  <span>
                    <i className="fa-solid fa-users"></i> Zgłoszenia: {quest.zgloszenia}/{quest.miejsca}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </article>
  );
}