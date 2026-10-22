import React from 'react';
import DiscordWidget from './DiscordWidget';
import { Link } from 'react-router-dom';
import RankingTop3 from './RankingTop3';

export default function StrefaHarcerza() {
  return (
    <article id="harcerz">
      <Link to="/" className="custom-back-btn">
          <i className="fa-solid fa-arrow-left"></i>
      </Link>
      <h2 className="major">Strefa Harcerza</h2>

{/* 1. Odkomentowany i poprawnie ułożony ranking */}
      <div style={{ marginTop: '2em', marginBottom: '1.5em' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i className="fa-solid fa-trophy"></i> RANKINGI PUNKTOWE
        </h3>
        <RankingTop3 />
      </div>

      {/* 2. Kontener nawigacji z dodanym marginesem dolnym (marginBottom) */}
      <div 
        className="actions-container" 
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          gap: '15px', 
          marginTop: '-10px',
          marginBottom: '40px' // <-- Ten parametr naprawia "przyklejenie" kolejnej sekcji
        }}
      >
        <Link to="/pelny-ranking" className="button" style={{ flex: '1 1 100%', textAlign: 'center' }}>
          POKAŻ CAŁY RANKING
        </Link>

        <Link to="/questy" className="button primary" style={{ flex: '1 1 250px', textAlign: 'center' }}>
          <i className="fa-solid fa-envelope-open-text" style={{ marginRight: '10px' }}></i> 
          PRZEGLĄDAJ ZADANIA
        </Link>
        
        <Link to="/sklep" className="button primary" style={{ flex: '1 1 250px', textAlign: 'center', backgroundColor: '#fff', color: '#1a1f36' }}>
          <i className="fa-solid fa-store" style={{ marginRight: '10px' }}></i> 
          SKLEP ZA KAMYKI
        </Link>

        
      </div>
      <h3><i className="fa-solid fa-hands-holding-circle"></i> Funkcyjni Drużyny</h3>
      <div className="kadra-grid">
        <div className="kadra-card">
          <strong>Drużynowy</strong><br />
          pwd. Michał Bankiewicz
        </div>
        <div className="kadra-card">
          <strong>Przyboczny</strong><br />
          ćw. Igor Preuss
        </div>
        <div className="kadra-card">
          <strong>Przyboczny</strong><br />
          pwd. Szymon Zimicz
        </div>
        <div className="kadra-card">
          <strong>Przyboczny</strong><br />
          Jakub Zatorski
        </div>
        <div className="kadra-card">
          <strong>Zastępowy "Kreatywne Kreatury"</strong><br />
          dh. Janek
        </div>
        <div className="kadra-card">
          <strong>Zastępowa "Opalaquatazy"</strong><br />
          dh. Cysia
        </div>
      </div>

      <hr />

      <h3><i className="fa-solid fa-book-bookmark"></i> Vademecum</h3>
      <ul className="actions fit">
        <li>
          <Link to="/soon" className="button fit">
            <i className="fa-brands fa-mintbit"></i>&nbsp; Węzły
          </Link>
        </li>
        <li>
          <a href="https://sim.zhp.pl/merit-badge/list/wanderers" target="_blank" rel="noreferrer" className="button fit">
            <i className="fa-solid fa-medal"></i>&nbsp; Sprawności
          </a>
        </li>
      </ul>
      <ul className="actions fit">
        <li>
          <Link to="/soon" className="button fit">
            <i className="fa-solid fa-star"></i>&nbsp; Stopnie
          </Link>
        </li>
        <li>
          <Link to="/mundur" className="button fit">
            <i className="fa-solid fa-shirt"></i>&nbsp; Mundur
          </Link>
        </li>
      </ul>

      <hr />

      <div className="quiz-box">
        <h3><i className="fa-solid fa-brain"></i> Quiz Tygodnia - już niebawem!</h3>
      </div>

      <hr />

      <h3><i className="fa-brands fa-discord"></i> Nasz Serwer Discord</h3>
      <div style={{ width: '100%' }}>
        <DiscordWidget serverId="1472714633545781401" />
      </div>

    </article>
  );
}