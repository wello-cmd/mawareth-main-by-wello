@echo off
echo Starting Mawareth Application...

echo Starting Backend...
start "Mawareth Backend" cmd /k "cd mawareth-backend && npm run dev"

echo Starting Frontend...
start "Mawareth Frontend" cmd /k "cd mawareth-frontend && npm run dev"

echo Application started!
echo Backend running on http://localhost:5000
echo Frontend running on http://localhost:5173
echo.
pause
