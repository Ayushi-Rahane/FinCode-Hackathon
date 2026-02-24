#!/bin/bash
# ============================================================
#  FinCode Hackathon — One-Time Setup Script (macOS / Linux)
# ============================================================
#  Prerequisites: Git must be installed.
#  This script will install (if missing):
#    • Node.js (via nvm)
#    • Python 3 (via Homebrew on macOS / apt on Linux)
#    • All frontend npm dependencies
#    • All backend pip dependencies inside a virtual environment
#
#  Usage:
#    chmod +x setup.sh
#    ./setup.sh
# ============================================================

set -e  # Exit immediately on error

# ── Colours for pretty output ──────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Colour

# ── Helper functions ───────────────────────────────────────
info()    { echo -e "${CYAN}[INFO]${NC}  $1"; }
success() { echo -e "${GREEN}[OK]${NC}    $1"; }
warn()    { echo -e "${YELLOW}[WARN]${NC}  $1"; }
fail()    { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

# ── Detect OS ──────────────────────────────────────────────
OS="$(uname -s)"
case "$OS" in
    Darwin) PLATFORM="macos" ;;
    Linux)  PLATFORM="linux" ;;
    *)      fail "Unsupported operating system: $OS. Use setup.bat for Windows." ;;
esac
info "Detected platform: $PLATFORM"

# ── Navigate to project root (where this script lives) ─────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"
info "Project root: $SCRIPT_DIR"

# ============================================================
#  1. CHECK / INSTALL PYTHON 3
# ============================================================
echo ""
info "────────────────────────────────────────────────"
info "Step 1: Checking Python 3 …"
info "────────────────────────────────────────────────"

if command -v python3 &>/dev/null; then
    PYTHON_VERSION=$(python3 --version 2>&1)
    success "Python 3 found: $PYTHON_VERSION"
else
    warn "Python 3 not found. Attempting to install …"
    if [ "$PLATFORM" = "macos" ]; then
        if command -v brew &>/dev/null; then
            info "Installing Python via Homebrew …"
            brew install python3
        else
            fail "Homebrew is not installed. Please install it first: https://brew.sh"
        fi
    else
        info "Installing Python via apt …"
        sudo apt update && sudo apt install -y python3 python3-pip python3-venv
    fi
    command -v python3 &>/dev/null || fail "Python 3 installation failed."
    success "Python 3 installed: $(python3 --version)"
fi

# Ensure pip is available
if ! python3 -m pip --version &>/dev/null; then
    warn "pip not found. Installing pip …"
    if [ "$PLATFORM" = "macos" ]; then
        python3 -m ensurepip --upgrade 2>/dev/null || brew install python3
    else
        sudo apt install -y python3-pip
    fi
fi
success "pip is available: $(python3 -m pip --version)"

# ============================================================
#  2. CHECK / INSTALL NODE.JS & NPM
# ============================================================
echo ""
info "────────────────────────────────────────────────"
info "Step 2: Checking Node.js & npm …"
info "────────────────────────────────────────────────"

if command -v node &>/dev/null; then
    NODE_VERSION=$(node --version)
    success "Node.js found: $NODE_VERSION"
else
    warn "Node.js not found. Attempting to install …"
    if [ "$PLATFORM" = "macos" ]; then
        if command -v brew &>/dev/null; then
            info "Installing Node.js via Homebrew …"
            brew install node
        else
            fail "Homebrew is not installed. Please install it first: https://brew.sh"
        fi
    else
        info "Installing Node.js via apt …"
        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
        sudo apt install -y nodejs
    fi
    command -v node &>/dev/null || fail "Node.js installation failed."
    success "Node.js installed: $(node --version)"
fi

if command -v npm &>/dev/null; then
    success "npm found: $(npm --version)"
else
    fail "npm is not available. Please install Node.js properly."
fi

# ============================================================
#  3. SET UP PYTHON VIRTUAL ENVIRONMENT (Backend)
# ============================================================
echo ""
info "────────────────────────────────────────────────"
info "Step 3: Setting up Python virtual environment …"
info "────────────────────────────────────────────────"

