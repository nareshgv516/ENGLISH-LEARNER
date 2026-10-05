@echo off
title English Learner - Enable Mobile Wi-Fi Access
color 0A
cls
echo ======================================================================
echo       ENGLISH LEARNER AI - MOBILE WI-FI ACCESS CONFIGURATOR
echo ======================================================================
echo.
echo 1. Opening Inbound Port 5174 in Windows Defender Firewall...
netsh advfirewall firewall add rule name="Vite Dev Server 5174" dir=in action=allow protocol=TCP localport=5174 profile=any

echo.
echo 2. Setting Wi-Fi Connection Profile to Private (allows phone access)...
powershell -Command "Set-NetConnectionProfile -InterfaceAlias 'Wi-Fi' -NetworkCategory Private -ErrorAction SilentlyContinue"

echo.
echo ======================================================================
echo [SUCCESS] Your PC is now allowing incoming connections on port 5174!
echo.
echo To open on your mobile phone:
echo 1. Make sure your phone is connected to the same Wi-Fi (Daksha Carnival)
echo 2. Open Chrome or Safari on your phone and go to:
echo.
echo        http://10.0.0.32:5174/
echo.
echo ======================================================================
pause
