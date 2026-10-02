# FraudGuard - AI Credit Card Fraud Detection Dashboard

**FraudGuard** is a modern, high-performance web dashboard prototype for bank staff and fraud intelligence operators to monitor, analyze, and act on credit card transaction anomalies in real-time.

Built as an enterprise-grade fintech college project prototype featuring simulated live streaming, automated risk scoring, and interactive analyst workflows.

---

## 🚀 Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS (Custom near-black navy `#0B1020` dark palette)
- **Routing**: React Router v6
- **Data Visualizations**: Recharts
- **Icons**: Lucide React
- **State & Utilities**: Custom React Contexts (Auth, Theme, Toast notifications)

---

## ⚡ Quick Start & Run Steps

### 1. Installation
Clone or navigate to the project directory and install the required dependencies:
```bash
npm install
```

### 2. Development Server
Start the Vite local development server:
```bash
npm run dev
```

Open your web browser and navigate to `http://localhost:5173`.

### 3. Production Build & Type Check
To compile TypeScript and test the production build:
```bash
npm run build
```

---

## 🎯 Key Features & Requirements Matrix

| Feature | Implementation & Path |
| :--- | :--- |
| **Sample Data Badge** | Visible badge in top navigation bar indicating prototype status |
| **Dark / Light Theme** | Near-black navy `#0B1020` theme by default with top bar toggle switch |
| **Risk Threshold Utility** | `src/utils/risk.ts`: Low (`< 0.3` Green), Medium (`0.3-0.7` Amber), High (`> 0.7` Red) |
| **Mock API Service** | `src/services/api.ts`: Mocked `predictTransaction()` returning probability |
| **Centralized Mock Data**| `src/data/mock.ts` |
| **Login Screen** | `/login` Split screen layout with tagline and validated form |
| **Dashboard** | `/` Executive overview with KPI cards, 7-day trend line chart, risk pie chart, and recent alerts |
| **Live Stream** | `/live` 3-second auto-pushing transaction table with pause/resume & highlight effect |
| **Fraud Detection Queue**| `/detection` Flagged transactions with probability bars & action buttons (Approve, Verify, Block) |
| **Analytics & ML Models**| `/analytics` Hourly histogram, amount distribution, and model comparison (clearly labelled *"Planned - results pending"*) |
| **Reports & CSV Export** | `/reports` Custom filterable report preview with instant CSV file download |
| **User Profile** | `/profile` Account info, notification toggles, and password update form |
| **Transaction Details** | `/transaction/:id` & Modal view with risk gauge, timeline, and top contributing features (V14, V17, V12, Amount) |

---

## 🛡️ License
College Project Prototype - Released for educational and demonstration purposes.
