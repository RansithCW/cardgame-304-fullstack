# 304 Card Game – Fullstack Implementation

A work-in-progress fullstack web app for playing the classic Sri Lankan card game 304 (Three-Nought-Four), built with React (Vite + JavaScript) on the frontend and FastAPI (Python) on the backend.

### 🚀 Tech Stack

Frontend: React (Vite, JavaScript, Tailwind CSS)

Backend: FastAPI (Python 3.x)

API: RESTful JSON between frontend and backend

### 🃏 What is 304?

304 is a trick-taking card game popular in Sri Lanka and parts of South Asia. This project brings 304 online for single-player fun, with plans to develop to multiplayer access as I learn and grow my skills.

### 🗂️ Project Structure

```
fullstack-card-game/
├── backend/        # FastAPI app and game logic
│   ├── main.py
│   └── requirements.txt
├── frontend/       # React + Vite frontend
│   ├── src/
│   └── package.json
└── README.md
```

### ⚡️ Getting Started

1. Clone the repository
```
git clone https://github.com/RansithCW/cardgame-304-fullstack.git
cd cardgame-304-fullstack
```

3. Backend Setup (FastAPI)
```
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
The backend runs on http://localhost:8000

5. Frontend Setup (React + Vite)
```
cd ../frontend
npm install
npm run dev
```
The frontend runs on http://localhost:5173 by default

6. Configuration
API base URL:
Make sure the frontend is configured to point to your backend (see VITE_API_BASE_URL in .env).

### ✨ Features (WIP)

 -  Card dealing and game logic (backend)

 - Interactive frontend with React + Tailwind


### 🛠️ Development Status

This project is in active development. Issues, suggestions, and contributions are welcome!

### 📜 License

MIT
