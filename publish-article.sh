#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")"
command -v node >/dev/null 2>&1 || { echo "Node.js 22 or newer is required." >&2; exit 1; }
npm run publish
