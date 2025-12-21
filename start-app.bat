@echo off
echo Starting Mawareth Application...

:: Check and Install Backend Dependencies
if not exist "mawareth-backend\node_modules" (
    echo Backend dependencies not found. Installing...
    cd mawareth-backend
    call npm install
    cd ..
) else (
    echo Backend dependencies found.
)

:: Check and Install Frontend Dependencies
if not exist "mawareth-frontend\node_modules" (
    echo Frontend dependencies not found. Installing...
    cd mawareth-frontend
    call npm install
    cd ..
) else (
    echo Frontend dependencies found.
)

echo Cleaning up existing processes...
:: Kill process on port 5000 (Backend)
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5000" ^| find "LISTENING"') do taskkill /f /pid %%a >nul 2>&1
:: Kill process on port 5173 (Frontend)
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5173" ^| find "LISTENING"') do taskkill /f /pid %%a >nul 2>&1

echo Starting Backend...
start "Mawareth Backend" cmd /k "cd mawareth-backend && npm run dev"

echo Starting Frontend...
start "Mawareth Frontend" cmd /k "cd mawareth-frontend && npm run dev"

echo Application started!
echo Backend running on http://localhost:5000
echo Frontend running on http://localhost:5173
echo.
pause
