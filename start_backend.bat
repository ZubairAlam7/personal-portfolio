@echo off
echo Finding process on port 8000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8000 ^| findstr LISTENING') do (
    echo Killing PID %%a
    taskkill /f /pid %%a 2>nul
)
timeout /t 2 /nobreak >nul
echo Starting fresh backend...
cd /d C:\Users\zubai\Desktop\Portfolio\backend
call venv\Scripts\activate
uvicorn main:app --reload --port 8000
