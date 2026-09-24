import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../core/api.service';
import { useAuth } from '../../core/AuthContext';
import { ArrowLeft, Shield, CircleCheck, Terminal } from 'lucide-react';
export const ChallengeSolve = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [challenge, setChallenge] = useState<any>(null);
  const [regex, setRegex] = useState('');
  const [feedback, setFeedback] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  useEffect(() => {
    api.get(`/challenges/${id}`)
      .then(res => setChallenge(res.data))
      .catch(() => setError('Impossibile caricare questa sfida.'));
  }, [id]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    try {
      const res = await api.post('/challenges/attempts', { challengeId: Number(id), regex });
      setFeedback(res.data.evaluation);
    } catch (err: any) {
      setSubmitError(err.response?.data?.error || 'Errore nel submit.');
    }
  };
  if (error) return (
    <section className="page" style={{ padding: '2rem' }}>
      <Link className="back-link" to="/dashboard">
        <ArrowLeft size={18} aria-hidden="true" /> Torna al Database
      </Link>
      <div style={{color: 'var(--red)', marginTop: '1rem'}}>{error}</div>
    </section>
  );
  if (!challenge) return <div style={{padding: '2rem'}}>Caricamento sfida...</div>;
  const isAuthor = challenge.creatorId === user?.id;
  const hasSolved = challenge.attempts?.some((a: any) => a.userId === user?.id && a.isSuccess);
  return (
    <section className="page" style={{ padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '60rem', margin: '0 auto' }}>
        <div className="detail-header motion-in" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <Link className="button outline small" to="/dashboard" aria-label="Torna alle sfide">
            <ArrowLeft size={18} aria-hidden="true" /> Indietro
          </Link>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h1 style={{ fontSize: '2.5rem', margin: '0' }}>{challenge.title}</h1>
            <span className="diff medium" style={{ background: 'var(--card)', color: challenge.difficulty === 'Facile' ? 'var(--green)' : challenge.difficulty === 'Medio' ? 'var(--amber)' : challenge.difficulty === 'Difficile' ? 'var(--red)' : 'var(--primary)', borderColor: challenge.difficulty === 'Facile' ? 'var(--green)' : challenge.difficulty === 'Medio' ? 'var(--amber)' : challenge.difficulty === 'Difficile' ? 'var(--red)' : 'var(--primary)' }}>
              {challenge.difficulty || 'RegExp'}
            </span>
          </div>
          <div>
            <p style={{ margin: 0, color: 'var(--muted-foreground)' }}>
              Creata da @{challenge.creator?.username || `Utente #${challenge.creatorId}`}<br/>
              il {new Date(challenge.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div style={{ display: 'grid', gap: '2rem' }}>
          <div className="panel" style={{ padding: '2rem' }}>
            <h2 style={{ marginTop: 0, fontSize: '1.25rem' }}>Descrizione</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--foreground)' }}>{challenge.description}</p>
          </div>
          <div className="panel" style={{ padding: '2rem' }}>
            <h2 style={{ marginTop: 0, fontSize: '1.25rem' }}>Dati di Test (Esempi)</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ flex: '1 1 250px' }}>
                <p className="code-label" style={{ color: 'var(--green)', fontWeight: 'bold' }}>✓ Accettata (positivo)</p>
                <code style={{ display: 'block', padding: '1rem', background: '#f1f5f9', border: '2px solid var(--border)', borderRadius: '0px', color: 'var(--foreground)' }}>
                  {challenge.examplePositive}
                </code>
              </div>
              <div style={{ flex: '1 1 250px' }}>
                <p className="code-label" style={{ color: 'var(--red)', fontWeight: 'bold' }}>✗ Rifiutata (negativo)</p>
                <code style={{ display: 'block', padding: '1rem', background: '#f1f5f9', border: '2px solid var(--border)', borderRadius: '0px', color: 'var(--foreground)' }}>
                  {challenge.exampleNegative}
                </code>
              </div>
            </div>
          </div>
          {isAuthor ? (
            <div className="panel" style={{ padding: '3rem', textAlign: 'center' }}>
              <Shield size={48} color="var(--muted-foreground)" style={{ margin: '0 auto 1rem' }} />
              <h2>Sei l'autore di questa sfida</h2>
              <p>Gli autori non possono risolvere le proprie sfide.</p>
            </div>
          ) : hasSolved ? (
            <div className="panel" style={{ padding: '3rem', textAlign: 'center', background: '#d1fae5', borderColor: 'var(--green)' }}>
              <CircleCheck size={48} color="var(--green)" style={{ margin: '0 auto 1rem' }} />
              <h2 style={{ color: 'var(--green)' }}>Hai risolto la sfida!</h2>
              <p style={{ color: 'var(--green)' }}>Bravissimo, hai già completato questa sfida. Trova altri enigmi da risolvere.</p>
            </div>
          ) : (
            <div className="panel" style={{ padding: '2rem', background: '#f1f5f9' }}>
              <h2 style={{ marginTop: 0, fontSize: '1.25rem' }}>Esecuzione Regex</h2>
              <p style={{ color: 'var(--muted-foreground)' }}>Scrivi la tua soluzione. Sarà testata contro i casi pubblici e quelli nascosti.</p>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'stretch' }}>
                  <input 
                    type="text" 
                    placeholder="/tuo-pattern/i" 
                    style={{ flex: 1, padding: '1rem', border: '2px solid var(--border)', borderRadius: '0px', background: 'var(--card)', color: 'var(--foreground)', fontFamily: 'var(--font-mono)', fontSize: '1.1rem', outline: 'none' }}
                    value={regex}
                    onChange={(e) => { setRegex(e.target.value); setSubmitError(null); }} 
                    required 
                  />
                  {(hasSolved || feedback?.isSuccess) ? (
                    <button type="button" disabled className="button outline" style={{ padding: '0 2rem', borderColor: 'var(--green)', color: 'var(--green)', opacity: 1, background: '#d1fae5' }}>
                      Completata <CircleCheck size={18} style={{ marginLeft: '0.5rem' }}/>
                    </button>
                  ) : (
                    <button type="submit" className="button primary" style={{ padding: '0 2rem' }}>Esegui <Terminal size={18} style={{ marginLeft: '0.5rem' }}/></button>
                  )}
                </div>
                {submitError && <div style={{ color: 'var(--red)', fontWeight: 'bold' }}>{submitError}</div>}
              </form>
              {feedback && (
                <div style={{ marginTop: '2rem', padding: '1.5rem', border: '2px dashed var(--border)', background: 'var(--card)', borderRadius: '0px' }}>
                  <h3 style={{ marginTop: 0, color: feedback.isSuccess ? 'var(--green)' : 'var(--red)', fontSize: '1.25rem' }}>
                    {feedback.isSuccess ? 'Tentativo Corretto!' : 'Tentativo Fallito'}
                  </h3>
                  <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', fontWeight: 'bold' }}>
                    <span style={{ color: 'var(--green)' }}>✓ Positivi Matchati: {feedback.positiveMatches}</span>
                    <span style={{ color: 'var(--red)' }}>✗ Negativi Esclusi: {feedback.negativeMatches}</span>
                  </div>
                  {feedback.error && <p style={{ marginTop: '1rem', color: 'var(--red)', fontFamily: 'var(--font-mono)' }}>{feedback.error}</p>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};