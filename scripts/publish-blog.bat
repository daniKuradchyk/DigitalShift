@echo off
REM ─── Daily Auto Blog Publisher ─────────────────────────────────────
REM Publishes one new SEO blog post every day.
REM Schedule with Windows Task Scheduler for daily execution.
REM ────────────────────────────────────────────────────────────────────

cd /d "C:\Users\DANIIL KURADCHIK\Documents\Qubelia\DigitalShift"

echo ──────────────────────────────────────── >> scripts\auto-blog.log
echo [%date% %time%] Starting daily blog publish... >> scripts\auto-blog.log

node scripts\auto-blog.cjs >> scripts\auto-blog.log 2>&1

if %ERRORLEVEL% EQU 0 (
    echo [%date% %time%] SUCCESS >> scripts\auto-blog.log
) else (
    echo [%date% %time%] FAILED with exit code %ERRORLEVEL% >> scripts\auto-blog.log
)

echo. >> scripts\auto-blog.log
