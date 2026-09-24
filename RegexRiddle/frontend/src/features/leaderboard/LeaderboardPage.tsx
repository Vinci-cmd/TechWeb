import { useEffect, useState } from 'react';
import api from '../../core/api.service';
import { Medal, Trophy } from 'lucide-react';
export const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  useEffect(() => {
    api.get('/leaderboard').then(res => setLeaderboard(res.data)).catch(console.error);
  }, []);
  return (
    <div className="page" style={{ padding: '2rem 1rem' }}>
      <div className="leader-heading" style={{ marginBottom: '3rem' }}>
        <Trophy size={48} color="var(--primary)" style={{ margin: '0 auto 1rem', display: 'block' }} />
        <h1>Classifica Globale</h1>
        <p>I migliori risolutori di Regex al mondo.</p>
      </div>
      <div style={{ maxWidth: '45rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {leaderboard.map((user, index) => {
          const isTop3 = index < 3;
          const medalColor = index === 0 ? '#fbbf24' : index === 1 ? '#94a3b8' : index === 2 ? '#b45309' : 'transparent';
          return (
            <div key={user.userId} className="panel leader-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.25rem 2rem', background: isTop3 ? 'rgba(230, 81, 0, 0.05)' : 'var(--card)' }}>
              <div style={{ width: '3rem', textAlign: 'center', fontSize: '1.5rem', fontWeight: 900, color: isTop3 ? medalColor : 'var(--muted-foreground)' }}>
                {isTop3 ? <Medal size={32} color={medalColor} /> : `#${index + 1}`}
              </div>
              <div className="avatar" style={{ width: 48, height: 48, backgroundColor: 'var(--primary)', fontSize: '1.2rem' }}>
                {user.avatar ? <img src={user.avatar} alt="avatar" /> : user.username[0].toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--foreground)' }}>@{user.username}</h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34d399' }}>{user.enigmasSolved} sfide</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>Media: {user.avgAttempts.toFixed(2)} tentativi</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};