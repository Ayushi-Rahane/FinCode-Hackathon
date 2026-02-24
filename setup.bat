@echo off
REM ============================================================
REM  FinCode Hackathon — One-Time Setup Script (Windows)
REM ============================================================
REM  Prerequisites: Git must be installed.
REM  This script will:
REM    - Check for Python 3 and Node.js (prompts to install if missing)
REM    - Create a Python virtual environment for the backend
REM    - Install all backend pip dependencies
REM    - Install all frontend npm dependencies
REM    - Create a .env template if missing
REM    - Verify the installation
REM
REM  Usage:
REM    Double-click setup.bat  OR  run in Command Prompt
REM ============================================================

title FinCode Hackathon Setup
setlocal enabledelayedexpansion

REM ── Navigate to the directory where this script is located ──
cd /d "%~dp0"
echo.
echo ============================================================
echo   FinCode Hackathon — One-Time Setup
echo ============================================================
echo   Project root: %cd%
echo ============================================================
echo.

REM ============================================================
REM  1. CHECK PYTHON 3
REM ============================================================
echo [INFO]  Step 1: Checking Python 3 ...
echo --------------------------------------------------------

where python >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%v in ('python --version 2^>^&1') do set PYTHON_VER=%%v
    echo [OK]    Python found: !PYTHON_VER!
    set PYTHON_CMD=python
) else (
    where python3 >nul 2>&1
    if !errorlevel! equ 0 (
        for /f "tokens=*" %%v in ('python3 --version 2^>^&1') do set PYTHON_VER=%%v
        echo [OK]    Python found: !PYTHON_VER!
        set PYTHON_CMD=python3
    ) else (
        echo [ERROR] Python 3 is NOT installed.
        echo.
        echo         Please download and install Python 3.10+ from:
        echo         https://www.python.org/downloads/
        echo.
        echo         IMPORTANT: Check "Add Python to PATH" during installation!
        echo.
        echo         After installing, close this window and run setup.bat again.
        echo.
        pause
        exit /b 1
    )
)

REM Verify pip is available
%PYTHON_CMD% -m pip --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARN]  pip not found. Attempting to install ...
    %PYTHON_CMD% -m ensurepip --upgrade
    if !errorlevel! neq 0 (
        echo [ERROR] Failed to install pip. Please reinstall Python with pip included.
        pause
        exit /b 1
    )
)
echo [OK]    pip is available.
echo.

REM ============================================================
REM  2. CHECK NODE.JS & NPM
REM ============================================================
echo [INFO]  Step 2: Checking Node.js and npm ...
echo --------------------------------------------------------

where node >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%v in ('node --version') do set NODE_VER=%%v
    echo [OK]    Node.js found: !NODE_VER!
) else (
    echo [ERROR] Node.js is NOT installed.
    echo.
    echo         Please download and install Node.js LTS from:
    echo         https://nodejs.org/
    echo.
    echo         After installing, close this window and run setup.bat again.
    echo.
    pause
    exit /b 1
)

where npm >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%v in ('npm --version') do set NPM_VER=%%v
    echo [OK]    npm found: !NPM_VER!
) else (
    echo [ERROR] npm is not available. Please reinstall Node.js.
    pause
    exit /b 1
)
echo.

REM ============================================================
REM  3. SET UP PYTHON VIRTUAL ENVIRONMENT (Backend)
REM ============================================================
echo [INFO]  Step 3: Setting up Python virtual environment ...
echo --------------------------------------------------------

set VENV_DIR=backend\venv

if exist "%VENV_DIR%\Scripts\activate.bat" (
    echo [WARN]  Virtual environment already exists. Reusing it.
) else (
    echo [INFO]  Creating virtual environment at backend\venv ...
    %PYTHON_CMD% -m venv "%VENV_DIR%"
    if !errorlevel! neq 0 (
        echo [ERROR] Failed to create virtual environment.
        echo         Make sure the 'venv' module is available.
        echo         On some systems, run: pip install virtualenv
        pause
        exit /b 1
    )
    echo [OK]    Virtual environment created.
)

REM Activate the virtual environment
call "%VENV_DIR%\Scripts\activate.bat"
echo [OK]    Virtual environment activated.
echo.

REM ============================================================
REM  4. INSTALL BACKEND DEPENDENCIES
REM ============================================================
echo [INFO]  Step 4: Installing backend Python dependencies ...
echo --------------------------------------------------------

if exist "backend\requirements.txt" (
    pip install --upgrade pip
    pip install -r backend\requirements.txt
    if !errorlevel! neq 0 (
        echo [ERROR] Failed to install some Python packages.
        echo         Check the error messages above.
        pause
        exit /b 1
    )
    echo [OK]    All backend dependencies installed.
) else (
    echo [WARN]  backend\requirements.txt not found — skipping.
)
echo.

REM ============================================================
REM  5. INSTALL FRONTEND DEPENDENCIES
REM ============================================================
echo [INFO]  Step 5: Installing frontend npm dependencies ...
echo --------------------------------------------------------

if exist "frontend\package.json" (
    cd frontend
    npm install
    if !errorlevel! neq 0 (
        echo [ERROR] Failed to install npm packages.
        echo         Check the error messages above.
        cd ..
        pause
        exit /b 1
    )
    echo [OK]    All frontend dependencies installed.
    cd ..
) else (
    echo [WARN]  frontend\package.json not found — skipping.
)
echo.

REM ============================================================
REM  6. CREATE .env FILE IF MISSING (Backend)
REM ============================================================
echo [INFO]  Step 6: Checking backend .env file ...
echo --------------------------------------------------------

if exist "backend\.env" (
    echo [OK]    .env file already exists.
) else (
    echo [WARN]  .env file not found. Creating a template ...
    (
        echo # ── FinCode Backend Environment Variables ──
        echo FLASK_DEBUG=1
        echo HOST=0.0.0.0
        echo PORT=5000
        echo MONGO_URI=mongodb://localhost:27017/fincode
        echo SECRET_KEY=change-me-to-a-random-secret
    ) > "backend\.env"
    echo [OK]    .env template created at backend\.env
    echo [WARN]  Please update backend\.env with your actual configuration!
)
echo.

REM ============================================================
REM  7. VERIFY INSTALLATION
REM ============================================================
echo [INFO]  Step 7: Verifying installation ...
echo --------------------------------------------------------
echo.

echo   Python  : & %PYTHON_CMD% --version
echo   pip     : & pip --version
echo   Node.js : & node --version
echo   npm     : & npm --version
echo.

REM Quick import test for critical Python packages
%PYTHON_CMD% -c "import flask; print('  Flask   : ' + flask.__version__)" 2>nul
%PYTHON_CMD% -c "import pandas; print('  Pandas  : ' + pandas.__version__)" 2>nul
%PYTHON_CMD% -c "import pymongo; print('  PyMongo : ' + pymongo.__version__)" 2>nul
echo.

REM Deactivate virtual environment
call deactivate 2>nul

REM ============================================================
REM  DONE
REM ============================================================
echo.
echo ============================================================
echo   Setup complete! All dependencies installed.
echo ============================================================
echo.
echo   To start the backend:
echo     cd backend
echo     venv\Scripts\activate
echo     python run.py
echo.
echo   To start the frontend:
echo     cd frontend
echo     npm run dev
echo.
echo   Note: Make sure MongoDB is running before starting the backend.
echo.
pause
