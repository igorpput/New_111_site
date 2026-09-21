import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Kalendarz() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  
  // Złożony stan modala odwzorowujący oryginalną logikę z calendar.js
  const [modal, setModal] = useState({
    isOpen: false,
    isDetailsView: false,
    savedDateString: null,
    savedDayEvents: null,
    title: '',
    bodyHtml: null,
  });

  const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

  useEffect(() => {
    fetch('/data/kalendarz.json')
      .then(res => res.json())
      .then(data => {
        const dataArray = Array.isArray(data) ? data : (data.data || []);
        setEvents(dataArray);
      })
      .catch(err => console.error('Błąd pobierania kalendarza:', err));
  }, []);

  const changeMonth = (offset) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev.getFullYear(), prev.getMonth() + offset, 1);
      return newDate;
    });
  };

  const closeModal = () => {
    if (modal.isDetailsView && modal.savedDayEvents && modal.savedDayEvents.length > 1) {
      showDayList(modal.savedDateString, modal.savedDayEvents);
    } else {
      setModal({ isOpen: false, isDetailsView: false, savedDateString: null, savedDayEvents: null, title: '', bodyHtml: null });
    }
  };

  const showEventDetails = (evt, currentDayEvents = null, currentDateStr = null) => {
    const sameTitleDates = events.filter(e => e.title === evt.title).map(e => e.date).sort();
    
    const getDaysDiff = (d1, d2) => Math.round((new Date(d2) - new Date(d1)) / (1000 * 60 * 60 * 24));
    
    let startDate = evt.date;
    let endDate = evt.date;
    let currentIndex = sameTitleDates.indexOf(evt.date);

    for (let i = currentIndex; i > 0; i--) {
      if (getDaysDiff(sameTitleDates[i-1], sameTitleDates[i]) === 1) startDate = sameTitleDates[i-1];
      else break;
    }
    for (let i = currentIndex; i < sameTitleDates.length - 1; i++) {
      if (getDaysDiff(sameTitleDates[i], sameTitleDates[i+1]) === 1) endDate = sameTitleDates[i+1];
      else break;
    }

    const formatDateString = (ds) => {
      const [year, month, day] = ds.split('-');
      return `${day}.${month}.${year.slice(2)}`;
    };

    let finalDateDisplay = formatDateString(startDate);
    if (startDate !== endDate) finalDateDisplay += ` - ${formatDateString(endDate)}`;

    const bodyContent = (
      <>
        <div className="event-detail-row">
          <span className="event-detail-label">Data</span> {finalDateDisplay}
        </div>
        {evt.startTime && (
          <div className="event-detail-row">
            <span className="event-detail-label">Godzina</span>
            {evt.startTime} {evt.endTime ? `- ${evt.endTime}` : ''}
          </div>
        )}
        {evt.opis && (
          <div className="event-detail-row" style={{ marginTop: '15px' }}>
            <span className="event-detail-label">Opis</span> {evt.opis}
          </div>
        )}
      </>
    );

    setModal(prev => ({
      ...prev,
      isOpen: true,
      isDetailsView: true,
      title: evt.title.toUpperCase(),
      bodyHtml: bodyContent,
      savedDateString: currentDateStr || prev.savedDateString,
      savedDayEvents: currentDayEvents || prev.savedDayEvents
    }));
  };

  const showDayList = (dateString, dayEvents) => {
    const getBarColor = (type) => {
      const t = type ? type.toLowerCase() : '';
      if (t === 'zbiórka' || t === 'zbiorka') return '#2E45C7';
      if (t === 'wyjazd') return '#459348';
      if (t === 'święto' || t === 'swieto') return '#8A5B2B';
      if (t === 'wydarzenie') return '#9B00B6';
      if (t === 'akcja') return '#E47D00';
      return '#888A9D';
    };

    const bodyContent = (
      <>
        {dayEvents.map((evt, idx) => (
          <div 
            key={idx} 
            className={`modal-event-item type-${evt.type ? evt.type.toLowerCase() : 'inne'}`} 
            style={{ borderLeft: `5px solid ${getBarColor(evt.type)}`, cursor: 'pointer' }}
            onClick={() => showEventDetails(evt, dayEvents, dateString)}
          >
            <strong>{evt.title}</strong><br/><small>{evt.type || 'Inne'}</small>
          </div>
        ))}
      </>
    );

    setModal({
      isOpen: true,
      isDetailsView: false,
      savedDateString: dateString,
      savedDayEvents: dayEvents,
      title: `Wydarzenia: ${dateString}`,
      bodyHtml: bodyContent
    });
  };

  const handleDayClick = (dateString) => {
    const dayEvents = events.filter(e => e.date === dateString);
    if (dayEvents.length === 0) return;
    if (dayEvents.length === 1) {
      setModal(prev => ({ ...prev, savedDayEvents: null }));
      showEventDetails(dayEvents[0]);
    } else {
      showDayList(dateString, dayEvents);
    }
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const startingDay = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const lastDateOfLastMonth = new Date(year, month, 0).getDate();

  const blanks = Array.from({ length: startingDay }).map((_, i) => (
    <li key={`blank-${i}`} className="inactive">{lastDateOfLastMonth - startingDay + i + 1}</li>
  ));

  const today = new Date();
  const days = Array.from({ length: daysInMonth }).map((_, i) => {
    const day = i + 1;
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayEvents = events.filter(e => e.date === dateString);
    const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear() ? 'today' : '';

    return (
      <li key={day} className={isToday} onClick={() => handleDayClick(dateString)} style={{ cursor: dayEvents.length ? 'pointer' : 'default' }}>
        {day}
        {dayEvents.map((evt, idx) => (
          <span key={idx} className={`event-marker type-${evt.type ? evt.type.toLowerCase() : 'inne'}`}>
            {evt.title}
          </span>
        ))}
      </li>
    );
  });

  const lastDayOfMonth = new Date(year, month, daysInMonth).getDay();
  const endingDay = lastDayOfMonth === 0 ? 6 : lastDayOfMonth - 1;
  const nextMonthBlanks = Array.from({ length: 6 - endingDay }).map((_, i) => (
    <li key={`next-${i}`} className="inactive">{i + 1}</li>
  ));

  return (
    <>
      <article id="kalendarz">
        <Link to="/" className="custom-back-btn">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <h2 className="major">Kalendarz 111</h2>
        <div className="calendar-wrapper">
          <header className="calendar-header">
            <button className="nav-btn" id="prevMonth" onClick={() => changeMonth(-1)}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <h3 id="currentMonth">{months[month]} {year}</h3>
            <button className="nav-btn" id="nextMonth" onClick={() => changeMonth(1)}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </header>
          <div className="calendar-body">
            <ul className="weeks">
              <li>Pn</li><li>Wt</li><li>Śr</li><li>Cz</li><li>Pt</li><li>Sb</li><li>Nd</li>
            </ul>
            <ul className="days" id="daysContainer">
              {blanks}
              {days}
              {nextMonthBlanks}
            </ul>
          </div>
        </div>
      </article>

      <div id="calendarModal" className="calendar-modal" style={{ display: modal.isOpen ? 'block' : 'none' }}>
        <div className="calendar-modal-content">
          <span className="close-modal" onClick={closeModal} style={{ cursor: 'pointer' }}>
            {modal.isDetailsView && modal.savedDayEvents && modal.savedDayEvents.length > 1 ? (
              <i className="fa-solid fa-arrow-left"></i>
            ) : (
              <i className="fa-solid fa-xmark"></i>
            )}
          </span>
          <h3 id="modalTitle">{modal.title}</h3>
          <div id="modalBody">{modal.bodyHtml}</div>
        </div>
      </div>
    </>
  );
}