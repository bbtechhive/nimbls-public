#!/bin/bash
cd -- "$(dirname -- "$0")" || exit 1
if command -v python3 >/dev/null 2>&1; then
  python3 start_website.py
else
  echo 'Python 3 is needed to start the local website.'
  echo 'Install Python 3 from https://www.python.org/downloads/ or ask your IT team.'
  echo 'You can also open index.html directly to read the page.'
fi
printf '\nPress Return to close this window.'
read -r unused
