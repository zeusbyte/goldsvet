import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  Coins,
  Database,
  Play,
  RefreshCw,
  ScrollText,
  ShieldCheck,
  UserCog,
  Wallet
} from 'lucide-react';
import './styles.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const AUTH_HEADER = { Authorization: 'Bearer dev-demo-token' };
const ADMIN_HEADER = { 'X-Admin-Token': 'dev-admin-token' };

async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'api_error');
  }

  return data;
}

function formatCurrency(value, currency = 'EUR') {
  return new Intl.NumberFormat('sk-SK', {
    style: 'currency',
    currency
  }).format(Number(value || 0));
}

function shortId(value) {
  if (!value) return '-';
  return value.length > 14 ? `${value.slice(0, 7)}...${value.slice(-4)}` : value;
}

function formatDate(value) {
  if (!value) return '-';
  return new Intl.DateTimeFormat('sk-SK', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(new Date(value));
}

function App() {
  const [health, setHealth] = useState(null);
  const [games, setGames] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [session, setSession] = useState(null);
  const [round, setRound] = useState(null);
  const [selectedGameId, setSelectedGameId] = useState('gold-777');
  const [stake, setStake] = useState(2);
  const [admin, setAdmin] = useState({
    dashboard: null,
    ledger: [],
    events: [],
    audit: []
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const selectedGame = useMemo(
    () => games.find((game) => game.id === selectedGameId) || games[0],
    [games, selectedGameId]
  );

  async function refreshAdmin() {
    const [dashboard, ledger, events, audit] = await Promise.all([
      apiFetch('/admin/dashboard', { headers: ADMIN_HEADER }),
      apiFetch('/admin/ledger?limit=6', { headers: ADMIN_HEADER }),
      apiFetch('/admin/provider-events?limit=6', { headers: ADMIN_HEADER }),
      apiFetch('/admin/audit-logs?limit=6', { headers: ADMIN_HEADER })
    ]);

    setAdmin({ dashboard, ledger, events, audit });
  }

  async function refresh() {
    setError('');
    setLoading(true);
    try {
      const [nextHealth, nextGames, nextWallet] = await Promise.all([
        apiFetch('/health'),
        apiFetch('/games'),
        apiFetch('/wallet', { headers: AUTH_HEADER })
      ]);
      setHealth(nextHealth);
      setGames(nextGames);
      setWallet(nextWallet);
      if (!selectedGameId && nextGames[0]) {
        setSelectedGameId(nextGames[0].id);
      }
      await refreshAdmin();
    } catch (refreshError) {
      setError(refreshError.message);
    } finally {
      setLoading(false);
    }
  }

  async function launchGame(gameId) {
    setError('');
    try {
      const nextSession = await apiFetch('/game-sessions', {
        method: 'POST',
        headers: AUTH_HEADER,
        body: JSON.stringify({ gameId })
      });
      setSession(nextSession);
      setSelectedGameId(gameId);
    } catch (launchError) {
      setError(launchError.message);
    }
  }

  async function playRound() {
    if (!selectedGame) return;

    setError('');
    try {
      const result = await apiFetch('/fake-provider/round', {
        method: 'POST',
        headers: AUTH_HEADER,
        body: JSON.stringify({
          gameId: selectedGame.id,
          sessionId: session?.id,
          stake
        })
      });
      setRound(result);
      setWallet(result.wallet);
      await refreshAdmin();
    } catch (roundError) {
      setError(roundError.message);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <main className="shell">
      <section className="hero">
        <div className="heroCopy">
          <p className="eyebrow">Docker casino shell</p>
          <h1>Goldsvet</h1>
          <div className="statusRow" aria-label="Service status">
            <span className={health?.status === 'healthy' ? 'dot isOk' : 'dot'} />
            <span>{health?.status || 'loading'}</span>
          </div>
        </div>
        <img className="heroImage" src="/slot.png" alt="Goldsvet slot preview" />
      </section>

      <section className="metrics">
        <article>
          <Wallet size={20} />
          <span>Cash</span>
          <strong>{formatCurrency(wallet?.cash_balance, wallet?.currency)}</strong>
        </article>
        <article>
          <Coins size={20} />
          <span>Bonus</span>
          <strong>{formatCurrency(wallet?.bonus_balance, wallet?.currency)}</strong>
        </article>
        <article>
          <Activity size={20} />
          <span>Games</span>
          <strong>{games.length}</strong>
        </article>
        <article>
          <ShieldCheck size={20} />
          <span>KYC</span>
          <strong>Demo</strong>
        </article>
      </section>

      {error ? <div className="alert">{error}</div> : null}

      <section className="workspace">
        <div className="lobby">
          <div className="sectionHeader">
            <div>
              <p className="eyebrow">Lobby</p>
              <h2>Games</h2>
            </div>
            <button className="iconButton" type="button" onClick={refresh} disabled={loading}>
              <RefreshCw size={18} />
              <span>Refresh</span>
            </button>
          </div>

          <div className="gameGrid">
            {games.map((game) => (
              <article
                className={game.id === selectedGame?.id ? 'gameCard isSelected' : 'gameCard'}
                key={game.id}
              >
                <img src={game.image_url || '/slot.png'} alt="" />
                <div>
                  <p>{game.category}</p>
                  <h3>{game.name}</h3>
                  <span>{game.provider}</span>
                </div>
                <footer>
                  <strong>{game.rtp}% RTP</strong>
                  <button type="button" onClick={() => launchGame(game.id)}>
                    <Play size={16} />
                    <span>Launch</span>
                  </button>
                </footer>
              </article>
            ))}
          </div>
        </div>

        <aside className="consolePanel">
          <p className="eyebrow">Fake provider</p>
          <h2>{selectedGame?.name || 'Select game'}</h2>

          <label>
            Stake
            <input
              min="0.1"
              max="100"
              step="0.1"
              type="number"
              value={stake}
              onChange={(event) => setStake(Number(event.target.value))}
            />
          </label>

          <button className="primaryButton" type="button" onClick={playRound} disabled={!selectedGame}>
            <Coins size={18} />
            <span>Play Round</span>
          </button>

          <dl>
            <div>
              <dt>Session</dt>
              <dd>{session?.id || 'not launched'}</dd>
            </div>
            <div>
              <dt>Last win</dt>
              <dd>{round ? formatCurrency(round.win, wallet?.currency) : '-'}</dd>
            </div>
            <div>
              <dt>Multiplier</dt>
              <dd>{round ? `${round.multiplier}x` : '-'}</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="adminWorkspace">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Admin</p>
            <h2>Control Room</h2>
          </div>
          <button className="iconButton" type="button" onClick={refreshAdmin}>
            <RefreshCw size={18} />
            <span>Reload Admin</span>
          </button>
        </div>

        <div className="adminMetrics">
          <article>
            <UserCog size={18} />
            <span>Users</span>
            <strong>{admin.dashboard?.users ?? '-'}</strong>
          </article>
          <article>
            <Wallet size={18} />
            <span>Total Cash</span>
            <strong>{formatCurrency(admin.dashboard?.wallets?.cashTotal)}</strong>
          </article>
          <article>
            <Database size={18} />
            <span>Ledger Entries</span>
            <strong>{admin.dashboard?.ledger?.entries ?? '-'}</strong>
          </article>
          <article>
            <ScrollText size={18} />
            <span>Audit Logs</span>
            <strong>{admin.dashboard?.auditLogs ?? '-'}</strong>
          </article>
        </div>

        <div className="adminTables">
          <article className="dataPanel">
            <h3>Ledger</h3>
            <div className="tableShell">
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Ref</th>
                  </tr>
                </thead>
                <tbody>
                  {admin.ledger.map((entry) => (
                    <tr key={entry.id}>
                      <td>{formatDate(entry.created_at)}</td>
                      <td>{entry.type}</td>
                      <td>{formatCurrency(entry.amount, entry.currency)}</td>
                      <td>{shortId(entry.reference)}</td>
                    </tr>
                  ))}
                  {admin.ledger.length === 0 ? (
                    <tr>
                      <td colSpan="4">No ledger rows yet</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </article>

          <article className="dataPanel">
            <h3>Provider Events</h3>
            <div className="tableShell">
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Event</th>
                    <th>Status</th>
                    <th>Tx</th>
                  </tr>
                </thead>
                <tbody>
                  {admin.events.map((event) => (
                    <tr key={event.id}>
                      <td>{formatDate(event.created_at)}</td>
                      <td>{event.event_type}</td>
                      <td>{event.status}</td>
                      <td>{shortId(event.transaction_id)}</td>
                    </tr>
                  ))}
                  {admin.events.length === 0 ? (
                    <tr>
                      <td colSpan="4">No provider events yet</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </article>

          <article className="dataPanel">
            <h3>Audit</h3>
            <div className="tableShell">
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Admin</th>
                    <th>Action</th>
                    <th>Target</th>
                  </tr>
                </thead>
                <tbody>
                  {admin.audit.map((audit) => (
                    <tr key={audit.id}>
                      <td>{formatDate(audit.created_at)}</td>
                      <td>{audit.admin_email}</td>
                      <td>{audit.action}</td>
                      <td>{shortId(audit.target_id)}</td>
                    </tr>
                  ))}
                  {admin.audit.length === 0 ? (
                    <tr>
                      <td colSpan="4">No audit rows yet</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
