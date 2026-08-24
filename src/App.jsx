import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importy wszystkich komponentów z folderu components/
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

export default function App() {
  return (
    <Router>
      <div id="wrapper">
        <Header />

        <div id="main">
          {/* Routes działa jak switch - renderuje tylko ten komponent, który pasuje do URL */}
          <Routes>
            <Route path="/" element={<Kalendarz />} /> {/* Widok domyślny */}
            <Route path="/kalendarz" element={<Kalendarz />} />
            <Route path="/kronika" element={<Kronika />} />
            <Route path="/harcerz" element={<StrefaHarcerza />} />
            <Route path="/rodzice" element={<StrefaRodzica />} />
            <Route path="/kontakt" element={<Kontakt />} />
            
            {/* Podstrony */}
            <Route path="/pelny-ranking" element={<PelnyRanking />} />
            <Route path="/questy" element={<Questy />} />
            <Route path="/skladki" element={<Skladki />} />
            <Route path="/mundur" element={<Mundur />} />
            <Route path="/contact_thanks" element={<ContactThanks />} />
            <Route path="/soon" element={<Soon />} />
          </Routes>
        </div>

        <Footer />
      </div>
      <div id="bg"></div>
    </Router>
  );
}