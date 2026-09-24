import { useEffect, useState } from 'react';
import api from '../../core/api.service';
import { useAuth } from '../../core/AuthContext';
import { LogOut, Save } from 'lucide-react';
export const ProfilePage = () => {
  const [stats, setStats] = useState<any>(null);
  const [avatar, setAvatar] = useState('');
  const { user, logout, updateUser } = useAuth();
  const loadStats = () => {
    api.get('/profile/stats').then(res => {
      setStats(res.data);
      if (res.data.avatar) setAvatar(res.data.avatar);
      if (user && user.avatar !== res.data.avatar) {
        updateUser({ ...user, avatar: res.data.avatar });
      }
    }).catch(console.error);
  };
  useEffect(() => {
    loadStats();
  }, []);
  const handleUpdateAvatar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.put('/profile/avatar', { avatar });
      
      if (user) {
        updateUser({ ...user, avatar: res.data.avatar });
      }
      loadStats();
    } catch (err: any) {
      console.error(err);
    }
  };
  if (!stats) return <div className="page" style={{ padding: '2rem' }}>Caricamento...</div>;
  return (
    <div className="page" style={{ padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '60rem', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>Il tuo Profilo</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'flex-start' }}>
          <div className="panel" style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', padding: '2rem' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '0px', border: '2px solid var(--border)', background: 'var(--primary)', color: 'var(--primary-foreground)', display: 'grid', placeItems: 'center', fontSize: '3rem', overflow: 'hidden' }}>
              {stats.avatar ? <img src={stats.avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : stats.username?.[0]?.toUpperCase()}
            </div>
            <h2 style={{ margin: 0 }}>@{stats.username}</h2>
            <div style={{ width: '100%', marginTop: '1rem' }}>
              <p style={{ fontSize: '0.9rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Scegli il tuo Avatar</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {[
                  'https://api.dicebear.com/7.x/bottts/svg?seed=Felix',
                  'https://api.dicebear.com/7.x/bottts/svg?seed=Aneka',
                  'https://api.dicebear.com/7.x/bottts/svg?seed=Tinkerbell',
                  'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Lucky',
                  'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Missy',
                  'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Peanut'
                ].map((presetUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatar(presetUrl)}
                    style={{
                      aspectRatio: '1/1',
                      border: avatar === presetUrl ? '3px solid var(--primary)' : '2px solid var(--border)',
                      background: 'var(--card)',
                      padding: '0.25rem',
                      cursor: 'pointer',
                      borderRadius: '0px'
                    }}
                  >
                    <img src={presetUrl} alt="preset" style={{ width: '100%', height: '100%' }} />
                  </button>
                ))}
              </div>
              <button 
                onClick={handleUpdateAvatar} 
                className="button primary small" 
                style={{ width: '100%', marginTop: '1rem' }}
                disabled={!avatar}
              >
                <Save size={16} /> Salva Avatar
              </button>
            </div>
            <button onClick={logout} className="button outline" style={{ width: '100%', marginTop: '1rem', borderColor: 'var(--red)', color: 'var(--red)' }}>
              <LogOut size={16} /> Esci dall'account
            </button>
          </div>
          <div className="panel" style={{ flex: '2 1 400px', padding: '0' }}>
            <div style={{ padding: '1.5rem', borderBottom: '2px solid var(--border)', background: 'var(--background)' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Statistiche di Gioco</h3>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <td style={{ padding: '1.5rem', fontWeight: 'bold', width: '50%' }}>Enigmi Creati</td>
                  <td style={{ padding: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '1.2rem', textAlign: 'right' }}>{stats.createdCount}</td>
                </tr>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <td style={{ padding: '1.5rem', fontWeight: 'bold' }}>Sfide Risolte</td>
                  <td style={{ padding: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '1.2rem', textAlign: 'right' }}>{stats.solvedCount}</td>
                </tr>
                <tr>
                  <td style={{ padding: '1.5rem', fontWeight: 'bold' }}>Tentativi Totali Inviati</td>
                  <td style={{ padding: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '1.2rem', textAlign: 'right' }}>{stats.attemptsCount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};