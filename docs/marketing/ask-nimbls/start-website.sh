#!/bin/sh
cd -- "$(dirname -- "$0")" || exit 1
if command -v python3 >/dev/null 2>&1; then
  exec python3 start_website.py
fi
printf '%s\n' 'Python 3 is needed. Ask your IT team to install it, or open index.html directly.'
exit 1
