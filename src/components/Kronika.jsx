import React, { useState, useEffect } from 'react';

export default function Kronika() {
  const [wydarzenia, setWydarzenia] = useState([]);

  useEffect(() => {
    fetch('/data/kronika.json')
      .then(res => res.json())
      .then(data => setWydarzenia(data))
      .catch(err => console.error('Błąd pobierania kroniki:', err));
  }, []);

  return (
    <article id="kronika">
      <h2 className="major">Kronika Drużyny</h2>
      <div className="timeline">
        {wydarzenia.map((wydarzenie, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-date">{wydarzenie.data}</div>
            <div className="timeline-content">
              <h3>{wydarzenie.tytul}</h3>
              <p>{wydarzenie.opis}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}