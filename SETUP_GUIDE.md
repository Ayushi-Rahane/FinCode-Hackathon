# 🚀 FinCode Hackathon — Complete Setup Guide

> **Step-by-step instructions** for anyone who forks / clones this repo and wants to run it locally in VS Code.

---

## 📋 Prerequisites (Install These First)

Before running the setup scripts, make sure you have the following installed on your system:

| Tool | Required Version | Download Link | Why Needed |
|------|-----------------|---------------|------------|
| **Git** | Any recent version | [git-scm.com](https://git-scm.com/downloads) | To clone the repo |
| **VS Code** | Any recent version | [code.visualstudio.com](https://code.visualstudio.com/) | Code editor |
| **Python** | 3.10 or higher | [python.org](https://www.python.org/downloads/) | Backend (Flask) |
| **Node.js** | 18.x or higher (LTS) | [nodejs.org](https://nodejs.org/) | Frontend (React + Vite) |
| **MongoDB** | 6.0+ or Atlas (cloud) | [mongodb.com](https://www.mongodb.com/try/download/community) | Database |

> [!IMPORTANT]
> **Windows users:** When installing Python, make sure to check ✅ **"Add Python to PATH"** during installation.
>
> **MongoDB** can either be installed locally or you can use [MongoDB Atlas](https://www.mongodb.com/atlas) (free cloud database). See [Step 5](#step-5--configure-environment-variables) for details.

---

## 🔧 Full Setup — Step by Step

### Step 1 — Fork & Clone the Repository

1. Go to the GitHub repository page
2. Click the **"Fork"** button (top-right corner) to create your own copy
3. Open **VS Code**
4. Open the **Terminal** in VS Code:  `Ctrl + `` `  (backtick) or go to **Terminal → New Terminal**
5. Clone your forked repo:

```bash
git clone https://github.com/YOUR-USERNAME/FinCode-Hackathon.git
```

6. Open the cloned folder in VS Code:

```bash
cd FinCode-Hackathon
code .
```

> [!TIP]
> Alternatively, you can use **VS Code → File → Open Folder** and select the cloned `FinCode-Hackathon` folder.

---

### Step 2 — Run the Automated Setup Script

We have provided **one-click setup scripts** that install everything automatically.

#### 🍎 macOS / 🐧 Linux

Open the VS Code terminal and run:

```bash
chmod +x setup.sh
./setup.sh
```

#### 🪟 Windows

Open the VS Code terminal (**use Command Prompt**, not PowerShell) and run:

```cmd
setup.bat
```

Or simply **double-click** `setup.bat` in the File Explorer.

> [!NOTE]
> The setup script will automatically:
> - Check if Python and Node.js are installed (installs them if missing on macOS/Linux)
> - Create a Python virtual environment at `backend/venv`
> - Install all backend Python packages from `requirements.txt`
> - Install all frontend npm packages from `package.json`
> - Create a `.env` template file if one doesn't exist

---

### Step 3 — Verify the Setup Worked

At the end of the script, you should see version numbers printed for:

```
  Python  : Python 3.x.x
  pip     : pip 2x.x.x
  Node.js : v18.x.x  (or higher)
  npm     : 10.x.x
  Flask   : 3.0.3
  Pandas  : 2.2.2
  PyMongo : 4.7.2
```

If any of the above are missing, re-read the error messages from the script and fix accordingly.

---

### Step 4 — Set Up MongoDB

The backend requires a MongoDB database. You have **two options**:

#### Option A — Local MongoDB

1. Download & install [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Start the MongoDB service:
   - **macOS (Homebrew):** `brew services start mongodb-community`
   - **Linux:** `sudo systemctl start mongod`
   - **Windows:** MongoDB runs as a service automatically after installation
3. The default connection URL is: `mongodb://localhost:27017/fincode_db`

#### Option B — MongoDB Atlas (Cloud — Free Tier)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and create a free account
2. Create a new **free cluster**
3. Click **"Connect"** → **"Connect your application"**
4. Copy the connection string (it looks like):
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/fincode_db
   ```
5. You'll paste this in the `.env` file in the next step

---

### Step 5 — Configure Environment Variables

Open the file `backend/.env` in VS Code and update the values:

```env
# Flask Config
FLASK_APP=run.py
FLASK_ENV=development
FLASK_DEBUG=1
SECRET_KEY=your-secret-key-change-this    # ← Change this to any random string

# Server
HOST=0.0.0.0
PORT=5000

# MongoDB
MONGO_URI=mongodb://localhost:27017/fincode_db    # ← Update if using Atlas
MONGO_DB_NAME=fincode_db

# File Upload
UPLOAD_FOLDER=uploads
MAX_CONTENT_LENGTH=16777216   # 16 MB in bytes
ALLOWED_EXTENSIONS=csv,xlsx,xls

# CORS
FRONTEND_URL=http://localhost:3000
```

> [!CAUTION]
> **Never commit your `.env` file with real secrets to GitHub!** The `.gitignore` already excludes `.env` files, so you're safe as long as you don't force-add it.

---

### Step 6 — Start the Backend Server

Open a **terminal** in VS Code and run:

#### macOS / Linux:
```bash
cd backend
source venv/bin/activate
python run.py
```

#### Windows:
```cmd
cd backend
venv\Scripts\activate
python run.py
```

You should see output like:
```
 * Running on http://0.0.0.0:5000
 * Debug mode: on
```

> [!TIP]
> Keep this terminal **running** — don't close it. The backend needs to stay active.

---

### Step 7 — Start the Frontend Dev Server

Open a **second terminal** in VS Code (click the **+** icon in the terminal panel) and run:

```bash
cd frontend
npm run dev
```

You should see output like:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/
```

Now open your browser and go to: **[http://localhost:3000](http://localhost:3000)**

🎉 **The app should be running!**

---

## 📁 Project Structure Overview

```
FinCode-Hackathon/
├── backend/                  # Flask API (Python)
│   ├── app/
│   │   ├── __init__.py       # App factory (Flask + CORS + Blueprints)
│   │   ├── database/         # MongoDB connection (PyMongo)
│   │   ├── models/           # Data models
│   │   ├── routes/           # API endpoints (upload, analysis, recommendations)
│   │   ├── services/         # Business logic
│   │   └── utils/            # Helper functions
│   ├── .env                  # Environment variables (NOT committed to git)
│   ├── requirements.txt      # Python dependencies
│   └── run.py                # Entry point — starts Flask server
│
├── frontend/                 # React + Vite + Tailwind (JavaScript)
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   └── pages/            # Page-level components
│   ├── package.json          # Node.js dependencies
│   ├── vite.config.js        # Vite config (dev server on port 3000)
│   ├── tailwind.config.js    # Tailwind CSS config
│   └── index.html            # HTML entry point
│
├── setup.sh                  # Automated setup (macOS/Linux)
├── setup.bat                 # Automated setup (Windows)
├── .gitignore                # Git ignore rules
└── ReadMe.md                 # Project overview
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 | UI components |
| **Build Tool** | Vite 5 | Fast dev server & bundler |
| **Styling** | Tailwind CSS 3 | Utility-first CSS |
| **Charts** | Recharts + Chart.js | Data visualization |
| **HTTP Client** | Axios | API requests to backend |
| **Routing** | React Router v6 | Page navigation |
| **Backend** | Flask 3 | REST API |
| **Database** | MongoDB + PyMongo | Data storage |
| **Data Processing** | Pandas + NumPy | Financial data analysis |

---

## ❓ Troubleshooting

### "python" / "node" is not recognized
- Make sure Python and Node.js are **added to your system PATH**
- Restart VS Code after installing them
- On Windows, you may need to restart your computer

### MongoDB connection refused
- Make sure MongoDB is **running** (check with `mongosh` or MongoDB Compass)
- If using Atlas, check that your **IP is whitelisted** in the Atlas dashboard
- Verify the `MONGO_URI` in `backend/.env` is correct

### CORS errors in the browser
- Make sure the backend is running on **port 5000**
- Make sure `FRONTEND_URL` in `backend/.env` is set to `http://localhost:3000`

### Port already in use
- Backend: Change `PORT` in `backend/.env`
- Frontend: Change the port in `frontend/vite.config.js`

### Virtual environment issues (Windows)
If `venv\Scripts\activate` gives an error about execution policies, run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 🔄 Daily Development Workflow

After the initial setup, here's what you do every time you want to work on the project:

1. **Open the project** in VS Code
2. **Start MongoDB** (if running locally)
3. **Terminal 1 — Backend:**
   ```bash
   cd backend
   source venv/bin/activate    # macOS/Linux
   # venv\Scripts\activate     # Windows
   python run.py
   ```
4. **Terminal 2 — Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
5. **Open browser** → `http://localhost:3000`

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit: `git commit -m "Add your feature"`
5. Push: `git push origin feature/your-feature`
6. Open a **Pull Request** on the original repo
