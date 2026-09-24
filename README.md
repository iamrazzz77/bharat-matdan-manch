# 🗳️ Bharat Matdan Manch — India Digital Election Platform

[![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma_ORM-5.21-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker_Ready-24.0-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

An **end-to-end verifiable, secure, modern full-stack web application** architected for Indian election workflows (State → District → Constituency → Polling Station → Booth hierarchy) across 543 Parliamentary Constituencies.

---

## 🌟 Key Features & Engineering Highlights

- 🔐 **Secret Ballot Isolation Protocol**: Voter authentication metadata (`VoterParticipation`) is cryptographically segregated from anonymous vote choices (`AnonymousVote`) to preserve secret ballot privacy.
- 🚫 **Double-Vote Prevention Lock**: Database-level unique constraint locks on `(voterId, electionId)` prevent multi-submission and replay attacks.
- 🖨️ **Interactive VVPAT Slip Simulator**: 7-second slip preview modal with animation, sound feedback, and instant cryptographic hash receipt generation.
- 🗺️ **Interactive Live Results & India Map**: SVG Map with state-wise & constituency-wise vote tallies, turnout percentages, and party leaderboards.
- 🛡️ **Role-Based Access Control (RBAC)**: Distinct access workflows for Voters, Polling Officers, and Super Admins.
- 🌐 **Multilingual Support (EN / HI)**: Full i18n support with instant language switching between English and Hindi.

---

## 🏗️ System Architecture & Data Isolation Flow

```mermaid
graph TD
    A[Voter Portal Login] -->|EPIC Auth + JWT| B[Authentication Guard]
    B -->|Check Eligibility| C{Has Voted?}
    C -->|Yes| D[Access Denied: Double-Vote Lock]
    C -->|No| E[Digital Ballot Box]
    E -->|1. Record Voter Identity| F[(VoterParticipation Table)]
    E -->|2. Record Anonymous Choice| G[(AnonymousVote Table)]
    E -->|3. Generate Receipt| H[VVPAT Verification Slip & Hash]
    F -.-|Isolated Keys| G
```

---

## 🔑 Recruiter Quick Demo Access Profiles

| Role | Identifier / EPIC | Password | Access Details |
| :--- | :--- | :--- | :--- |
| 🗳️ **Registered Voter 1** | `EPIC100001` | `Voter123!` | Mumbai South Constituency |
| 🗳️ **Registered Voter 2** | `EPIC100003` | `Voter123!` | Varanasi Constituency |
| 👮 **Polling Officer** | `officer.mumbai@eci.gov.in` | `Pass123!` | Booth #1 Station Check-in Terminal |
| 👑 **Super Admin** | `admin@eci.gov.in` | `Pass123!` | Election Lifecycle, Candidate Registry & Audit Logs |

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js `v18+`
- npm or yarn

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/iamrazzz77/bharat-matdan-manch.git
cd bharat-matdan-manch
npm install
```

### 2. Database Migration & Realistic Indian Data Seeding

```bash
# Push Prisma schema to SQLite / PostgreSQL
npx prisma db push

# Seed 543 Constituencies, Sample Voters, Candidates & Polling Officers
npx prisma db seed
```

### 3. Launch Development Server

```bash
npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🧪 Testing Suite

Run unit tests for cryptographic receipts, double-vote lock validation, and API contracts:

```bash
npm test
```

---

## 🐳 Running with Docker

Run full-stack containerized environment using PostgreSQL:

```bash
docker-compose up --build
```

---

## 📄 License

Distributed under the MIT License. Built for educational and portfolio demonstration purposes.
