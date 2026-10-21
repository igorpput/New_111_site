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
{/*
      <h3><i className="fa-solid fa-trophy"></i> Rankingi Punktowe </h3>
       className="ranking-container" style={{ marginTop: '2rem', width: '100%' }}
        <div id="ranking-list" className="ranking-list">
        </div>
      
      <div
      <RankingTop3/>
        <div className="action-buttons-row">
          <Link to="/questy" className="button primary">
            <i className="fa-solid fa-envelopes-bulk"></i>&nbsp; Przeglądaj zadania <i className="fa-solid fa-envelopes-bulk"></i>
          </Link>
          <Link to="/pelny-ranking" className="button small">
            Pokaż cały ranking
          </Link>
        </div>
      </div>*/}

      {/* Kontener nawigacji pod rankingiem Top 3 */}
        <div 
          className="actions-container" 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '15px', 
            marginTop: '25px' 
          }}
        >
          {/* Pierwszy wiersz: Zadania (lewo) i Sklep (prawo) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <Link to="/zadania" className="button primary" style={{ width: '100%', textAlign: 'center' }}>
              <i className="fa-solid fa-envelope-open-text" style={{ marginRight: '10px' }}></i> 
              PRZEGLĄDAJ ZADANIA
            </Link>
            
            <Link to="/sklep" className="button primary" style={{ width: '100%', textAlign: 'center', backgroundColor: '#fff', color: '#1a1f36' }}>
              <i className="fa-solid fa-store" style={{ marginRight: '10px' }}></i> 
              SKLEP ZA KAMYKI
            </Link>
          </div>

          {/* Drugi wiersz: Pełny ranking (wyrównany do prawej pod sklepem) */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {/* width: calc(50% - 7.5px) precyzyjnie odejmuje połowę gapu z grida wyżej, zachowując idealną pionową linię */}
            <Link to="/pelny-ranking" className="button" style={{ width: 'calc(50% - 7.5px)', textAlign: 'center' }}>
              POKAŻ CAŁY RANKING
            </Link>
          </div>
        </div>
      
      <hr />

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