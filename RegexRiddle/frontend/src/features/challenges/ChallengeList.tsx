import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../core/api.service';
import { ChevronRight, Calendar, User, Filter } from 'lucide-react';
export const ChallengeList = () => {
  const [challenges, setChallenges] = useState<any[]>([]);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('Tutti');
  useEffect(() => {
    api.get('/challenges').then(res => setChallenges(res.data)).catch(console.error);
  }, []);
  const filteredChallenges = challenges.filter(c => 
    filterDifficulty === 'Tutti' ? true : c.difficulty === filterDifficulty
  );
  const getDifficultyColor = (diff: string) => {
    switch (diff?.toLowerCase()) {
      case 'facile': return 'var(--green)';
      case 'medio': return 'var(--amber)';
      case 'difficile': return 'var(--red)';
      default: return 'var(--primary)';
    }
  };
  return (
    <div style={{ maxWidth: '60rem', margin: '0 auto' }}>
      {/* Filtri */}
      <div style={{ marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {['Tutti', 'Facile', 'Medio', 'Difficile'].map(diff => {
          const isActive = filterDifficulty === diff;
          let activeColor = 'var(--primary)';
          if (diff === 'Facile') activeColor = 'var(--green)';
          if (diff === 'Medio') activeColor = 'var(--amber)';
          if (diff === 'Difficile') activeColor = 'var(--red)';
          if (diff === 'Tutti') activeColor = 'var(--foreground)';
          return (
            <button
              key={diff}
              onClick={() => setFilterDifficulty(diff)}
              style={{
                padding: '0.5rem 1.5rem',
                border: '2px solid var(--border)',
                background: isActive ? activeColor : 'var(--card)',
                color: isActive ? 'var(--primary-foreground)' : 'var(--foreground)',
                fontWeight: 'bold',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                transition: 'all 150ms ease',
                boxShadow: isActive ? 'none' : '2px 2px 0px var(--border)',
                transform: isActive ? 'translate(2px, 2px)' : 'none'
              }}
            >
              {diff === 'Tutti' ? 'Tutte' : diff === 'Medio' ? 'Media' : diff}
            </button>
          );
        })}
      </div>
      {filteredChallenges.length === 0 ? (
        <div className="empty-state panel" style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Nessuna sfida trovata per questo filtro.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredChallenges.map(c => (
            <Link key={c.id} to={`/challenge/${c.id}`} className="panel challenge-card" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', minHeight: 'auto', padding: '1.5rem 2rem', gap: '2rem', transition: 'transform 150ms ease, border-color 150ms ease' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{c.title}</h3>
                  <span className="diff medium" style={{ background: 'var(--card)', color: getDifficultyColor(c.difficulty), borderColor: getDifficultyColor(c.difficulty) }}>
                    {c.difficulty || 'RegExp'}
                  </span>
                </div>
                <p style={{ margin: 0, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
                  {c.description.substring(0, 150)}{c.description.length > 150 ? '...' : ''}
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--muted-foreground)', fontSize: '0.85rem', minWidth: '150px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <User size={14} /> @{c.creator?.username || `Utente #${c.creatorId}`}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calendar size={14} /> {new Date(c.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronRight size={24} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};