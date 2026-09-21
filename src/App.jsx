import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';

// Importy komponentów
import Header from './components/Header';
import Kalendarz from './components/Kalendarz';
import Kronika from './components/Kronika';
import StrefaHarcerza from './components/StrefaHarcerza';
import StrefaRodzica from './components/StrefaRodzica';
import Kontakt from './components/Kontakt';
import PelnyRanking from './components/PelnyRanking';
import Questy from './components/Questy';
import Skladki from './components/Skladki';
import Mundur from './components/Mundur';
import ContactThanks from './components/ContactThanks';
import Soon from './components/Soon';
import Footer from './components/Footer';

// Wewnętrzny komponent zarządzający stanem widoku
function AplikacjaGlowna() {
  const location = useLocation();
  // Jesteśmy w trybie artykułu, jeśli URL jest inny niż strona główna ('/')
  const isArticleVisible = location.pathname !== '/';

  // Nasłuchiwanie zmian URL - to tutaj sterujemy oryginalnym zachowaniem szablonu
  useEffect(() => {
    if (isArticleVisible) {
      document.body.classList.add('is-article-visible');
    } else {
      document.body.classList.remove('is-article-visible');
      // Opcjonalne usunięcie resztek klas z jQuery, jeśli framework tego wymaga
      document.body.classList.remove('is-preload');
    }
  }, [isArticleVisible]);

  return (
    <div id="wrapper">
      <Header />

      <div id="main" style={{ display: isArticleVisible ? 'flex' : 'none' }}>
        <Routes>
          {/* Strona główna nie renderuje żadnego artykułu */}
          <Route path="/" element={null} />
          
          <Route path="/kalendarz" element={<Kalendarz />} />
          <Route path="/kronika" element={<Kronika />} />
          <Route path="/harcerz" element={<StrefaHarcerza />} />
          <Route path="/rodzice" element={<StrefaRodzica />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/pelny-ranking" element={<PelnyRanking />} />
          <Route path="/questy" element={<Questy />} />
          <Route path="/skladki" element={<Skladki />} />
          <Route path="/mundur" element={<Mundur />} />
          <Route path="/contact_thanks" element={<ContactThanks />} />
          <Route path="/soon" element={<Soon />} />
        </Routes>
        
        {/* Generowanie oryginalnego przycisku krzyżyka do zamykania artykułu */}
        {isArticleVisible && (
          <Link to="/" className="close"></Link>
        )}
      </div>

      <Footer />
    </div>
  );
}

// Główny kontener aplikacji
export default function App() {
  return (
    <Router>
      <AplikacjaGlowna />
      <div id="bg"></div>
    </Router>
  );
}