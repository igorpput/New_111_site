import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Sklep() {
  const [produkty, setProdukty] = useState([]);
  const [ladowanie, setLadowanie] = useState(true);

  useEffect(() => {
    // Odpytanie Nginxa o statyczny plik wygenerowany przez n8n
    fetch('/data/sklep.json')
      .then(res => res.json())
      .then(data => {
        // Upewniamy się, że to tablica
        const dataArray = Array.isArray(data) ? data : (data.data || []);
        setProdukty(dataArray);
        setLadowanie(false);
      })
      .catch(err => {
        console.error('Błąd pobierania bazy sklepu:', err);
        setLadowanie(false);
      });
  }, []);

  return (
    <article id="sklep">
      {/* Przycisk powrotu na stronę główną */}
      <Link to="/" className="custom-back-btn">
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
      
      <h2 className="major">Sklep za Kamyki</h2>
      
      {ladowanie ? (
        <p>Ładowanie asortymentu...</p>
      ) : produkty.length === 0 ? (
        <p>Sklep jest aktualnie pusty. Zapraszamy wkrótce!</p>
      ) : (
        <div 
          className="shop-grid" 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
            gap: '25px',
            marginTop: '20px'
          }}
        >
          {produkty.map((produkt, index) => {
            // Bezpieczne sprawdzanie stanu magazynowego
            const dostepny = produkt.magazyn > 0;

            return (
              <div 
                key={index} 
                className="shop-card" 
                style={{ 
                  border: '1px solid rgba(255, 255, 255, 0.2)', 
                  padding: '20px', 
                  borderRadius: '8px', 
                  display: 'flex', 
                  flexDirection: 'column',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }}
              >

                
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2em' }}>{produkt.nazwa}</h3>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', color: '#ffb900', fontSize: '1.1em' }}>
                    {produkt.cena} kamyków
                  </span>
                  <span style={{ fontSize: '0.85em', color: dostepny ? '#4caf50' : '#f44336', fontWeight: 'bold' }}>
                    {dostepny ? `Sztuk: ${produkt.magazyn}` : 'Wyprzedane'}
                  </span>
                </div>
                
                <p style={{ fontSize: '0.9em', flexGrow: 1, margin: '0 0 20px 0' }}>
                  {produkt.opis}
                </p>
                
                <button 
                  disabled={!dostepny}
                  style={{ 
                    width: '100%', 
                    opacity: dostepny ? 1 : 0.5,
                    cursor: dostepny ? 'pointer' : 'not-allowed'
                  }}
                  onClick={() => alert(`Kliknięto zakup: ${produkt.nazwa}. Tu wepniemy logikę koszyka.`)}
                >
                  {dostepny ? 'Do koszyka' : 'Brak na magazynie'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
}