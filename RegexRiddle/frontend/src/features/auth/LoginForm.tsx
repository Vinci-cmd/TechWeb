import { useState } from 'react';
import { useAuth } from '../../core/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

import api from '../../core/api.service';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { username, password });
      login(res.data.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Errore di login');
    }
  };

  return (
    <section className="page" style={{ maxWidth: '400px', margin: '2rem auto', padding: '0 1rem' }}>
      <div className="panel" style={{ padding: '2rem' }}>
        <div className="auth-head" style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginTop: 0 }}>Accedi</h1>
        </div>
        
        {error && <div className="feedback-error" style={{ marginBottom: '1.5rem', padding: '0.75rem', background: 'var(--red)', color: 'white', fontWeight: 'bold', border: '2px solid black' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
          <div className="field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="code-label" style={{ fontWeight: 'bold' }}>Username</label>
            <input 
              type="text" 
              placeholder="Il tuo username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              required 
              style={{ border: '2px solid var(--border)', borderRadius: '0px', padding: '0.75rem', fontSize: '1rem', background: 'var(--card)', outline: 'none', width: '100%' }}
            />
          </div>

          <div className="field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="code-label" style={{ fontWeight: 'bold' }}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ border: '2px solid var(--border)', borderRadius: '0px', padding: '0.75rem', fontSize: '1rem', background: 'var(--card)', outline: 'none', width: '100%' }}
            />
          </div>

          <button type="submit" className="button primary" style={{ width: '100%', padding: '1rem', marginTop: '0.5rem', fontSize: '1.1rem' }}>Accedi</button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          Non hai un account? <Link to="/register" style={{ fontWeight: 'bold' }}>Registrati qui</Link>
        </p>
      </div>
    </section>
  );
};
