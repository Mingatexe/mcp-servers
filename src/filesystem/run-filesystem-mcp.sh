#!/usr/bin/env bash
set -euo pipefail
cd ""
NODE="/usr/local/opt/node@22/bin/node"
if [ -z "" ]; then
  echo "node not found in PATH; aborting" >&2
  exit 1
fi
# kill previous pid if exists and points to a running process (safe)
if [ -f "/Users/macos/highlight-filesystem-mcp.pid" ]; then
  OLDPID="0"
  if [ -n "" ] && kill -0 "" 2>/dev/null; then
    echo "killing old pid "
    kill "" || true
    sleep 0.5
  fi
fi
# start in background, redirect logs
nohup "" dist/index.js > "/Users/macos/highlight-filesystem-mcp.log" 2>&1 &
echo 0 > "/Users/macos/highlight-filesystem-mcp.pid"
echo "started pid 0, logs: /Users/macos/highlight-filesystem-mcp.log"
