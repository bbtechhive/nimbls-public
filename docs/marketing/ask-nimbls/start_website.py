#!/usr/bin/env python3
"""Serve this marketing kit on loopback and open it in the default browser."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import threading
import webbrowser


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--no-browser', action='store_true', help='Print the preview address without opening a browser.')
    args = parser.parse_args()
    folder = Path(__file__).resolve().parent
    if not (folder / 'index.html').is_file():
        raise SystemExit('The website is missing. Extract the complete ZIP and try again.')
    handler = partial(SimpleHTTPRequestHandler, directory=str(folder))
    with ThreadingHTTPServer(('127.0.0.1', 0), handler) as server:
        url = f'http://127.0.0.1:{server.server_port}/'
        print('\nnimbls marketing toolkit', flush=True)
        print(f'Open this address in your browser: {url}', flush=True)
        print('Keep this window open while using the website.', flush=True)
        print('Press Ctrl+C in this window to stop. This preview is only available on this computer.\n', flush=True)
        if not args.no_browser:
            opener = threading.Timer(0.3, webbrowser.open, args=(url,))
            opener.daemon = True
            opener.start()
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print('\nWebsite stopped. You can close this window.', flush=True)


if __name__ == '__main__':
    main()
