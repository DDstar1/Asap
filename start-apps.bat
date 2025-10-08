@echo off

echo Do you want to clear cache before starting? (Y/N)
set /p clear_cache=

if /i "%clear_cache%"=="Y" (
    set cache_flag=-c
    echo Cache will be cleared...
) else (
    set cache_flag=
    echo Starting without clearing cache...
)

timeout /t 1 /nobreak >nul

wt new-tab --title "Customer App" --suppressApplicationTitle cmd /k "cd /d \"%~dp0apps\customer\" && npx expo start --port 8081 %cache_flag%" ^
    ; split-pane -V --title "Rider App" --suppressApplicationTitle cmd /k "cd /d \"%~dp0apps\rider\" && timeout /t 2 /nobreak >nul && npx expo start --port 8082 %cache_flag%"