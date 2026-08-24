import React from 'react';
import { Link } from 'react-router-dom';

export default function Skladki() {
  return (
    <article id="skladki">
      <Link to="/rodzice" className="custom-back-btn">
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
      <h2 className="major">Składka członkowska</h2>
      <h3>Ile wynosi?</h3>
      <p>Składka wynosi aktualnie 61 zł za kwartał.</p>
      
      <h3>Gdzie wpłacać?</h3>
      <p>Wpłaty najlepiej przynieść w gotówce na zbiórkę lub wykonać przelew na poniższe dane:</p>
      <p>
        Odbiorca: Szymon Zimicz<br/>
        Numer konta: 44 1020 4027 0000 1402 1797 0050<br/>
        Tytuł: Składka za [numer kwartału] kwartał [rok] - [Imię i nazwisko harcerza/harcerki]
      </p>
      
      <h3>Do kiedy wpłacać?</h3>
      <p>Płatność należy dokonać do końca pierwszego miesiąca danego kwartału.</p>
      
      <h3>Kontakt ze skarbnikiem?</h3>
      <p>W razie wątpliwości lub komplikacji prosimy o kontakt ze skarbnikiem lub kadrą.</p>
      <div className="contact-email">
        <div style={{ marginBottom: '8px' }}>
          Skarbnik: <i className="fa-regular fa-envelope" style={{ marginRight: '3px', marginLeft: '3px' }}></i> szymon.zimicz@zhp.pl
        </div>
      </div>
    </article>
  );
}