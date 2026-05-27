const crypto = require('node:crypto');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const Redis = require('ioredis');
const pinoHttp = require('pino-http');
const { Pool } = require('pg');
const { z } = require('zod');

const config = {
  port: Number(process.env.PORT || 3000),
  databaseUrl:
    process.env.DATABASE_URL ||
    'postgres://goldsvet:goldsvet_dev_password@localhost:5432/goldsvet',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:8080',
  providerWebhookSecret: process.env.PROVIDER_WEBHOOK_SECRET || 'dev-provider-secret',
  adminToken: process.env.ADMIN_TOKEN || 'dev-admin-token'
};

const DEMO_USER_ID = 'demo-user';
const DEMO_WALLET_ID = 'demo-wallet';
const DEMO_TOKEN = 'dev-demo-token';

const pool = new Pool({
  connectionString: config.databaseUrl,
  max: 10,
  idleTimeoutMillis: 30000
});

const redis = new Redis(config.redisUrl, {
  lazyConnect: true,
  maxRetriesPerRequest: 2
});

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true
  })
);
app.use(
  express.json({
    limit: '1mb',
    verify: (req, res, buffer) => {
      req.rawBody = buffer.toString('utf8');
    }
  })
);
app.use(
  pinoHttp({
    redact: ['req.headers.authorization', 'req.headers["x-admin-token"]']
  })
);

