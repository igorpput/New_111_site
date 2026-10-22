import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Sklep() {
  const [produkty, setProdukty] = useState([]);
  const [ladowanie, setLadowanie] = useState(true);

  const [wybranyProdukt, setWybranyProdukt] = useState(null);
  const [miano, setMiano] = useState('');
  const [pin, setPin] = useState('');
  const [statusTransakcji, setStatusTransakcji] = useState('idle'); // idle, wysylanie, sukces, blad

  useEffect(() => {
    // Odpytanie Nginxa o statyczny plik wygenerowany przez n8n
    fetch(`/data/sklep.json?v=${new Date().getTime()}`)
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

  const wyslijZamowienie = (e) => {
    e.preventDefault();
    if (!miano.trim() || pin.length < 4) return; // Podstawowa walidacja

    setStatusTransakcji('wysylanie');

    const WEBHOOK_URL = 'https://n8n.111kamyk.me/webhook/nowe-zamowienie'; // PODMIEŃ NA SWÓJ

    const payload = {
      kupujacy: miano,
      pin: pin, // <-- WYSYŁAMY PIN DO N8N
      produkt_id: wybranyProdukt.id,
      produkt_nazwa: wybranyProdukt.nazwa,
      cena: wybranyProdukt.cena
    };

    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    .then(res => {
      // UWAGA: Logika sprawdzania błędów (np. 401 Unauthorized od n8n)
      if (res.status === 401) throw new Error('Błędny PIN');
      if (!res.ok) throw new Error('Błąd sieci');
      
      setStatusTransakcji('sukces');

      setProdukty(obecneProdukty => 
        obecneProdukty.map(p => 
          p.id === wybranyProdukt.id 
            ? { ...p, stan_magazynowy: (parseInt(p.stan_magazynowy, 10) - 1).toString() }
            : p
        )
      );

      setTimeout(() => {
        setWybranyProdukt(null);
        setMiano('');
        setPin(''); // Czyszczenie PINu
        setStatusTransakcji('idle');
      }, 3000);
    })
    .catch(err => {
      console.error('Błąd transakcji:', err);
      // Przekazanie wiadomości o błędnym pinie do interfejsu
      setStatusTransakcji(err.message === 'Błędny PIN' ? 'zly_pin' : 'blad');
    });
  };

  return (
    <article id="sklep">
      {/* Przycisk powrotu na stronę główną */}
      <Link to="/harcerz" className="custom-back-btn">
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
            // Bezpieczna konwersja do Integera i użycie właściwego klucza
            const stan = parseInt(produkt.stan_magazynowy, 10) || 0;
            const dostepny = stan > 0;

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
                    {dostepny ? `Sztuk: ${stan}` : 'Wyprzedane'}
                  </span>
                </div>
                
                <p style={{ fontSize: '0.9em', flexGrow: 1, margin: '0 0 20px 0' }}>{produkt.opis}</p>
                
                <button 
                  disabled={!dostepny}
                  style={{ 
                    width: '100%', 
                    opacity: dostepny ? 1 : 0.5,
                    cursor: dostepny ? 'pointer' : 'not-allowed'
                  }}
                  onClick={() => setWybranyProdukt(produkt)}
                >
                  {dostepny ? 'Do koszyka' : 'Brak na magazynie'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Nakładka (Modal) z formularzem zamówienia */}
      {wybranyProdukt && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: '#1a1f36', padding: '30px', borderRadius: '8px',
            width: '90%', maxWidth: '400px', border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{ marginTop: 0 }}>Finalizacja zamówienia</h3>
            <p style={{ marginBottom: '15px' }}>
              Wybierasz: <strong>{wybranyProdukt.nazwa}</strong><br />
              Cena: <strong>{wybranyProdukt.cena} kamyków</strong>
            </p>

            {statusTransakcji === 'idle' || statusTransakcji === 'zly_pin' ? (
              <form onSubmit={wyslijZamowienie}>
                <input 
                  type="text" 
                  placeholder="Twoje Miano" 
                  value={miano}
                  onChange={(e) => setMiano(e.target.value)}
                  style={{ width: '100%', marginBottom: '10px' }}
                  required
                />
                <input 
                  type="password" 
                  inputMode="numeric"
                  placeholder="Twój 6-cyfrowy PIN" 
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))} // Dopuszcza tylko cyfry
                  style={{ width: '100%', marginBottom: '15px' }}
                  maxLength="6"
                  required
                />
                
                {statusTransakcji === 'zly_pin' && (
                  <p style={{ color: '#f44336', fontSize: '0.9em', marginTop: '-5px', marginBottom: '15px' }}>
                    <i className="fa-solid fa-triangle-exclamation"></i> Odmowa dostępu: Błędne Miano lub PIN.
                  </p>
                )}

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" className="button" style={{ flex: 1 }} onClick={() => { setWybranyProdukt(null); setStatusTransakcji('idle'); setPin(''); }}>Anuluj</button>
                  <button type="submit" className="button primary" style={{ flex: 1 }}>Kupuję</button>
                </div>
              </form>
            ) : null}

            {statusTransakcji === 'wysylanie' && <p>Wysyłanie zamówienia do sztabu...</p>}
            
            {statusTransakcji === 'sukces' && (
              <p style={{ color: '#4caf50', fontWeight: 'bold' }}>
                <i className="fa-solid fa-check"></i> Zamówienie przyjęte!
              </p>
            )}

            {statusTransakcji === 'blad' && (
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: '#f44336' }}>Wystąpił błąd komunikacji. Spróbuj ponownie.</p>
                <button className="button" onClick={() => setStatusTransakcji('idle')}>Wróć</button>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}