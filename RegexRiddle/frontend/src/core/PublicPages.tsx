import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { ChevronRight, CircleCheck, FlaskConical, Terminal, Trophy } from 'lucide-react';
export const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="page">
      <section className="hero-section">
        <div className="hero-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center', textAlign: 'left', maxWidth: '75rem' }}>
          <div className="motion-in">
            <h1 className="hero-title" aria-label="REGEX RIDDLE" style={{ fontSize: '4.5rem', textAlign: 'left', marginBottom: '1.5rem', lineHeight: 1 }}>
              <span aria-hidden="true" className="gradient-regex">REGEX</span>
              <br />
              <span aria-hidden="true" className="gradient-riddle">RIDDLE</span>
            </h1>
            <p className="hero-copy" style={{ marginLeft: 0, fontSize: '1.25rem', color: 'var(--foreground)', fontWeight: 500 }}>
              Metti alla prova la tua logica. Decifra i pattern, supera i test e scala le classifiche dei programmatori.
            </p>
            <div className="hero-actions" style={{ justifyContent: 'flex-start', marginTop: '2rem' }}>
              <Link
                className="button primary large"
                to={isAuthenticated ? '/dashboard' : '/register'}
              >
                {isAuthenticated ? "Accedi alle Sfide" : "Inizia la Risoluzione"}
                <ChevronRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div
            aria-label="Anteprima sfida RegexRiddle"
            className="terminal-demo challenge-preview motion-in delayed"
            style={{ margin: 0, transform: 'rotate(1deg)' }}
          >
            <div className="terminal-body challenge-preview-body">
              <div className="preview-title-row">
                <div>
                  <p className="code-label"># SFIDA DEL GIORNO</p>
                  <h2 className="preview-challenge-title">
                    Solo un saluto
                  </h2>
                </div>
                <span className="diff medium" style={{ background: 'var(--card)', color: 'var(--green)', borderColor: 'var(--green)' }}>Facile</span>
              </div>
              <div
                className="preview-example-grid"
                aria-label="Esempi pubblici della sfida"
              >
                <div className="demo-string preview-example">
                  <span className="preview-example-label">✓ Accettata</span>
                  <code>ciao a tutti</code>
                </div>
                <div className="demo-string preview-example">
                  <span className="preview-example-label">✗ Rifiutata</span>
                  <code>buongiorno a tutti</code>
                </div>
              </div>
              <div>
                <p className="code-label">&gt; Inserisci la tua soluzione</p>
                <code className="code-chip">
                  /ciao/i
                </code>
              </div>
              <div className="success-line preview-feedback">
                <CircleCheck size={16} aria-hidden="true" />
                <span>Analisi completata: 10/10 casi positivi superati!</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="content-section feature-section" style={{ maxWidth: '65rem', margin: '0 auto', paddingBottom: '6rem', padding: '0 1rem 6rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', borderBottom: '2px solid var(--border)', paddingBottom: '1rem' }}>Tre regole, infinite possibilità</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <article className="feature-card motion-in" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '4rem', height: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--border)', background: 'var(--primary)', color: 'var(--primary-foreground)' }}>
              <Terminal size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', margin: '0' }}>Progetta Enigmi</h3>
            <p style={{ margin: 0, fontSize: '1.1rem', color: 'var(--foreground)' }}>
              Scrivi una regex inespugnabile, nascondi i casi limite e sfida la community a indovinare il pattern segreto.
            </p>
          </article>
          <article className="feature-card motion-in" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '4rem', height: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--border)', background: 'var(--green)', color: 'var(--primary-foreground)' }}>
              <FlaskConical size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', margin: '0' }}>Risolvi e Impara</h3>
            <p style={{ margin: 0, fontSize: '1.1rem', color: 'var(--foreground)' }}>
              Testa le tue deduzioni. Ottieni feedback immediati (es. "7 casi positivi") per correggere il tiro ad ogni step.
            </p>
          </article>
          <article className="feature-card motion-in" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '4rem', height: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--border)', background: 'var(--amber)', color: 'var(--foreground)' }}>
              <Trophy size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', margin: '0' }}>Diventa il Migliore</h3>
            <p style={{ margin: 0, fontSize: '1.1rem', color: 'var(--foreground)' }}>
              Più sei preciso, più scali la classifica globale. Solo chi usa il minor numero di tentativi conquista la vetta!
            </p>
          </article>
        </div>
      </section>
    </div>
  );
};
export const HowItWorks = () => (
  <div className="page" style={{ padding: '4rem 1rem' }}>
    <div style={{ maxWidth: '50rem', margin: '0 auto' }}>
      <div className="form-heading" style={{ textAlign: 'left', marginBottom: '4rem', borderBottom: '2px solid var(--border)', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '3rem', margin: '0 0 0.5rem 0' }}>Documentazione</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--foreground)', margin: 0 }}>La guida completa al gameplay di Regex Riddle</p>
      </div>
      <div className="timeline-container">
        {[
          {
            step: '01',
            title: "L'autore crea un enigma",
            desc: "L'autore scrive una regex segreta, inserisce un esempio positivo visibile e un esempio negativo visibile. Poi aggiunge da 1 a 10 controlli positivi e da 1 a 10 controlli negativi nascosti.",
            sub: "Le stringhe di controllo restano nascoste. I giocatori vedono solo i due esempi pubblici."
          },
          {
            step: '02',
            title: "Gli altri vedono solo esempi",
            desc: "Chi gioca vede titolo, descrizione, un esempio accettato e un esempio rifiutato. La regex originale e tutti i controlli restano fuori dal client.",
            sub: "La sfida consiste nel dedurre il pattern completo partendo da informazioni limitate."
          },
          {
            step: '03',
            title: "Invia una regex",
            desc: "Il solver invia una regex candidata. Il sistema la esegue contro i controlli nascosti e calcola solo i conteggi aggregati.",
            sub: "Puoi fare più tentativi: ogni proposta viene validata dal server."
          },
          {
            step: '04',
            title: "Leggi il feedback",
            desc: "Dopo ogni tentativo scopri quante stringhe positive hai accettato e quante negative hai correttamente escluso. Non vedi quali stringhe sono fallite.",
            sub: "I conteggi aggregati aiutano a restringere il pattern senza rivelare le stringhe segrete."
          },
          {
            step: '05',
            title: "Vinci con meno tentativi",
            desc: "Una sfida è risolta quando accetti il 100% dei controlli positivi e rifiuti il 100% dei negativi. A parità di enigmi risolti, conta la media tentativi più bassa.",
            sub: "Risolvere con pochi tentativi migliora il piazzamento in classifica."
          }
        ].map((item, i) => (
          <div key={i} className="timeline-item" style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            <div className="timeline-number" style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--border)', minWidth: '4rem' }}>
              {item.step}
            </div>
            <div className="panel" style={{ flex: '1 1 300px', padding: '2rem' }}>
              <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem', color: 'var(--foreground)' }}>{item.title}</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--foreground)', margin: '0 0 1rem 0' }}>{item.desc}</p>
              <div style={{ padding: '1rem', background: '#f1f5f9', border: '2px dashed var(--border)' }}>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--foreground)', fontWeight: 'bold' }}>✓ {item.sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);