function asyncRoute(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

function toMoney(value) {
  return Number(Number(value).toFixed(2));
}

function timingSafeEqualString(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function requireProviderSignature(req, res, next) {
  const signature = req.get('x-provider-signature') || '';
  const timestamp = req.get('x-provider-timestamp') || '';
  const timestampMs = Number(timestamp) * 1000;
  const maxSkewMs = 5 * 60 * 1000;

  if (!signature.startsWith('sha256=') || !timestamp || Number.isNaN(timestampMs)) {
    return res.status(401).json({ error: 'missing_provider_signature' });
  }

  if (Math.abs(Date.now() - timestampMs) > maxSkewMs) {
    return res.status(401).json({ error: 'stale_provider_signature' });
  }

  const expected =
    'sha256=' +
    crypto
      .createHmac('sha256', config.providerWebhookSecret)
      .update(`${timestamp}.${req.rawBody || ''}`)
      .digest('hex');

  if (!timingSafeEqualString(signature, expected)) {
    return res.status(401).json({ error: 'invalid_provider_signature' });
  }

  return next();
}

function requireDemoUser(req, res, next) {
  const header = req.get('authorization') || '';
  if (header && header !== `Bearer ${DEMO_TOKEN}`) {
    return res.status(401).json({ error: 'invalid_demo_token' });
  }
  req.user = { id: DEMO_USER_ID };
  return next();
}

function requireAdmin(req, res, next) {
  const token = req.get('x-admin-token') || '';

  if (!token || !timingSafeEqualString(token, config.adminToken)) {
    return res.status(401).json({ error: 'invalid_admin_token' });
  }

  req.admin = {
    id: 'dev-admin',
    email: 'admin@goldsvet.local',
    role: 'superadmin'
  };

  return next();
}

async function initSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      display_name TEXT NOT NULL,
      kyc_status TEXT NOT NULL DEFAULT 'demo',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS wallets (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      currency TEXT NOT NULL,
      cash_balance NUMERIC(14, 2) NOT NULL DEFAULT 0,
      bonus_balance NUMERIC(14, 2) NOT NULL DEFAULT 0,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE (user_id, currency)
    );

    CREATE TABLE IF NOT EXISTS games (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      provider TEXT NOT NULL,
      category TEXT NOT NULL,
      rtp NUMERIC(5, 2) NOT NULL,
      enabled BOOLEAN NOT NULL DEFAULT true,
      image_url TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS game_sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      game_id TEXT NOT NULL REFERENCES games(id),
      status TEXT NOT NULL DEFAULT 'active',
      launch_url TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS game_rounds (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      game_id TEXT NOT NULL REFERENCES games(id),
      session_id TEXT REFERENCES game_sessions(id),
      stake NUMERIC(14, 2) NOT NULL,
      win NUMERIC(14, 2) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS ledger_entries (
      id TEXT PRIMARY KEY,
      wallet_id TEXT NOT NULL REFERENCES wallets(id),
      user_id TEXT NOT NULL REFERENCES users(id),
      amount NUMERIC(14, 2) NOT NULL,
      currency TEXT NOT NULL,
      type TEXT NOT NULL,
      reference TEXT NOT NULL,
      idempotency_key TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS provider_events (
      id TEXT PRIMARY KEY,
      provider TEXT NOT NULL,
      event_type TEXT NOT NULL,
      transaction_id TEXT NOT NULL UNIQUE,
      round_id TEXT,
      request_body JSONB NOT NULL,
      response_body JSONB,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      display_name TEXT NOT NULL,
      role TEXT NOT NULL,
      active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS admin_audit_logs (
      id TEXT PRIMARY KEY,
      admin_id TEXT NOT NULL REFERENCES admin_users(id),
      action TEXT NOT NULL,
      target_type TEXT NOT NULL,
      target_id TEXT NOT NULL,
      metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);

  await pool.query(
    `
      INSERT INTO users (id, email, display_name, kyc_status)
      VALUES ($1, 'demo@goldsvet.local', 'Demo Player', 'demo')
      ON CONFLICT (id) DO NOTHING
    `,
    [DEMO_USER_ID]
  );

  await pool.query(
    `
      INSERT INTO wallets (id, user_id, currency, cash_balance, bonus_balance)
      VALUES ($1, $2, 'EUR', 1000.00, 50.00)
      ON CONFLICT (id) DO NOTHING
    `,
    [DEMO_WALLET_ID, DEMO_USER_ID]
  );

  await pool.query(
    `
      INSERT INTO admin_users (id, email, display_name, role)
      VALUES ('dev-admin', 'admin@goldsvet.local', 'Dev Admin', 'superadmin')
      ON CONFLICT (id)
      DO UPDATE SET
        email = EXCLUDED.email,
        display_name = EXCLUDED.display_name,
        role = EXCLUDED.role,
        active = true
    `
  );

  const games = [
    ['gold-777', 'Gold 777', 'FakeProvider', 'Slots', 96.2, '/slot.png'],
    ['bratislava-live', 'Bratislava Live', 'FakeProvider', 'Live Casino', 98.1, '/slot.png'],
    ['rocket-dice', 'Rocket Dice', 'FakeProvider', 'Crash', 97.0, '/slot.png'],
    ['classic-roulette', 'Classic Roulette', 'FakeProvider', 'Table Games', 97.3, '/slot.png']
  ];

  for (const game of games) {
    await pool.query(
      `
        INSERT INTO games (id, name, provider, category, rtp, image_url)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (id)
        DO UPDATE SET
          name = EXCLUDED.name,
          provider = EXCLUDED.provider,
          category = EXCLUDED.category,
          rtp = EXCLUDED.rtp,
          image_url = EXCLUDED.image_url,
          enabled = true
      `,
      game
    );
  }
}

async function readWallet(client = pool) {
  const result = await client.query(
    `
      SELECT id, user_id, currency, cash_balance, bonus_balance, updated_at
      FROM wallets
      WHERE user_id = $1 AND currency = 'EUR'
    `,
    [DEMO_USER_ID]
  );

  const wallet = result.rows[0];
  return {
    ...wallet,
    cash_balance: toMoney(wallet.cash_balance),
    bonus_balance: toMoney(wallet.bonus_balance)
  };
}

async function readWalletByUser(client, userId, currency = 'EUR') {
  const result = await client.query(
    `
      SELECT id, user_id, currency, cash_balance, bonus_balance, updated_at
      FROM wallets
      WHERE user_id = $1 AND currency = $2
    `,
    [userId, currency]
  );

  const wallet = result.rows[0];
  if (!wallet) {
    return null;
  }

  return {
    ...wallet,
    cash_balance: toMoney(wallet.cash_balance),
    bonus_balance: toMoney(wallet.bonus_balance)
  };
}

async function lockWallet(client, userId, currency = 'EUR') {
  const result = await client.query(
    `
      SELECT id, user_id, currency, cash_balance, bonus_balance
      FROM wallets
      WHERE user_id = $1 AND currency = $2
      FOR UPDATE
    `,
    [userId, currency]
  );

  return result.rows[0] || null;
}

async function applyWalletDelta(client, wallet, amount, type, reference, idempotencyKey) {
  const delta = toMoney(amount);
  const currentBalance = toMoney(wallet.cash_balance);
  const nextBalance = toMoney(currentBalance + delta);

  if (nextBalance < 0) {
    return { ok: false, error: 'insufficient_funds', balance: currentBalance };
  }

  await client.query(
    `
      UPDATE wallets
      SET cash_balance = $1, updated_at = now()
      WHERE id = $2
    `,
    [nextBalance, wallet.id]
  );

  await client.query(
    `
      INSERT INTO ledger_entries
        (id, wallet_id, user_id, amount, currency, type, reference, idempotency_key)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `,
    [
      crypto.randomUUID(),
      wallet.id,
      wallet.user_id,
      delta,
      wallet.currency,
      type,
      reference,
      idempotencyKey
    ]
  );

  return { ok: true, balance: nextBalance };
}

async function beginProviderEvent(client, { eventType, transactionId, roundId, body }) {
  const insert = await client.query(
    `
      INSERT INTO provider_events
        (id, provider, event_type, transaction_id, round_id, request_body)
      VALUES ($1, 'FakeProvider', $2, $3, $4, $5)
      ON CONFLICT (transaction_id) DO NOTHING
      RETURNING id
    `,
    [crypto.randomUUID(), eventType, transactionId, roundId || null, JSON.stringify(body)]
  );

  if (insert.rowCount === 1) {
    return { replay: false };
  }

  const existing = await client.query(
    `
      SELECT response_body, status
      FROM provider_events
      WHERE transaction_id = $1
    `,
    [transactionId]
  );

  return {
    replay: true,
    status: existing.rows[0]?.status,
    response: existing.rows[0]?.response_body
  };
}

async function completeProviderEvent(client, transactionId, status, response) {
  await client.query(
    `
      UPDATE provider_events
      SET status = $2, response_body = $3, updated_at = now()
      WHERE transaction_id = $1
    `,
    [transactionId, status, JSON.stringify(response)]
  );
}

async function writeAdminAudit(client, { adminId, action, targetType, targetId, metadata = {} }) {
  const auditId = crypto.randomUUID();
  await client.query(
    `
      INSERT INTO admin_audit_logs
        (id, admin_id, action, target_type, target_id, metadata)
      VALUES ($1, $2, $3, $4, $5, $6)
    `,
    [auditId, adminId, action, targetType, targetId, JSON.stringify(metadata)]
  );
  return auditId;
}

function sendProviderReplay(res, event) {
  return res
    .status(event.status === 'completed' ? 200 : 409)
    .set('x-idempotent-replay', 'true')
    .json(event.response || { status: event.status || 'pending' });
}

function providerCallbackSchema(kind) {
  const money = z.coerce.number().positive().max(100000).transform(toMoney);
  const base = {
    transactionId: z.string().min(6).max(128),
    userId: z.string().min(1).default(DEMO_USER_ID),
    currency: z.string().length(3).default('EUR')
  };

  if (kind === 'balance') {
    return z.object({
      userId: z.string().min(1).default(DEMO_USER_ID),
      currency: z.string().length(3).default('EUR')
    });
  }

  if (kind === 'rollback') {
    return z.object({
      ...base,
      originalTransactionId: z.string().min(6).max(128),
      reason: z.string().max(200).optional()
    });
  }

  return z.object({
    ...base,
    gameId: z.string().min(1),
    roundId: z.string().min(1).max(128),
    sessionId: z.string().optional(),
    amount: money
  });
}

const adminAdjustmentSchema = z.object({
  userId: z.string().min(1).default(DEMO_USER_ID),
  currency: z.string().length(3).default('EUR'),
  amount: z.coerce
    .number()
    .min(-10000)
    .max(10000)
    .refine((value) => value !== 0, 'amount_must_not_be_zero')
    .transform(toMoney),
  reason: z.string().min(8).max(300),
  idempotencyKey: z.string().min(8).max(128).optional()
});

app.get('/', (req, res) => {
  res.json({
    name: '@goldsvet/api',
    mode: 'fake-casino-api',
    docs: [
      '/health',
      '/games',
      '/wallet',
      '/game-sessions',
      '/fake-provider/round',
      '/provider/callback/balance',
      '/provider/callback/bet',
      '/provider/callback/win',
      '/provider/callback/rollback',
      '/admin/dashboard',
      '/admin/users',
      '/admin/ledger',
      '/admin/provider-events',
      '/admin/audit-logs'
    ]
  });
});

app.get(
  '/health',
  asyncRoute(async (req, res) => {
    const checks = { db: false, redis: false };

    await pool.query('SELECT 1');
    checks.db = true;

    if (redis.status === 'wait') {
      await redis.connect();
    }
    checks.redis = (await redis.ping()) === 'PONG';

    res.json({ status: 'healthy', checks });
  })
);

app.post('/auth/login', (req, res) => {
  res.json({
    token: DEMO_TOKEN,
    user: {
      id: DEMO_USER_ID,
      email: 'demo@goldsvet.local',
      displayName: 'Demo Player',
      kycStatus: 'demo'
    }
  });
});

app.get(
  '/games',
  asyncRoute(async (req, res) => {
    const cached = await redis.get('games:enabled');
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const result = await pool.query(
      `
        SELECT id, name, provider, category, rtp, enabled, image_url
        FROM games
        WHERE enabled = true
        ORDER BY category, name
      `
    );

    const games = result.rows.map((game) => ({
      ...game,
      rtp: Number(game.rtp)
    }));

    await redis.set('games:enabled', JSON.stringify(games), 'EX', 30);
    return res.json(games);
  })
);

app.get(
  '/wallet',
  requireDemoUser,
  asyncRoute(async (req, res) => {
    res.json(await readWallet());
  })
);

app.get(
  '/ledger',
  requireDemoUser,
  asyncRoute(async (req, res) => {
    const result = await pool.query(
      `
        SELECT id, amount, currency, type, reference, created_at
        FROM ledger_entries
        WHERE user_id = $1
        ORDER BY created_at DESC
        LIMIT 25
      `,
      [DEMO_USER_ID]
    );
    res.json(result.rows.map((row) => ({ ...row, amount: toMoney(row.amount) })));
  })
);

app.post(
  '/game-sessions',
  requireDemoUser,
  asyncRoute(async (req, res) => {
    const body = z.object({ gameId: z.string().min(1) }).parse(req.body);
    const gameResult = await pool.query('SELECT id FROM games WHERE id = $1 AND enabled = true', [
      body.gameId
    ]);

    if (gameResult.rowCount === 0) {
      return res.status(404).json({ error: 'game_not_found' });
    }

    const sessionId = crypto.randomUUID();
    const launchUrl = `/fake-game?sessionId=${sessionId}&gameId=${encodeURIComponent(body.gameId)}`;

    await pool.query(
      `
        INSERT INTO game_sessions (id, user_id, game_id, launch_url)
        VALUES ($1, $2, $3, $4)
      `,
      [sessionId, DEMO_USER_ID, body.gameId, launchUrl]
    );

    res.status(201).json({
      id: sessionId,
      gameId: body.gameId,
      launchUrl,
      status: 'active'
    });
  })
);

app.post(
  '/fake-provider/round',
  requireDemoUser,
  asyncRoute(async (req, res) => {
    const body = z
      .object({
        gameId: z.string().min(1),
        sessionId: z.string().optional(),
        stake: z.coerce.number().min(0.1).max(100)
      })
      .parse(req.body);

    const client = await pool.connect();
    const roundId = crypto.randomUUID();

    try {
      await client.query('BEGIN');

      const game = await client.query('SELECT id FROM games WHERE id = $1 AND enabled = true', [
        body.gameId
      ]);
      if (game.rowCount === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({ error: 'game_not_found' });
      }

      const walletResult = await client.query(
        `
          SELECT id, cash_balance, currency
          FROM wallets
          WHERE id = $1
          FOR UPDATE
        `,
        [DEMO_WALLET_ID]
      );

      const wallet = walletResult.rows[0];
      const stake = toMoney(body.stake);
      const currentBalance = toMoney(wallet.cash_balance);

      if (currentBalance < stake) {
        await client.query('ROLLBACK');
        return res.status(409).json({ error: 'insufficient_demo_balance' });
      }

      const multiplierPool = [0, 0, 0.5, 1.2, 2, 5, 10];
      const multiplier = multiplierPool[Math.floor(Math.random() * multiplierPool.length)];
      const win = toMoney(stake * multiplier);
      const nextBalance = toMoney(currentBalance - stake + win);

      await client.query(
        `
          UPDATE wallets
          SET cash_balance = $1, updated_at = now()
          WHERE id = $2
        `,
        [nextBalance, DEMO_WALLET_ID]
      );

      await client.query(
        `
          INSERT INTO game_rounds (id, user_id, game_id, session_id, stake, win)
          VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [roundId, DEMO_USER_ID, body.gameId, body.sessionId || null, stake, win]
      );

      await client.query(
        `
          INSERT INTO ledger_entries
            (id, wallet_id, user_id, amount, currency, type, reference, idempotency_key)
          VALUES ($1, $2, $3, $4, $5, 'bet', $6, $7)
        `,
        [
          crypto.randomUUID(),
          DEMO_WALLET_ID,
          DEMO_USER_ID,
          -stake,
          wallet.currency,
          roundId,
          `round:${roundId}:bet`
        ]
      );

      if (win > 0) {
        await client.query(
          `
            INSERT INTO ledger_entries
              (id, wallet_id, user_id, amount, currency, type, reference, idempotency_key)
            VALUES ($1, $2, $3, $4, $5, 'win', $6, $7)
          `,
          [
            crypto.randomUUID(),
            DEMO_WALLET_ID,
            DEMO_USER_ID,
            win,
            wallet.currency,
            roundId,
            `round:${roundId}:win`
          ]
        );
      }

      await client.query('COMMIT');
      await redis.del('wallet:demo');

      res.status(201).json({
        roundId,
        gameId: body.gameId,
        stake,
        win,
        multiplier,
        wallet: await readWallet()
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  })
);

app.post(
  '/provider/callback/balance',
  requireProviderSignature,
  asyncRoute(async (req, res) => {
    const body = providerCallbackSchema('balance').parse(req.body);
    const wallet = await readWalletByUser(pool, body.userId, body.currency);

    if (!wallet) {
      return res.status(404).json({ error: 'wallet_not_found' });
    }

    return res.json({
      userId: body.userId,
      currency: wallet.currency,
      balance: wallet.cash_balance,
      bonusBalance: wallet.bonus_balance
    });
  })
);

app.post(
  '/provider/callback/bet',
  requireProviderSignature,
  asyncRoute(async (req, res) => {
    const body = providerCallbackSchema('bet').parse(req.body);
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const event = await beginProviderEvent(client, {
        eventType: 'bet',
        transactionId: body.transactionId,
        roundId: body.roundId,
        body
      });

      if (event.replay) {
        await client.query('COMMIT');
        return sendProviderReplay(res, event);
      }

      const game = await client.query('SELECT id FROM games WHERE id = $1 AND enabled = true', [
        body.gameId
      ]);

      if (game.rowCount === 0) {
        const response = { status: 'rejected', error: 'game_not_found' };
        await completeProviderEvent(client, body.transactionId, 'rejected', response);
        await client.query('COMMIT');
        return res.status(404).json(response);
      }

      const wallet = await lockWallet(client, body.userId, body.currency);
      if (!wallet) {
        const response = { status: 'rejected', error: 'wallet_not_found' };
        await completeProviderEvent(client, body.transactionId, 'rejected', response);
        await client.query('COMMIT');
        return res.status(404).json(response);
      }

      const applied = await applyWalletDelta(
        client,
        wallet,
        -body.amount,
        'provider_bet',
        body.transactionId,
        `provider:${body.transactionId}:bet`
      );

      if (!applied.ok) {
        const response = {
          status: 'rejected',
          error: applied.error,
          balance: applied.balance,
          currency: wallet.currency
        };
        await completeProviderEvent(client, body.transactionId, 'rejected', response);
        await client.query('COMMIT');
        return res.status(409).json(response);
      }

      await client.query(
        `
          INSERT INTO game_rounds (id, user_id, game_id, session_id, stake, win)
          VALUES ($1, $2, $3, $4, $5, 0)
          ON CONFLICT (id)
          DO UPDATE SET stake = game_rounds.stake + EXCLUDED.stake
        `,
        [body.roundId, body.userId, body.gameId, body.sessionId || null, body.amount]
      );

      const response = {
        status: 'accepted',
        transactionId: body.transactionId,
        roundId: body.roundId,
        balance: applied.balance,
        currency: wallet.currency
      };

      await completeProviderEvent(client, body.transactionId, 'completed', response);
      await client.query('COMMIT');
      await redis.del('wallet:demo');

      return res.status(201).json(response);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  })
);

app.post(
  '/provider/callback/win',
  requireProviderSignature,
  asyncRoute(async (req, res) => {
    const body = providerCallbackSchema('win').parse(req.body);
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const event = await beginProviderEvent(client, {
        eventType: 'win',
        transactionId: body.transactionId,
        roundId: body.roundId,
        body
      });

      if (event.replay) {
        await client.query('COMMIT');
        return sendProviderReplay(res, event);
      }

      const game = await client.query('SELECT id FROM games WHERE id = $1 AND enabled = true', [
        body.gameId
      ]);

      if (game.rowCount === 0) {
        const response = { status: 'rejected', error: 'game_not_found' };
        await completeProviderEvent(client, body.transactionId, 'rejected', response);
        await client.query('COMMIT');
        return res.status(404).json(response);
      }

      const wallet = await lockWallet(client, body.userId, body.currency);
      if (!wallet) {
        const response = { status: 'rejected', error: 'wallet_not_found' };
        await completeProviderEvent(client, body.transactionId, 'rejected', response);
        await client.query('COMMIT');
        return res.status(404).json(response);
      }

      const applied = await applyWalletDelta(
        client,
        wallet,
        body.amount,
        'provider_win',
        body.transactionId,
        `provider:${body.transactionId}:win`
      );

      await client.query(
        `
          INSERT INTO game_rounds (id, user_id, game_id, session_id, stake, win)
          VALUES ($1, $2, $3, $4, 0, $5)
          ON CONFLICT (id)
          DO UPDATE SET win = game_rounds.win + EXCLUDED.win
        `,
        [body.roundId, body.userId, body.gameId, body.sessionId || null, body.amount]
      );

      const response = {
        status: 'accepted',
        transactionId: body.transactionId,
        roundId: body.roundId,
        balance: applied.balance,
        currency: wallet.currency
      };

      await completeProviderEvent(client, body.transactionId, 'completed', response);
      await client.query('COMMIT');
      await redis.del('wallet:demo');

      return res.status(201).json(response);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  })
);

app.post(
  '/provider/callback/rollback',
  requireProviderSignature,
  asyncRoute(async (req, res) => {
    const body = providerCallbackSchema('rollback').parse(req.body);
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const event = await beginProviderEvent(client, {
        eventType: 'rollback',
        transactionId: body.transactionId,
        body
      });

      if (event.replay) {
        await client.query('COMMIT');
        return sendProviderReplay(res, event);
      }

      const originalEvent = await client.query(
        `
          SELECT event_type, round_id, status
          FROM provider_events
          WHERE transaction_id = $1
        `,
        [body.originalTransactionId]
      );

      if (originalEvent.rowCount === 0 || originalEvent.rows[0].status !== 'completed') {
        const response = { status: 'rejected', error: 'original_transaction_not_found' };
        await completeProviderEvent(client, body.transactionId, 'rejected', response);
        await client.query('COMMIT');
        return res.status(404).json(response);
      }

      const originalType = originalEvent.rows[0].event_type;
      if (!['bet', 'win'].includes(originalType)) {
        const response = { status: 'rejected', error: 'unsupported_rollback_type' };
        await completeProviderEvent(client, body.transactionId, 'rejected', response);
        await client.query('COMMIT');
        return res.status(409).json(response);
      }

      const previousRollback = await client.query(
        `
          SELECT transaction_id
          FROM provider_events
          WHERE event_type = 'rollback'
            AND status = 'completed'
            AND transaction_id <> $1
            AND request_body->>'originalTransactionId' = $2
          LIMIT 1
        `,
        [body.transactionId, body.originalTransactionId]
      );

      if (previousRollback.rowCount > 0) {
        const response = {
          status: 'rejected',
          error: 'original_already_rolled_back',
          rollbackTransactionId: previousRollback.rows[0].transaction_id
        };
        await completeProviderEvent(client, body.transactionId, 'rejected', response);
        await client.query('COMMIT');
        return res.status(409).json(response);
      }

      const originalLedger = await client.query(
        `
          SELECT amount
          FROM ledger_entries
          WHERE idempotency_key = $1
        `,
        [`provider:${body.originalTransactionId}:${originalType}`]
      );

      if (originalLedger.rowCount === 0) {
        const response = { status: 'rejected', error: 'original_ledger_entry_not_found' };
        await completeProviderEvent(client, body.transactionId, 'rejected', response);
        await client.query('COMMIT');
        return res.status(404).json(response);
      }

      const wallet = await lockWallet(client, body.userId, body.currency);
      if (!wallet) {
        const response = { status: 'rejected', error: 'wallet_not_found' };
        await completeProviderEvent(client, body.transactionId, 'rejected', response);
        await client.query('COMMIT');
        return res.status(404).json(response);
      }

      const originalAmount = toMoney(originalLedger.rows[0].amount);
      const reversalAmount = toMoney(-originalAmount);
      const applied = await applyWalletDelta(
        client,
        wallet,
        reversalAmount,
        'provider_rollback',
        body.originalTransactionId,
        `provider:${body.transactionId}:rollback`
      );

      if (!applied.ok) {
        const response = {
          status: 'rejected',
          error: applied.error,
          balance: applied.balance,
          currency: wallet.currency
        };
        await completeProviderEvent(client, body.transactionId, 'rejected', response);
        await client.query('COMMIT');
        return res.status(409).json(response);
      }

      if (originalEvent.rows[0].round_id) {
        const field = originalType === 'bet' ? 'stake' : 'win';
        await client.query(
          `
            UPDATE game_rounds
            SET ${field} = GREATEST(0, ${field} - $1)
            WHERE id = $2
          `,
          [Math.abs(originalAmount), originalEvent.rows[0].round_id]
        );
      }

      const response = {
        status: 'accepted',
        transactionId: body.transactionId,
        originalTransactionId: body.originalTransactionId,
        reversedAmount: reversalAmount,
        balance: applied.balance,
        currency: wallet.currency
      };

      await completeProviderEvent(client, body.transactionId, 'completed', response);
      await client.query('COMMIT');
      await redis.del('wallet:demo');

      return res.status(201).json(response);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  })
);

app.get(
  '/admin/dashboard',
  requireAdmin,
  asyncRoute(async (req, res) => {
    const [users, wallets, ledger, providerEvents, rounds, auditLogs] = await Promise.all([
      pool.query('SELECT COUNT(*)::int AS count FROM users'),
      pool.query(
        `
          SELECT
            COALESCE(SUM(cash_balance), 0)::numeric(14, 2) AS cash_total,
            COALESCE(SUM(bonus_balance), 0)::numeric(14, 2) AS bonus_total
          FROM wallets
        `
      ),
      pool.query(
        `
          SELECT
            COUNT(*)::int AS count,
            COALESCE(SUM(amount), 0)::numeric(14, 2) AS net_amount
          FROM ledger_entries
        `
      ),
      pool.query(
        `
          SELECT status, COUNT(*)::int AS count
          FROM provider_events
          GROUP BY status
          ORDER BY status
        `
      ),
      pool.query(
        `
          SELECT
            COUNT(*)::int AS count,
            COALESCE(SUM(stake), 0)::numeric(14, 2) AS stake_total,
            COALESCE(SUM(win), 0)::numeric(14, 2) AS win_total
          FROM game_rounds
        `
      ),
      pool.query('SELECT COUNT(*)::int AS count FROM admin_audit_logs')
    ]);

    res.json({
      users: users.rows[0].count,
      wallets: {
        cashTotal: toMoney(wallets.rows[0].cash_total),
        bonusTotal: toMoney(wallets.rows[0].bonus_total)
      },
      ledger: {
        entries: ledger.rows[0].count,
        netAmount: toMoney(ledger.rows[0].net_amount)
      },
      providerEvents: providerEvents.rows,
      rounds: {
        count: rounds.rows[0].count,
        stakeTotal: toMoney(rounds.rows[0].stake_total),
        winTotal: toMoney(rounds.rows[0].win_total)
      },
      auditLogs: auditLogs.rows[0].count
    });
  })
);

app.get(
  '/admin/users',
  requireAdmin,
  asyncRoute(async (req, res) => {
    const result = await pool.query(
      `
        SELECT
          users.id,
          users.email,
          users.display_name,
          users.kyc_status,
          users.created_at,
          wallets.currency,
          wallets.cash_balance,
          wallets.bonus_balance
        FROM users
        LEFT JOIN wallets ON wallets.user_id = users.id
        ORDER BY users.created_at DESC
        LIMIT 100
      `
    );

    res.json(
      result.rows.map((row) => ({
        ...row,
        cash_balance: row.cash_balance === null ? null : toMoney(row.cash_balance),
        bonus_balance: row.bonus_balance === null ? null : toMoney(row.bonus_balance)
      }))
    );
  })
);

app.get(
  '/admin/users/:userId/wallet',
  requireAdmin,
  asyncRoute(async (req, res) => {
    const currency = req.query.currency || 'EUR';
    const wallet = await readWalletByUser(pool, req.params.userId, currency);

    if (!wallet) {
      return res.status(404).json({ error: 'wallet_not_found' });
    }

    return res.json(wallet);
  })
);

app.get(
  '/admin/ledger',
  requireAdmin,
  asyncRoute(async (req, res) => {
    const limit = Math.min(Number(req.query.limit || 50), 200);
    const result = await pool.query(
      `
        SELECT id, wallet_id, user_id, amount, currency, type, reference, idempotency_key, created_at
        FROM ledger_entries
        ORDER BY created_at DESC
        LIMIT $1
      `,
      [limit]
    );

    res.json(result.rows.map((row) => ({ ...row, amount: toMoney(row.amount) })));
  })
);

app.get(
  '/admin/provider-events',
  requireAdmin,
  asyncRoute(async (req, res) => {
    const limit = Math.min(Number(req.query.limit || 50), 200);
    const result = await pool.query(
      `
        SELECT
          id,
          provider,
          event_type,
          transaction_id,
          round_id,
          status,
          request_body,
          response_body,
          created_at,
          updated_at
        FROM provider_events
        ORDER BY created_at DESC
        LIMIT $1
      `,
      [limit]
    );

    res.json(result.rows);
  })
);

app.get(
  '/admin/audit-logs',
  requireAdmin,
  asyncRoute(async (req, res) => {
    const limit = Math.min(Number(req.query.limit || 50), 200);
    const result = await pool.query(
      `
        SELECT
          admin_audit_logs.id,
          admin_audit_logs.admin_id,
          admin_users.email AS admin_email,
          admin_audit_logs.action,
          admin_audit_logs.target_type,
          admin_audit_logs.target_id,
          admin_audit_logs.metadata,
          admin_audit_logs.created_at
        FROM admin_audit_logs
        JOIN admin_users ON admin_users.id = admin_audit_logs.admin_id
        ORDER BY admin_audit_logs.created_at DESC
        LIMIT $1
      `,
      [limit]
    );

    res.json(result.rows);
  })
);

app.post(
  '/admin/wallet-adjustments',
  requireAdmin,
  asyncRoute(async (req, res) => {
    const body = adminAdjustmentSchema.parse(req.body);
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const wallet = await lockWallet(client, body.userId, body.currency);
      if (!wallet) {
        await client.query('ROLLBACK');
        return res.status(404).json({ error: 'wallet_not_found' });
      }

      const idempotencyKey =
        body.idempotencyKey || `admin:${req.admin.id}:${crypto.randomUUID()}:adjustment`;

      const existing = await client.query(
        `
          SELECT id
          FROM ledger_entries
          WHERE idempotency_key = $1
        `,
        [idempotencyKey]
      );

      if (existing.rowCount > 0) {
        await client.query('COMMIT');
        return res.status(409).json({ error: 'duplicate_adjustment_idempotency_key' });
      }

      const applied = await applyWalletDelta(
        client,
        wallet,
        body.amount,
        'admin_adjustment',
        body.reason,
        idempotencyKey
      );

      if (!applied.ok) {
        await client.query('ROLLBACK');
        return res.status(409).json({
          error: applied.error,
          balance: applied.balance,
          currency: wallet.currency
        });
      }

      const auditId = await writeAdminAudit(client, {
        adminId: req.admin.id,
        action: 'wallet.adjustment.create',
        targetType: 'wallet',
        targetId: wallet.id,
        metadata: {
          userId: body.userId,
          amount: body.amount,
          currency: wallet.currency,
          reason: body.reason,
          idempotencyKey
        }
      });

      await client.query('COMMIT');
      await redis.del('wallet:demo');

      return res.status(201).json({
        status: 'accepted',
        auditId,
        idempotencyKey,
        wallet: await readWalletByUser(pool, body.userId, body.currency),
        balance: applied.balance,
        currency: wallet.currency
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  })
);

app.use((error, req, res, next) => {
  req.log.error(error);

  if (error instanceof z.ZodError) {
    return res.status(400).json({
      error: 'validation_failed',
      issues: error.issues
    });
  }

  return res.status(500).json({ error: 'internal_error' });
});

async function start() {
  await redis.connect();
  await initSchema();

  app.listen(config.port, '0.0.0.0', () => {
    console.log(`Fake casino API listening on ${config.port}`);
  });
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
