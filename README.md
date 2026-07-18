# 🚀 ReLaunchHer

> **Empowering Women to Relaunch Their Careers After a Break.**  
> *A comprehensive career comeback platform providing personalized onboarding, skill assessments, learning roadmaps, interactive resume building, mock interviews, and application tracking.*

---

## 📌 Problem Statement
Millions of women taking career breaks (for caregiving, family, or health reasons) face significant structural hurdles when returning to work: penalization for resume gaps, rapid skill obsolescence, lack of structured guidance, and loss of confidence. **ReLaunchHer** reframes career breaks as valuable growth periods and equips returners with an end-to-end toolkit to relaunch their careers with confidence.

---

## ✨ Key Features

- 🧭 **7-Step Personalized Onboarding**: Captures background, career history, gap activities, skills, and target roles to build a returner profile from day one.
- 📈 **Career Comeback Score**: Dynamic, real-time metric tracking overall preparation and platform engagement.
- ⏳ **Career Break Timeline & Story**: Tools to log milestones and articulate break experiences positively for employers.
- 📝 **Interactive Resume Builder**: Real-time side-by-side editor with export options tailored for returners.
- 🎯 **Skill Assessment & 5-Week Learning Roadmap**: Diagnostic checklists and structured weekly learning targets.
- 💼 **Kanban Application Tracker**: Drag-and-drop workflow tracking applications from saved to offer stages.
- 🎙️ **AI-Powered Mock Interviews**: Category-based practice (Technical, HR, Behavioral) with built-in timers.
- 🤝 **Mentorship & Community Circles**: Connect with returner-friendly mentors and peer support groups.

---

## 🛠️ Tech Stack

- **Frontend Core**: React 18, Vite
- **Routing**: React Router DOM v6
- **State Management**: React Context API (`AuthContext`, `AppContext`, `ThemeContext`) + `localStorage`
- **UI & Styling**: Custom Responsive CSS Tokens & Micro-animations
- **Data Visualization**: Recharts
- **Icons & Animations**: Lucide React, Framer Motion
- **Build Engine**: Vite / Rolldown

---

## ⚙️ Getting Started & Local Setup

Follow these simple steps to run **ReLaunchHer** locally on your machine:

### 1. Prerequisites
Ensure you have **Node.js** (v18.0 or higher) and **npm** installed.
```bash
node -v
npm -v
```

### 2. Clone the Repository
```bash
git clone https://github.com/deekshithanowdu/ReLaunchHer.git
cd ReLaunchHer
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 5. Build for Production
```bash
npm run build
```

---

## 📁 Project Structure

```text
ReLaunchHer/
├── public/              # Static assets
├── src/
│   ├── components/      # UI components (Layout, Common, Dashboard, Community)
│   ├── context/         # Central state providers (Auth, App, Theme)
│   ├── data/            # Mock data sources (jobs, courses, mentors, skills)
│   ├── pages/           # Public pages & Dashboard views
│   ├── App.jsx          # Main application & router setup
│   └── index.css        # Global CSS variables & design system
├── package.json
└── README.md
```

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
