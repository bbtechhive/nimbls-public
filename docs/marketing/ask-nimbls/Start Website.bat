@echo off
cd /d "%~dp0"
where py >nul 2>nul
if not errorlevel 1 (
  py -3 -c "import sys; assert sys.version_info.major == 3" >nul 2>nul
  if not errorlevel 1 (
    py -3 start_website.py
    goto done
  )
)
where python >nul 2>nul
if not errorlevel 1 (
  python -c "import sys; assert sys.version_info.major == 3" >nul 2>nul
  if not errorlevel 1 (
    python start_website.py
    goto done
  )
)
echo Python 3 is needed to start the local website.
echo Install Python 3 from https://www.python.org/downloads/ or ask your IT team.
echo You can also open index.html directly to read the page.
:done
pause
