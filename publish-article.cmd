@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js 22 or newer is required.
  pause
  exit /b 1
)
call npm run publish
if errorlevel 1 (
  echo.
  echo Publishing did not finish. Check the error above.
  pause
  exit /b 1
)
echo.
echo Article pushed. GitHub Actions is updating the website.
pause
