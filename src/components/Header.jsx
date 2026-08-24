import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header id="header">
      <div className="logo">
        <img src="images/LOGO111WHITE.png" alt="Logo 111 PDH" className="custom-logo" />
      </div>

      <div className="content">
        <div className="inner">
          <h1>111 PDH "Kamyk"</h1>
        </div>
        <p>111 Poznańska Drużyna Harcerska<br />
          im. Aleksandra Kamińskiego</p>
      </div>
      
      <nav>
        <ul>
          <li><Link to="/kalendarz">Kalendarz</Link></li>
          <li><Link to="/kronika">Kronika</Link></li>
          <li><Link to="/harcerz">Strefa harcerza</Link></li>
          <li><Link to="/rodzice">Strefa rodzica</Link></li>
          <li><Link to="/kontakt">Kontakt</Link></li>
        </ul>
      </nav>
    </header>
  );
}