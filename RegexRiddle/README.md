# RegexRiddle 🧩

Un'applicazione web interattiva per imparare, creare e sfidarsi a colpi di Espressioni Regolari (Regex). Costruita per essere rapida, reattiva e sicura.

## Stack Tecnologico 🚀

### Back-end
- **Node.js** con **TypeScript**
- **Fastify** (Web framework veloce)
- **Prisma** (ORM tipizzato)
- **PostgreSQL** (Database Relazionale)
- **Argon2id** (Hashing sicuro delle password)
- **RE2-WASM** (Motore Regex protetto da ReDoS)

### Front-end
- **React** (Libreria UI) + **TypeScript**
- **Vite** (Build tool e dev server)
- **SASS/SCSS** (Stilizzazione e Responsive Design)
- **React Router** (Routing Single Page Application)
- **Lucide React** (Icone)

### DevOps & Testing
- **Docker & Docker Compose** (Containerizzazione)
- **Playwright** (10 Test End-to-End per Desktop e Mobile)

---

## 1. Requisiti di Sistema

Assicurarsi di avere installato:
- Node.js `>= 20.0.0`
- pnpm `>= 9.0.0`
- PostgreSQL (se si avvia in locale)
- Docker Desktop (per l'avvio containerizzato)

---

## 2. Installazione delle Dipendenze

Aprire PowerShell (o il terminale) nella directory principale `RegexRiddle` ed eseguire:

```bash
pnpm install
```
*Questo installerà le dipendenze per l'intero monorepo (backend, frontend, e2e).*

---

## 3. Account Dimostrativi 👤

Tutti gli account pre-generati dal database seed (utili per provare le sfide e la dashboard) utilizzano la seguente password:

| Username | Password |
| :--- | :--- |
| `marco_verdi` | `Password123!` |
| `giulia_neri` | `Password123!` |
| `alessandro_russo` | `Password123!` |

---

## 4. Avvio con Docker Compose (Raccomandato) 🐳

Il metodo più veloce e sicuro per lanciare l'intera applicazione in un ambiente isolato (Database, Backend e Frontend inclusi).

Assicurarsi che Docker sia attivo. Dalla root del progetto, lanciare:
```bash
docker-compose up --build -d
```
Al primo avvio, il backend eseguirà in automatico le migrazioni e popolerà i dati dimostrativi (`start.sh`).

L'applicazione completa sarà navigabile su:
```text
http://localhost:80
```

Per visualizzare lo stato dei container:
```bash
docker-compose ps
```

Per spegnere e pulire lo stack:
```bash
docker-compose down
```

---

## 5. Avvio in Locale 💻

Se si preferisce avviare i servizi manualmente senza Docker:

### A. Preparazione Database
Creare o modificare il file `.env` nella cartella `backend` per puntare al proprio database PostgreSQL locale:
```env
DATABASE_URL="postgresql://postgres:1234@localhost:5432/regexriddle?schema=public"
```
*(Sostituire credenziali e porta con le proprie).*

Aprire il terminale nella directory `backend/` ed eseguire:
```bash
pnpm prisma db push
pnpm prisma db seed
```
*(Questo genererà le tabelle e popolerà gli account dimostrativi e le prime sfide).*

### B. Avvio Servizi
Aprire due terminali separati.

**Terminale 1 (Back-end):**
```bash
cd backend
pnpm run dev
```
Il server Fastify risponderà su `http://localhost:3001`

**Terminale 2 (Front-end):**
```bash
cd frontend
pnpm run dev
```
L'app React sarà visibile su `http://localhost:5173`

---

## 6. Testing E2E (Playwright) 🧪

Il progetto include una suite completa di **10 test End-to-End** che validano l'interfaccia, i form e il routing sia in ambiente Desktop che Mobile.

Per avviarli, assicurarsi che il backend e il frontend siano in esecuzione su localhost , quindi aprire un terminale in `e2e/`:

```bash
cd e2e
pnpm exec playwright install
pnpm test
```

---

## 7. Risoluzione dei Problemi 🛠️

- **Errore "Impossibile aggiornare Avatar" o schermata bianca:** Assicurarsi che le regole CORS del backend consentano la richiesta. Il backend è configurato per accettare chiamate da `localhost:5173`.
- **Database non raggiungibile:** Se si usa Docker, verificare che la porta `5432` non sia già occupata da un'installazione locale di PostgreSQL.
- **Porte occupate:** Il progetto utilizza di default la porta `5173` per il frontend in dev, `3001` per il backend e `80` per l'istanza Docker.
