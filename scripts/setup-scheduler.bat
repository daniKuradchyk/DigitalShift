@echo off
REM ─── Setup Daily Auto-Blog Task ───────────────────────────────────
REM Run this file AS ADMINISTRATOR to create the scheduled task.
REM It will publish a new blog post every day at 9:00 AM.
REM ───────────────────────────────────────────────────────────────────

schtasks /create /tn "Qubelia-AutoBlog" /tr "C:\Users\DANIIL KURADCHIK\Documents\Qubelia\DigitalShift\scripts\publish-blog.bat" /sc daily /st 09:00 /f

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo  Tarea programada creada exitosamente!
    echo  Nombre: Qubelia-AutoBlog
    echo  Frecuencia: DIARIA a las 09:00
    echo ========================================
    echo.
    echo Para verificar:  schtasks /query /tn "Qubelia-AutoBlog"
    echo Para eliminar:   schtasks /delete /tn "Qubelia-AutoBlog" /f
    echo Para ejecutar ya: schtasks /run /tn "Qubelia-AutoBlog"
) else (
    echo.
    echo ERROR: No se pudo crear la tarea. Ejecuta este script como Administrador.
)

pause
