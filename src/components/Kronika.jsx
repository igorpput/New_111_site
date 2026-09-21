import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Kronika() {
  const [wydarzenia, setWydarzenia] = useState([]);

  useEffect(() => {
    fetch('/data/kronika.json')
      .then(res => res.json())
      .then(data => {
        const dataArray = Array.isArray(data) ? data : (data.data || []);
        setWydarzenia(dataArray);
      })
      .catch(err => console.error('Błąd pobierania kroniki:', err));
  }, []);

  return (
    <article id="kronika">
      <Link to="/" className="custom-back-btn">
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
      <h2 className="major">Kronika Drużyny</h2>
      <div id="timeline-container">
        {wydarzenia.length === 0 ? (
          <p>Kronika się ładuje lub jest coś się popsuło...</p>
        ) : (
          wydarzenia.map((entry, index) => (
            <div key={index} className="timeline-entry">
              <div className="timeline-date">{entry.data}</div>
              <div className="timeline-content">
                <h3>{entry.tytul}</h3>
                {entry.zdjecie && entry.zdjecie.length > 0 && (
                  <span className="image main">
                    <img src={`/data/${entry.zdjecie}`} alt={entry.tytul} />
                  </span>
                )}
                <p>{entry.opis}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </article>
  );
}