# 🛡️ OmniShield & NextGen AI Suite

> Comprehensive Capstone Enterprise Suite integrating Cyber Incident Management, AI Career Coaching, and Smart AI Tech Procurement.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-cyan.svg)
![Node.js](https://img.shields.io/badge/Node.js-26-green.svg)
![Express](https://img.shields.io/badge/Express-4-lightgrey.svg)
![OpenAI/Groq](https://img.shields.io/badge/AI-Groq%2FOpenAI-purple.svg)

---

## 📌 Overview

**OmniShield & NextGen AI Suite** is an all-in-one web platform combining 3 enterprise application modules into a single interface:

1. **Cyber Incident Reporting Portal**: Evidence intake wizard, status timeline, SOC admin triage, threat analytics & MTTR metrics.
2. **AI Career Coach Platform**: AI resume structure reviewer, ATS keyword match score (0-100%), interactive Q&A mock interview simulator, dynamic career roadmap checklist, skill gap radar, and AI job recommendation feed.
3. **AI Tech & Gear Shopping Assistant**: Smart catalog with multi-category filters, floating conversational AI shopping chatbot, wishlist, cart drawer, promo code discounts (`CAPSTONE2026`), and express checkout receipt generator.
4. **Executive Dashboard**: Cross-suite telemetry dashboard connecting all three domain engines.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/omni-capstone-suite.git
   cd omni-capstone-suite
   ```

2. **Install Dependencies**
   ```bash
   # Install dependencies for both client & server
   cd server && npm install
   cd ../client && npm install
   cd ..
   ```

3. **Configure Environment Variables (Optional)**
   Create a `.env` file in `/server`:
   ```env
   PORT=5000
   GROQ_API_KEY=your_groq_api_key_here
   # OR
   OPENAI_API_KEY=your_openai_api_key_here
   ```
   *(Note: If no API key is provided, the platform automatically switches to its built-in smart heuristic engine so all features work out-of-the-box!)*

4. **Run Development Servers**
   ```bash
   # Terminal 1 - Backend Server
   cd server && npm start

   # Terminal 2 - Frontend Client
   cd client && npm run dev
   ```
   Open your browser at `http://localhost:3000`.

---

## 🏗️ Project Structure

```
omni-capstone-suite/
├── client/                     # Vite + React Frontend
│   ├── src/
│   │   ├── components/         # Modular Components
│   │   │   ├── incidents/      # Incident Portal Components
│   │   │   ├── career/         # AI Career Coach Components
│   │   │   ├── shop/           # AI Tech Shop Components
│   │   │   └── ExecutiveDashboard.jsx
│   │   ├── services/           # REST API Client (api.js)
│   │   ├── styles/             # Master HSL Design System (index.css)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/                     # Node.js + Express Backend
│   ├── routes/                 # Express API Routes (incidents, career, shop, ai)
│   ├── services/               # AI Service Wrapper (Groq/OpenAI + Heuristic fallback)
│   ├── data/                   # Mock DB Seed Store
│   ├── index.js
│   └── package.json
├── README.md
└── .gitignore
```

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Lucide React Icons, Custom HSL CSS Tokens & Glassmorphic Cards
- **Backend**: Node.js, Express.js, CORS, Dotenv, REST API Router
- **AI Integration**: Groq API (Llama-3.3-70b-versatile) / OpenAI API (GPT-4o) with Heuristic Fallback
- **Database**: Mongoose Schemas & In-Memory Store Layer

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
