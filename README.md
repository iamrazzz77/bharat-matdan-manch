# Bharat Matdan Manch - India Digital Election Platform

An end-to-end verifiable, secure, modern full-stack web application architected for Indian election workflows (State → District → Constituency → Polling Station → Booth hierarchy).

> **DEMO DISCLAIMER**: Fictional voters, candidates, and data. EVM and VVPAT integrations are simulated for educational demonstration purposes and are not affiliated with the Election Commission of India.

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies & Initialize Database

```bash
# Install packages
npm install

# Push Prisma Schema to Database
npx prisma db push

# Seed Realistic Indian Election Demo Data
npx prisma db seed
```

### 2. Run Application Locally

```bash
# Start Next.js Development Server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Demo Quick-Login Credentials

| Role | EPIC / Email | Password | Access Details |
| :--- | :--- | :--- | :--- |
| **Demo Voter 1** | `EPIC100001` | `Voter123!` | Mumbai South Constituency |
| **Demo Voter 2** | `EPIC100003` | `Voter123!` | Varanasi Constituency |
| **Polling Officer** | `officer.mumbai@eci.gov.in` | `Pass123!` | Booth #1 Station Check-in Terminal |
| **Super Admin** | `admin@eci.gov.in` | `Pass123!` | Election Lifecycle, Candidate Registry, Audit Chain |

---

## 🧪 Automated Testing

```bash
# Run Cryptographic Receipt & Double-Vote Block Test Suite
npm test
```

---

## 📦 Docker Containerization

To run using PostgreSQL 16 and Redis in Docker:

```bash
docker-compose up --build
```

---

## 🛡️ Architecture & Security Features

1. **Secret-Ballot Cryptographic Isolation**: Voter identity (`VoterParticipation`) is stored separately from anonymous choices (`AnonymousVote`).
2. **Double-Vote Prevention Lock**: Unique database constraints on `(voterId, electionId)` prevent multiple ballot submissions.
3. **VVPAT Printer Demo Unit**: 7-second slip verification window with slip drop animation and receipt code generation.
4. **Tamper-Evident SHA-256 Hash Logs**: Chained audit logs for all vote entries and status changes.
5. **RBAC & Multilingual Support**: English + Hindi UI toggle with role-based routing.
