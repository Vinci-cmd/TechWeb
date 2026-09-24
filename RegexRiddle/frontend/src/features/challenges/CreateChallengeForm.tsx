import { useState } from 'react';
import api from '../../core/api.service';
export const CreateChallengeForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [secretRegex, setSecretRegex] = useState('');
  const [examplePositive, setExamplePositive] = useState('');
  const [exampleNegative, setExampleNegative] = useState('');
  const [positiveChecks, setPositiveChecks] = useState('');
  const [negativeChecks, setNegativeChecks] = useState('');
  const [difficulty, setDifficulty] = useState('Facile');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    const controlPositive = positiveChecks.split('\n').map(s => s.trim()).filter(s => s);
    const controlNegative = negativeChecks.split('\n').map(s => s.trim()).filter(s => s);
    if (controlPositive.length > 10 || controlNegative.length > 10) {
      setError('Puoi fornire fino a 10 stringhe di controllo positive e 10 negative.');
      return;
    }
    try {
      await api.post('/challenges', {
        title,
        description,
        secretRegex,
        examplePositive,
        exampleNegative,
        controlPositive,
        controlNegative,
        difficulty
      });
      setMessage('Sfida creata con successo!');
      setTitle('');
      setDescription('');
      setSecretRegex('');
      setExamplePositive('');
      setExampleNegative('');
      setPositiveChecks('');
      setNegativeChecks('');
      setDifficulty('Facile');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Impossibile creare la sfida');
    }
  };
  return (
    <div className="panel form-panel">
      {message && <div style={{ color: '#34d399', marginBottom: '1rem' }}>{message}</div>}
      {error && <div style={{ color: '#f87171', marginBottom: '1rem' }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
        <div className="field">
          <label className="code-label">Titolo della sfida</label>
          <input 
            type="text" 
            placeholder="es. Validatore Email" 
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div className="field">
          <label className="code-label">Descrizione (markdown supportato)</label>
          <textarea 
            placeholder="Spiega l'obiettivo della regex..." 
            value={description}
            onChange={(e) => setDescription(e.target.value)} 
            required 
            rows={3}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="field">
            <label className="code-label" style={{color: 'var(--primary)'}}>Regex Segreta (verrà testata sui controlli)</label>
            <input 
              type="text" 
              className="mono-input"
              placeholder="es. ^[a-z]+$" 
              value={secretRegex}
              onChange={(e) => setSecretRegex(e.target.value)} 
              required 
            />
          </div>
          <div className="field">
            <label className="code-label" style={{color: 'var(--amber)'}}>Livello di Difficoltà</label>
            <select 
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="mono-input"
              style={{ padding: '0.75rem', border: '2px solid var(--border)', borderRadius: '0px' }}
            >
              <option value="Facile">Facile</option>
              <option value="Medio">Medio</option>
              <option value="Difficile">Difficile</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="field">
            <label className="code-label" style={{color: 'var(--green)'}}>Esempio Positivo (Pubblico)</label>
            <input 
              type="text" 
              className="mono-input"
              placeholder="Stringa valida" 
              value={examplePositive}
              onChange={(e) => setExamplePositive(e.target.value)} 
              required 
            />
          </div>
          <div className="field">
            <label className="code-label" style={{color: 'var(--red)'}}>Esempio Negativo (Pubblico)</label>
            <input 
              type="text" 
              className="mono-input"
              placeholder="Stringa invalida" 
              value={exampleNegative}
              onChange={(e) => setExampleNegative(e.target.value)} 
              required 
            />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="field">
            <label className="code-label">Controlli Positivi Segreti (1 x riga, max 10)</label>
            <textarea 
              className="mono-input"
              placeholder="Stringhe che LA TUA REGEX SEGRETA accetta" 
              value={positiveChecks}
              onChange={(e) => setPositiveChecks(e.target.value)} 
              required 
              rows={4}
            />
          </div>
          <div className="field">
            <label className="code-label">Controlli Negativi Segreti (1 x riga, max 10)</label>
            <textarea 
              className="mono-input"
              placeholder="Stringhe che LA TUA REGEX SEGRETA rifiuta" 
              value={negativeChecks}
              onChange={(e) => setNegativeChecks(e.target.value)} 
              required 
              rows={4}
            />
          </div>
        </div>
        <button type="submit" className="button primary large" style={{marginTop: '1rem'}}>Pubblica Sfida</button>
      </form>
    </div>
  );
};