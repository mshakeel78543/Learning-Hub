@echo off
color 0A
title API Security Learning Platform - Quick Start

echo ========================================
echo API Security Learning Platform
echo Quick Start Launcher
echo ========================================
echo.

:menu
echo Choose an option:
echo.
echo 1. Start Development Server
echo 2. Install Dependencies
echo 3. Open in Browser
echo 4. Exit
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto startdev
if "%choice%"=="2" goto install
if "%choice%"=="3" goto browser
if "%choice%"=="4" goto exit
goto menu

:startdev
echo.
echo Starting development server...
echo.
echo Press Ctrl+C to stop the server
echo.
npm run dev
pause
goto menu

:install
echo.
echo Installing dependencies...
echo.
npm install
echo.
echo Installation complete!
pause
goto menu

:browser
echo.
echo Opening browser...
start http://localhost:3000
goto menu

:exit
echo.
echo Goodbye! Happy Learning!
timeout /t 2
exit
