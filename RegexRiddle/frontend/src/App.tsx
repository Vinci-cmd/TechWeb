import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './core/AuthContext';
import { ProtectedRoute } from './core/ProtectedRoute';
import { LoginForm } from './features/auth/LoginForm';
import { RegisterForm } from './features/auth/RegisterForm';
import { CreateChallengeForm } from './features/challenges/CreateChallengeForm';
import { ChallengeList } from './features/challenges/ChallengeList';
import { ChallengeSolve } from './features/challenges/ChallengeSolve';
import { LeaderboardPage } from './features/leaderboard/LeaderboardPage';
import { ProfilePage } from './features/profile/ProfilePage';
import { LandingPage, HowItWorks } from './core/PublicPages';
import { Terminal, LogIn, LogOut, UserPlus } from 'lucide-react';
const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  return (
    <header className="top-nav">
      <nav aria-label="Navigazione principale" className="top-nav-inner">
        <div className="brand-cluster">
          <Link to="/" aria-label="RegexRiddle" className="brand-link">
            <span className="brand-icon">
              <Terminal size={16} />
            </span>
            <span className="brand-text">
              <span className="brand-regex">REGEX</span>
              <span className="brand-riddle">RIDDLE</span>
            </span>
          </Link>
        </div>
        <div className="nav-links">
          {isAuthenticated && (
            <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
              Sfide
            </Link>
          )}
          <Link to="/leaderboard" className={location.pathname === '/leaderboard' ? 'active' : ''}>
            Leaderboard
          </Link>
          <Link to="/how-it-works" className={location.pathname === '/how-it-works' ? 'active' : ''}>
            Documentazione
          </Link>
        </div>
        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <Link aria-label="Profilo" className="user-chip" to="/profile">
                {user?.avatar ? (
                  <img src={user.avatar} className="avatar" width="30" height="30" alt="avatar" />
                ) : (
                  <div className="avatar" style={{width: 30, height: 30, backgroundColor: 'var(--primary)'}}>
                    {user?.username?.[0]?.toUpperCase()}
                  </div>
                )}
                <span>
                  <strong>@{user?.username}</strong>
                </span>
              </Link>
              <button aria-label="Esci" className="icon-button" onClick={logout} type="button">
                <LogOut size={17} />
              </button>
            </>
          ) : (
            <>
              <Link className="nav-auth" to="/login">
                <LogIn size={14} /> Accedi
              </Link>
              <Link className="button primary small" to="/register">
                <UserPlus size={14} /> Registrati
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
const Dashboard = () => {
  return (
    <div className="page" style={{ padding: '2rem 1rem' }}>
      <div className="page-title-row" style={{ maxWidth: '80rem', margin: '0 auto', marginBottom: '2rem' }}>
        <div>
          <h1>Le Sfide</h1>
          <p>Mettiti alla prova risolvendo le regex create dagli altri giocatori.</p>
        </div>
        <Link to="/create" className="button primary small">
          <Terminal size={14} /> Crea nuova sfida
        </Link>
      </div>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <ChallengeList />
      </div>
    </div>
  );
};
const CreateChallengePage = () => {
  return (
    <div className="page" style={{ padding: '2rem 1rem' }}>
      <div className="page-title-row" style={{ maxWidth: '40rem', margin: '0 auto', marginBottom: '2rem' }}>
        <div>
          <h1>Crea una nuova sfida</h1>
          <p>Metti alla prova gli altri giocatori con il tuo enigma Regex.</p>
        </div>
        <Link to="/dashboard" className="button outline small">
          Annulla
        </Link>
      </div>
      <div style={{ maxWidth: '40rem', margin: '0 auto' }}>
        <CreateChallengeForm />
      </div>
    </div>
  );
};
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Navbar />
          <main id="main-content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create" element={<CreateChallengePage />} />
                <Route path="/challenge/:id" element={<ChallengeSolve />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}