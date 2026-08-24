import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Kontakt() {
  const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate(); // 2. Zainicjalizuj hooka

    const wyslijWiadomosc = async (e) => {
      e.preventDefault(); 
      setIsSubmitting(true);

      const form = e.currentTarget;
      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          form.reset();
          navigate('/contact_thanks'); // 3. Użyj nawigacji z routera
        
        } else {
          alert("Wystąpił błąd przy wysyłaniu wiadomości. Spróbuj ponownie.");
        }
      } catch (error) {
        console.error('Błąd:', error);
        alert("Nie udało się wysłać wiadomości.");
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <article id="contact">
      <h2 className="major">Kontakt</h2>
      <h3>Wypełnij formularz kontaktowy</h3>
      
      <form id="ajax-contact" action="https://formsubmit.co/igor.preuss@zhp.net.pl" method="POST" onSubmit={wyslijWiadomosc}>
        <input type="hidden" name="_subject" value="Nowa wiadomość ze strony 111 PDH!" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="text" name="_honey" style={{ display: 'none' }} />

        <div className="fields">
          <div className="field half">
            <label htmlFor="name">Imię i Nazwisko</label>
            <input type="text" name="name" id="name" required />
          </div>
          <div className="field half">
            <label htmlFor="email">Twój Email</label>
            <input type="email" name="email" id="email" required />
          </div>
          <div className="field">
            <label htmlFor="message">Wiadomość</label>
            <textarea name="message" id="message" rows="4" required></textarea>
          </div>
        </div>
        <ul className="actions">
          <li>
            <input 
              type="submit" 
              value={isSubmitting ? "Wysyłanie..." : "Wyślij"} 
              className="primary" 
              disabled={isSubmitting} 
            />
          </li>
          <li><input type="reset" value="Wyczyść" disabled={isSubmitting} /></li>
        </ul>
      </form>

      <div className="contact-email">
        <div style={{ marginBottom: '8px' }}>
          Drużynowy: <i className="fa-regular fa-envelope" style={{ marginRight: '3px', marginLeft: '3px' }}></i> michal.bankiewicz@zhp.net.pl
        </div>
        <div>
          Administrator strony: <i className="fa-regular fa-envelope" style={{ marginRight: '3px', marginLeft: '3px' }}></i> igor.preuss@zhp.net.pl
        </div>
      </div>

      <ul className="icons">
        <li><a href="https://www.facebook.com/111PDHKamyk" target="_blank" rel="noreferrer" className="icon brands fa-facebook-f"><span className="label">Facebook</span></a></li>
        <li><a href="https://www.instagram.com/111pdh_kamyk" target="_blank" rel="noreferrer" className="icon brands fa-instagram"><span className="label">Instagram</span></a></li>
      </ul>
    </article>
  );
}