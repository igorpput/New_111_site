import React, { useState, useEffect } from 'react';

export default function Kalendarz() {
  // Stan przechowujący aktualnie wyświetlaną datę (miesiąc i rok)
  const [currentDate, setCurrentDate] = useState(new Date());
  // Stan przechowujący pobrane wydarzenia z pliku JSON
  const [events, setEvents] = useState([]);
  // Stan dla modala (czy jest otwarty i jakie ma dane)
  const [modal, setModal] = useState({ isOpen: false, title: '', body: '' });

  // 1. Pobieranie danych (zastępuje fetch z calendar.js)
  useEffect(() => {
    // Podmień ścieżkę na właściwą. Struktura JSON powinna wyglądać np.:
    // [{ "data": "2026-08-25", "tytul": "Zbiórka", "opis": "Przynieść busole", "typ": "type-zbiorka" }]
    fetch('/data/kalendarz.json')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Błąd pobierania kalendarza:', err));
  }, []);

  // 2. Nawigacja po miesiącach
  const changeMonth = (offset) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + offset, 1);
      return newDate;
    });
  };

  // 3. Logika otwierania/zamykania modala
  const openModal = (eventData) => {
    setModal({
      isOpen: true,
      title: eventData.tytul,
      body: eventData.opis
    });
  };

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  // 4. Logika budowania siatki dni
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", 
    "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
  ];

  // Obliczanie pierwszego dnia miesiąca (dostosowanie do polskiego tygodnia: poniedziałek = 1)
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; 

  // Liczba dni w obecnym miesiącu
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Generowanie pustych kafelków dla dni z poprzedniego miesiąca
  const blanks = Array.from({ length: startingDay }).map((_, index) => (
    <li key={`blank-${index}`} className="inactive"></li>
  ));

  // Generowanie właściwych dni miesiąca
  const days = Array.from({ length: daysInMonth }).map((_, index) => {
    const dayNumber = index + 1;
    
    // Formatowanie daty do postaci YYYY-MM-DD (np. 2026-08-05), by porównać z JSON
    const formattedMonth = String(month + 1).padStart(2, '0');
    const formattedDay = String(dayNumber).padStart(2, '0');
    const dateString = `${year}-${formattedMonth}-${formattedDay}`;

    // Szukanie wydarzenia na dany dzień
    const dayEvent = events.find(e => e.data === dateString);

    // Sprawdzanie czy to "dzisiaj"
    const today = new Date();
    const isToday = dayNumber === today.getDate() && month === today.getMonth() && year === today.getFullYear();

    // Ustalanie klas CSS dla danego dnia
    let dayClass = '';
    if (isToday) dayClass += ' today';
    if (dayEvent) {
      dayClass += ' event-day'; // Wskazuje, że w ten dzień coś się dzieje
      if (dayEvent.typ) dayClass += ` ${dayEvent.typ}`; // Opcjonalna klasa koloru (np. zbiórka/biwak)
    }

    return (
      <li 
        key={`day-${dayNumber}`} 
        className={dayClass.trim()} 
        onClick={() => dayEvent && openModal(dayEvent)}
        style={{ cursor: dayEvent ? 'pointer' : 'default' }}
      >
        {dayNumber}
      </li>
    );
  });

  return (
    <>
      <article id="kalendarz">
        <h2 className="major">Kalendarz 111</h2>

        <div className="calendar-wrapper">
          <header className="calendar-header">
            <button className="nav-btn" onClick={() => changeMonth(-1)}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <h3>{monthNames[month]} {year}</h3>
            <button className="nav-btn" onClick={() => changeMonth(1)}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </header>
          
          <div className="calendar-body">
            <ul className="weeks">
              <li>Pn</li><li>Wt</li><li>Śr</li><li>Cz</li><li>Pt</li><li>Sb</li><li>Nd</li>
            </ul>
            <ul className="days">
              {blanks}
              {days}
            </ul>
          </div>
        </div>
      </article>

      {/* Modal renderowany warunkowo */}
      <div 
        id="calendarModal" 
        className="calendar-modal" 
        style={{ display: modal.isOpen ? 'block' : 'none' }}
      >
        <div className="calendar-modal-content">
          <span className="close-modal" onClick={closeModal}>&times;</span>
          <h3>{modal.title}</h3>
          <div>{modal.body}</div>
        </div>
      </div>
    </>
  );
}