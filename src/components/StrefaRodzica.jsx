import React from 'react';
import { Link } from 'react-router-dom';

export default function StrefaRodzica() {
  
  // Zastępuje starą funkcję kaszalot
  const handleKaszalot = (e, base64Url) => {
    e.preventDefault();
    try {
      const decodedUrl = atob(base64Url);
      window.open(decodedUrl, '_blank'); // Otwiera formularz MS Forms w nowej karcie
    } catch (error) {
      console.error("Nie udało się odkodować linku.", error);
    }
  };

  return (
    <article id="rodzice">
      <h2 className="major">Strefa Rodzica</h2>
      
      <h3>Formularz do wypełnienia</h3>
      <ul className="actions stacked">
        <li>
          <a 
            href="#" 
            onClick={(e) => handleKaszalot(e, 'aHR0cHM6Ly9mb3Jtcy5vZmZpY2UuY29tL1BhZ2VzL1Jlc3BvbnNlUGFnZS5hc3B4P2lkPUhvMDI0WFU1NWt5SlBmdzFIOVJOelkwVl9oZXVpSnhPaXJBMElwb04wcnhVTVRkRlFrdFRXVFJMUkVWRFVsbFFNVmcyUTFOUFFrZExSeTR1Cg==')} 
            className="button fit"
          >
            <i className="fa-solid fa-table-cells-row-lock"></i>&nbsp; Formularz danych
          </a>
        </li>
      </ul>
      
      <h3>Przydatne informacje</h3>
      <ul className="actions stacked">
        <li>
          <Link to="/skladki" className="button fit">
            <i className="fa-solid fa-coins"></i>&nbsp; Składki członkowskie FAQ
          </Link>
        </li>
        <li>
          <Link to="/soon" className="button fit">
            <i className="fa-solid fa-shirt"></i>&nbsp; Jak skompletować umundurowanie?
          </Link>
        </li>
      </ul>
      
      <h3>Dokumenty do pobrania</h3>
      <ul className="actions stacked">
        <li><a href="dokumenty/Zgoda_na_przynależność_harcerza.pdf" download className="button fit"><i className="fa-solid fa-file-pdf"></i>&nbsp; Zgoda na przynależność harcerza (mniej niż 16 lat)</a></li>
        <li><a href="dokumenty/Deklaracja_członkowska_harcerza.pdf" download className="button fit"><i className="fa-solid fa-file-pdf"></i>&nbsp; Deklaracja członkowska harcerza (więcej niż 16 lat)</a></li>
      </ul>
    </article>
  );
}