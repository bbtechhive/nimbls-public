#!/usr/bin/env python3
"""Serve this marketing kit on loopback and open it in the default browser."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import threading
import webbrowser


class PreviewHandler(SimpleHTTPRequestHandler):
    """Always return current files during review, including through a tunnel."""

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def send_head(self):
        # Older browser entries must not turn a preview request into a 304.
        for header in ('If-Modified-Since', 'If-None-Match'):
            if header in self.headers:
                del self.headers[header]
        return super().send_head()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--no-browser', action='store_true', help='Print the preview address without opening a browser.')
    parser.add_argument('--port', type=int, default=0, help='Use a fixed local port (default: choose an available port).')
    args = parser.parse_args()
    folder = Path(__file__).resolve().parent
    if not (folder / 'index.html').is_file():
        raise SystemExit('The website is missing. Extract the complete ZIP and try again.')
    handler = partial(PreviewHandler, directory=str(folder))
    with ThreadingHTTPServer(('127.0.0.1', args.port), handler) as server:
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
