import os

path = 'frontend/src/features/challenges/ChallengeSolve.tsx'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

target = """<form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', alignItems: 'stretch' }}>
                <input 
                  type="text" 
                  placeholder="/tuo-pattern/i" 
                  style={{ flex: 1, padding: '1rem', border: '2px solid var(--border)', borderRadius: '0px', background: 'var(--card)', color: 'var(--foreground)', fontFamily: 'var(--font-mono)', fontSize: '1.1rem', outline: 'none' }}
                  value={regex}
                  onChange={(e) => setRegex(e.target.value)} 
                  required 
                />
                <button type="submit" className="button primary" style={{ padding: '0 2rem' }}>Esegui <Terminal size={18}/></button>
              </form>"""

replacement = """<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1.5rem' }}>
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
              </form>"""

c = c.replace(target, replacement)

with open(path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(c)
