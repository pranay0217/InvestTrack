# **InvestTrack** — Unified Stock Portfolio Aggregator (Google Auth + Multi-Broker + AI Insights)

> See all your holdings from **Zerodha**, **Angel One**, **Groww**, and **ICICI Direct** in one dashboard.  
> Sign in with **Google**, get **Gemini-powered** insights emailed to you, and keep your data safe—**no personal data stored**.  
> **Live Now:** [https://investtrack-4xgu.onrender.com](https://investtrack-4xgu.onrender.com)

---

## ✨ Key Features

- **Google Sign-In**  
  Secure sign-in with Google OAuth 2.0 (no passwords to manage).

- **Connect Multiple Brokers**  
  Link **Zerodha**, **Angel One**, **Groww**, **ICICI Direct** accounts; view **all portfolios in one place**.
  - Read-only scopes by default.
  - Multiple accounts per broker supported.

- **Unified Portfolio View**  
  - Aggregated holdings, P&L, sector/asset allocation, top movers, risk snapshot.  
  - Live quotes (if available) or delayed prices with clear labeling.

- **AI Email Insights (Gemini)**  
  - Cumulative analysis across all brokers.  
  - Weekly/daily email with risks, concentration, rebalancing notes, tax-harvesting hints, and anomalies.  
  - Actionable suggestions with simple language and metric references.

- **Privacy & Safety by Design**  
  - **No personal data stored** beyond minimal auth identifiers.  
  - Broker tokens are **encrypted at rest**, rotated, and scoped to read-only where possible.  
  - PII avoided by default; analytics are **aggregated & anonymized**.

- **Admin-free Operation**  
  - Fully self-serve connection and revocation of broker access.

---

## 🔭 Future Scope

- **One-Click Buy/Sell Triggers**  
  - Convert AI suggestions into action via user-approved rules.  
  - Smart triggers (price/volatility/indicator-based) with guardrails and explicit confirmation.

- **User-Selectable Email Frequency & Custom AI Reports**  
  - Ability to choose daily, weekly, or monthly insights.  
  - Themed reports (tax efficiency, dividend yield, high-growth focus).

- **More Integrations**  
  - Dhan, Upstox, Paytm Money.

- **Mobile Apps**  
  - iOS and Android apps with biometric authentication.

- **Advanced Analytics**  
  - Factor tilts, volatility analysis, VaR, goal-based projections.

- **Automated Tax Reports**  
  - Capital gains summary, GST-ready exports.

---

## 🏗️ Architecture (High-Level)

           ┌──────────────────────────┐
           │       User Portal         │
           ├──────────────────────────┤
           │ Google OAuth Login        │
           │ Link Broker Accounts      │
           │ View Unified Portfolio    │
           │ Read AI Insights          │
           └───────────┬──────────────┘
                       │
           ┌───────────▼──────────────┐
           │   AI Insights Engine      │
           ├──────────────────────────┤
           │ Gemini API Integration    │
           │ Portfolio Risk Analysis   │
           │ Investment Suggestions    │
           └───────────┬──────────────┘
                       │
           ┌───────────▼──────────────┐
           │      Backend API          │
           ├──────────────────────────┤
           │ Broker Data Fetchers      │
           │ Portfolio Aggregator      │
           │ Email Insights Service    │
           └───────────┬──────────────┘
                       │
    ┌──────────────────▼──────────────────┐
    │          Database (MongoDB)          │
    ├──────────────────────────────────────┤
    │ Minimal User Auth Data               │
    │ Encrypted Broker Tokens               │
    │ Aggregated Portfolio Data             │
    └──────────────────────────────────────┘

---

## 🧰 Tech Stack

- **Frontend:** React (Vite), JavaScript, react-Bootstrap, axios, react-hook-form
- **Backend:** Node.js (Express) and Python (FastAPI)  
- **DB:** MongoDB Atlas  
- **AI:** Gemini 2.0/Flash via Gemini API (or Vertex AI if on GCP)  
- **Mail:** nodemailer 
- **Auth:** Google OAuth2 (OIDC), per-broker OAuth/keys  
- **Security:** bcrypt.js 

---

## 🔐 Security & Privacy

- **Data Minimization:** store only `user_id`, `provider`, `scopes`, and broker token **fingerprints**; do **not** store emails/names unless required for mailing (then store hashed + encrypted).  
- **Token Safety:** broker tokens encrypted with KMS; access scoped to read-only; short TTL refresh where supported; per-user revoke.  
- **No Raw PII:** we do not persist PAN, account numbers, or addresses.  
- **Logging:** structured logs without PII; privacy-safe analytics.  
- **Compliance Posture:** consent screens, data processing records, export/delete user data on request.  

---

## ▶️ Quick Start

### 1) Access Live App
Visit: **[https://investtrack-4xgu.onrender.com](https://investtrack-4xgu.onrender.com)**

### 2) Or Run Locally
```bash
git clone https://example.com/investtrack.git
cd investtrack
cp .env.example .env
# Backend
cd backend && npm i
# Frontend
cd ../frontend && npm i
