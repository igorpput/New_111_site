import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PelnyRanking() {
  const [groupedRanking, setGroupedRanking] = useState([]);

  useEffect(() => {
    fetch('/data/ranking.json')
      .then((res) => res.json())
      .then((data) => {
        const d = Array.isArray(data) ? data : [];
        if (d.length === 0) return;

        // 1. Sortowanie (Punkty malejąco, Miano alfabetycznie)
        d.sort((a, b) => {
          if (b.Punkty_Rankingowe !== a.Punkty_Rankingowe) {
            return b.Punkty_Rankingowe - a.Punkty_Rankingowe;
          }
          return (a.Miano || '').localeCompare(b.Miano || '', 'pl');
        });

        // 2. Grupowanie danych (System ex aequo)
        const grouped = [];
        for (let i = 0; i < d.length; i++) {
          const user = d[i];
          const lastGroup = grouped[grouped.length - 1];

          if (lastGroup && lastGroup.score === user.Punkty_Rankingowe) {
            lastGroup.names.push(user.Miano);
          } else {
            grouped.push({
              rank: i + 1,
              score: user.Punkty_Rankingowe,
              names: [user.Miano]
            });
          }
        }
        setGroupedRanking(grouped);
      })
      .catch((err) => console.error("Awaria silnika rankingu:", err));
  }, []);

  const getKamykWord = (points) => {
    if (points === 1) return 'kamyk';
    const lastDigit = points % 10;
    const lastTwoDigits = points % 100;
    if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) return 'kamyki';
    return 'kamyków';
  };

  return (
    <article id="pelny-ranking">
      <Link to="/harcerz" className="custom-back-btn">
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
      <h2 className="major">Tabela punktowa</h2>
      
      <div id="full-ranking-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {groupedRanking.length === 0 ? (
          <p>Brak danych do wyświetlenia.</p>
        ) : (
          groupedRanking.map((group, index) => {
            let rankClass = '';
            let iconHtml = <i className="fa-solid fa-person-hiking"></i>;

            if (group.rank === 1) {
              rankClass = 'rank-gold';
              iconHtml = <i className="fa-solid fa-fire"></i>;
            } else if (group.rank === 2) {
              rankClass = 'rank-silver';
              iconHtml = <i className="fa-solid fa-clover"></i>;
            } else if (group.rank === 3) {
              rankClass = 'rank-bronze';
              iconHtml = <i className="fa-solid fa-seedling"></i>;
            }

            const displayRank = group.rank <= 3 ? '' : `${group.rank}\u200E\u200E \u200E   `;

            return (
              <div key={index} className={`ranking-card ${rankClass}`}>
                <div className="card-name">
                  {displayRank}
                  <span style={{ marginRight: '8px' }}>{iconHtml}</span> 
                  {group.names.join(', ')}
                </div>
                <div className="card-points">
                  {group.score} {getKamykWord(group.score)}
                </div>
              </div>
            );
          })
        )}
      </div>
    </article>
  );
}