@echo off
REM ─── Auto Blog Publisher ───────────────────────────────────────────
REM Runs the auto-blog script to generate, commit and push a new post.
REM Schedule this with Windows Task Scheduler for weekly execution.
REM ────────────────────────────────────────────────────────────────────

cd /d "C:\Users\DANIIL KURADCHIK\Documents\Qubelia\DigitalShift"

echo [%date% %time%] Starting auto-blog generation... >> scripts\auto-blog.log

node scripts\auto-blog.cjs >> scripts\auto-blog.log 2>&1

if %ERRORLEVEL% EQU 0 (
    echo [%date% %time%] SUCCESS >> scripts\auto-blog.log
) else (
    echo [%date% %time%] FAILED with exit code %ERRORLEVEL% >> scripts\auto-blog.log
)

echo. >> scripts\auto-blog.log
