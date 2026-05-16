# Goldsvet Docker Skeleton

This is a clean local skeleton for a casino-style application shell. It does not depend on the incomplete public preview Laravel casino code.

## Services

- `nginx`: public reverse proxy on `http://localhost:8080`
- `frontend`: Vite React shell served by nginx
- `api`: fake casino API with games, wallet, sessions, ledger entries, and demo rounds
- `postgres`: application database
- `redis`: cache and future queue/pubsub foundation

## Start

```bash
cp .env.example .env
docker compose up --build
```

Open:

```text
http://localhost:8080
```

API health:

```text
http://localhost:8080/api/health
```

## Fake API

The API is intentionally fake and development-only. It seeds:

- one demo user
- one dev admin
- one EUR wallet
- four demo games
- immutable-style ledger rows for demo bets and wins
- provider callback event rows for idempotent signed callbacks
- admin audit rows for privileged actions

Useful endpoints through nginx:

```text
GET  /api/health
GET  /api/games
GET  /api/wallet
GET  /api/ledger
POST /api/auth/login
POST /api/game-sessions
POST /api/fake-provider/round
POST /api/provider/callback/balance
POST /api/provider/callback/bet
POST /api/provider/callback/win
POST /api/provider/callback/rollback
GET  /api/admin/dashboard
GET  /api/admin/users
GET  /api/admin/ledger
GET  /api/admin/provider-events
GET  /api/admin/audit-logs
POST /api/admin/wallet-adjustments
```

Protected demo endpoints accept:

```text
Authorization: Bearer dev-demo-token
```

Admin endpoints accept:

```text
X-Admin-Token: dev-admin-token
```

Example wallet adjustment:

```bash
curl -sS http://localhost:8080/api/admin/wallet-adjustments \
  -H 'Content-Type: application/json' \
  -H "X-Admin-Token: ${ADMIN_TOKEN:-dev-admin-token}" \
  -d '{"userId":"demo-user","amount":25,"currency":"EUR","reason":"demo operator credit"}'
```

Provider callback endpoints require HMAC headers:

```text
X-Provider-Timestamp: <unix-seconds>
X-Provider-Signature: sha256=<hmac_sha256(timestamp + "." + raw_json_body)>
```

Example signed bet callback:

```bash
body='{"transactionId":"tx-demo-bet-1","userId":"demo-user","gameId":"gold-777","roundId":"round-demo-1","amount":2,"currency":"EUR"}'
ts="$(date +%s)"
sig="sha256=$(printf '%s.%s' "$ts" "$body" | openssl dgst -sha256 -hmac "${PROVIDER_WEBHOOK_SECRET:-dev-provider-secret}" -hex | awk '{print $2}')"

curl -sS http://localhost:8080/api/provider/callback/bet \
  -H 'Content-Type: application/json' \
  -H "X-Provider-Timestamp: $ts" \
  -H "X-Provider-Signature: $sig" \
  -d "$body"
```

## Reset Local Data

```bash
docker compose down -v
docker compose up --build
```

## Production Gaps

Before real-money use, replace the fake provider with licensed integrations and add legal/compliance work:

- gambling license and jurisdiction rules
- KYC/AML provider
- payment provider approved for gambling
- certified game provider or certified RNG
- full auth, RBAC, audit logs, rate limits, monitoring
- penetration test and backup restore drill
