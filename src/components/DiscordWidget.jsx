import React, { useState, useEffect } from 'react';

export default function DiscordWidget({ serverId }) {
  // Stany przechowujące dane z API Discorda
  const [members, setMembers] = useState([]);
  const [onlineCount, setOnlineCount] = useState('...');
  const [inviteUrl, setInviteUrl] = useState('#');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Upewnij się, że w ustawieniach serwera Discord masz włączony "Widżet serwera" (Server Widget)
    // serverId przekazujemy jako props do komponentu
    const widgetApiUrl = `https://discord.com/api/guilds/${serverId}/widget.json`;

    fetch(widgetApiUrl)
      .then((response) => {
        if (!response.ok) throw new Error('Nie udało się pobrać danych z Discorda');
        return response.json();
      })
      .then((data) => {
        setMembers(data.members || []);
        setOnlineCount(data.presence_count || 0);
        setInviteUrl(data.instant_invite || '#');
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Błąd ładowania widżetu');
        setIsLoading(false);
      });
  }, [serverId]);

  return (
    <div className="custom-discord-widget">
      <div className="cdw-header">
        <div className="cdw-logo">
          <i className="fa-brands fa-discord"></i> Discord 111 PDH "Kamyk"
        </div>
        <div className="cdw-online-count">
          {error ? 'Błąd' : `${onlineCount} Aktywnych`}
        </div>
      </div>
      
      <div className="cdw-body">
        <div className="cdw-title">Aktywni Harcerze</div>
        <ul className="cdw-member-list">
          {isLoading ? (
            <li className="cdw-loading">Ładowanie danych...</li>
          ) : error ? (
            <li className="cdw-loading">{error}</li>
          ) : members.length > 0 ? (
            // Renderowanie listy członków
            members.map((member) => (
              <li key={member.id} className="cdw-member-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <img 
                  src={member.avatar_url} 
                  alt={member.username} 
                  style={{ width: '32px', height: '32px', borderRadius: '50%', marginRight: '10px' }} 
                />
                <span className="cdw-member-name" style={{ fontWeight: 'bold' }}>
                  {member.username}
                </span>
                {/* Status: online, idle, dnd */}
                <span className={`cdw-status ${member.status}`} style={{ marginLeft: 'auto', fontSize: '10px' }}>
                  {member.status === 'online' ? '🟢' : member.status === 'idle' ? '🌙' : '🔴'}
                </span>
              </li>
            ))
          ) : (
            <li className="cdw-loading">Brak aktywnych osób</li>
          )}
        </ul>
      </div>
      
      <div className="cdw-footer">
        <span className="cdw-footer-text">Zapraszamy harcerzy do dołączania</span>
        <a 
          href={inviteUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="cdw-btn"
        >
          Dołącz do nas!
        </a>
      </div>
    </div>
  );
}