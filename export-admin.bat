@echo off
title Export Standalone Admin Panel
echo ==============================================================================
echo   STANDALONE ADMIN PANEL EXPORTER
echo   Extracts the Admin Panel, REST APIs, Auth, and Database Engine
echo ==============================================================================
echo.

set TARGET_DIR=..\admin-panel

if not "%1"=="" (
    set TARGET_DIR=%1
)

echo Target Folder: %TARGET_DIR%
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0export-admin.ps1" -TargetDir "%TARGET_DIR%"

echo.
pause
