#!/bin/bash

# List tasks with optional filtering
# Usage: ./list-tasks.sh [incomplete|completed]

STATUS=$1

if [ -z "$STATUS" ]; then
  echo "📋 All tasks:"
  curl -s http://localhost:3000/tasks | jq '.'
else
  echo "📋 $STATUS tasks:"
  curl -s "http://localhost:3000/tasks?status=$STATUS" | jq '.'
fi
