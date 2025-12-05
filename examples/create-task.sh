#!/bin/bash

# Create a new task
# Usage: ./create-task.sh "Task title" [difficulty] [description]

TITLE=${1:-"Example Task"}
DIFFICULTY=${2:-"medium"}
DESCRIPTION=${3:-""}

curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d "{\"title\": \"$TITLE\", \"difficulty\": \"$DIFFICULTY\", \"description\": \"$DESCRIPTION\"}" \
  | jq '.'
