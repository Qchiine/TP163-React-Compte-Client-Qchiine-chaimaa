@echo off
title TP163-React-Compte-Client
chcp 65001 >nul
mode con: cols=120 lines=40
cd /d "%~dp0"

:menu
cls
echo ==============================================================================
echo   TP 9 - Application React : gestion des comptes bancaires
echo   React 19 / Bootstrap 5 / Axios  -  back-end sur http://localhost:8082
echo ==============================================================================
echo.
echo   ATTENTION : le back-end Spring Boot doit etre demarre sur le port 8082
echo               (dossier TP162-Spring-RestController-Qchiine-chaimaa, run.bat puis [1])
echo.
echo   [1] Lancer l'application React   (http://localhost:3000)
echo   [2] Suite de tests (npm test)
echo   [3] Build de production (npm run build)
echo   [4] Installer les dependances (npm install)
echo   [0] Quitter
echo.
set "choix="
set /p "choix=Votre choix : "
if "%choix%"=="1" goto :lancer
if "%choix%"=="2" goto :tests
if "%choix%"=="3" goto :build
if "%choix%"=="4" goto :install
if "%choix%"=="0" goto :fin
goto :menu

:lancer
cls
echo ==============================================================================
echo   React demarre sur http://localhost:3000
echo   Appuyez sur Ctrl+C dans cette fenetre pour l'arreter.
echo ==============================================================================
echo.
if not exist node_modules (
    echo node_modules absent : installation des dependances...
    call npm install
)
call npm start
goto :suspension

:tests
cls
echo Execution des tests React...
echo.
set "CI=true"
call npm test -- --watchAll=false
set "CI="
if errorlevel 1 goto :echec
goto :suspension

:build
cls
call npm run build
if errorlevel 1 goto :echec
echo.
echo Build termine dans le dossier build\
goto :suspension

:install
cls
call npm install
if errorlevel 1 goto :echec
echo.
echo Dependances installees.
goto :suspension

:echec
echo.
echo *** Echec de l'operation. ***
:suspension
echo.
echo ==============================================================================
echo   Fin de l'operation. Appuyez sur une touche pour revenir au menu.
echo ==============================================================================
pause >nul
goto :menu

:fin
exit /b 0