VENV_DIR="$SCRIPT_DIR/backend/venv"

if [ -d "$VENV_DIR" ]; then
    warn "Virtual environment already exists at backend/venv. Reusing it."
else
    info "Creating virtual environment at backend/venv …"
    python3 -m venv "$VENV_DIR" || fail "Failed to create virtual environment."
    success "Virtual environment created."
fi

# Activate the virtual environment
source "$VENV_DIR/bin/activate"
success "Virtual environment activated."

# ============================================================
#  4. INSTALL BACKEND DEPENDENCIES
# ============================================================
echo ""
info "────────────────────────────────────────────────"
info "Step 4: Installing backend Python dependencies …"
info "────────────────────────────────────────────────"

if [ -f "$SCRIPT_DIR/backend/requirements.txt" ]; then
    pip install --upgrade pip
    pip install -r "$SCRIPT_DIR/backend/requirements.txt"
    success "All backend dependencies installed."
else
    warn "backend/requirements.txt not found — skipping."
fi

# ============================================================
#  5. INSTALL FRONTEND DEPENDENCIES
# ============================================================
echo ""
info "────────────────────────────────────────────────"
info "Step 5: Installing frontend npm dependencies …"
info "────────────────────────────────────────────────"

if [ -f "$SCRIPT_DIR/frontend/package.json" ]; then
    cd "$SCRIPT_DIR/frontend"
    npm install
    success "All frontend dependencies installed."
    cd "$SCRIPT_DIR"
else
    warn "frontend/package.json not found — skipping."
fi

# ============================================================
#  6. CREATE .env FILE IF MISSING (Backend)
# ============================================================
echo ""
info "────────────────────────────────────────────────"
info "Step 6: Checking backend .env file …"
info "────────────────────────────────────────────────"

ENV_FILE="$SCRIPT_DIR/backend/.env"

if [ -f "$ENV_FILE" ]; then
    success ".env file already exists."
else
    warn ".env file not found. Creating a template …"
    cat > "$ENV_FILE" <<EOF
# ── FinCode Backend Environment Variables ──
FLASK_DEBUG=1
HOST=0.0.0.0
PORT=5000
MONGO_URI=mongodb://localhost:27017/fincode
SECRET_KEY=change-me-to-a-random-secret
EOF
    success ".env template created at backend/.env"
    warn "Please update backend/.env with your actual configuration!"
fi

# ============================================================
#  7. VERIFY INSTALLATION
# ============================================================
echo ""
info "────────────────────────────────────────────────"
info "Step 7: Verifying installation …"
info "────────────────────────────────────────────────"

echo ""
echo -e "${CYAN}  Python  :${NC} $(python3 --version)"
echo -e "${CYAN}  pip     :${NC} $(pip --version)"
echo -e "${CYAN}  Node.js :${NC} $(node --version)"
echo -e "${CYAN}  npm     :${NC} $(npm --version)"
echo ""

# Quick import test for critical Python packages
python3 -c "import flask; print('  Flask   : ' + flask.__version__)" 2>/dev/null && true
python3 -c "import pandas; print('  Pandas  : ' + pandas.__version__)" 2>/dev/null && true
python3 -c "import pymongo; print('  PyMongo : ' + pymongo.__version__)" 2>/dev/null && true

# Deactivate virtual environment
deactivate 2>/dev/null || true

# ============================================================
#  DONE 🎉
# ============================================================
echo ""
echo -e "${GREEN}============================================================${NC}"
echo -e "${GREEN}  ✅  Setup complete! All dependencies installed.${NC}"
echo -e "${GREEN}============================================================${NC}"
echo ""
echo -e "  ${CYAN}To start the backend:${NC}"
echo -e "    cd backend"
echo -e "    source venv/bin/activate"
echo -e "    python run.py"
echo ""
echo -e "  ${CYAN}To start the frontend:${NC}"
echo -e "    cd frontend"
echo -e "    npm run dev"
echo ""
echo -e "  ${YELLOW}Note:${NC} Make sure MongoDB is running before starting the backend."
echo ""
