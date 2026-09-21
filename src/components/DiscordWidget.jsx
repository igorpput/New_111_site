import React, { useState, useEffect } from 'react';

export default function DiscordWidget({ serverId }) {
  const [members, setMembers] = useState([]);
  const [onlineCount, setOnlineCount] = useState('Dziś tu pusto...');
  const [inviteUrl, setInviteUrl] = useState('#');

  useEffect(() => {
    fetch(`https://discord.com/api/guilds/${serverId}/widget.json`)
      .then((response) => response.json())
      .then((data) => {
        setMembers(data.members || []);
        if (data.presence_count === 1) setOnlineCount('1 Aktywna Osoba');
        else if (data.presence_count > 1) setOnlineCount(`${data.presence_count} Aktywne Osoby`);
        setInviteUrl(data.instant_invite || '#');
      })
      .catch((err) => console.error('Błąd pobierania danych z Discorda:', err));
  }, [serverId]);

  return (
    <div className="custom-discord-widget">
      <div className="cdw-header">
        <div className="cdw-logo">
          <i className="fa-brands fa-discord"></i> Discord 111 PDH "Kamyk"
        </div>
        <div className="cdw-online-count" id="cdw-count">
          {onlineCount}
        </div>
      </div>
      
      <div className="cdw-body">
        <div className="cdw-title">Aktywni Harcerze</div>
        <ul className="cdw-member-list" id="cdw-members">
          {members.length > 0 ? (
            members.map((member) => (
              <li key={member.id}>
                <div className="cdw-avatar">
                  <img src={member.avatar_url} alt={member.username} />
                  <span className={`cdw-status ${member.status}`}></span>
                </div>
                <span className="cdw-name">{member.username}</span>
              </li>
            ))
          ) : (
            <li style={{ color: '#80848e' }}>Nikt nie jest aktywny...</li>
          )}
        </ul>
      </div>
      
      <div className="cdw-footer">
        <span className="cdw-footer-text">Zapraszamy harcerzy do dołączania</span>
        <a href={inviteUrl} target="_blank" rel="noreferrer" className="cdw-btn" id="cdw-join-btn">
          Dołącz do nas!
        </a>
      </div>
    </div>
  );
}