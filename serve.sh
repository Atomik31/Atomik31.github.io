#!/usr/bin/env bash
cd "$(dirname "$0")"
PORT="${1:-8081}"
echo "Portfolio: http://localhost:${PORT}/"
echo "Dossier servi: $(pwd)"
python3 -m http.server "$PORT"