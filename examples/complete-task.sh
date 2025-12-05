#!/bin/bash

# Complete a task by ID
# Usage: ./complete-task.sh TASK_ID

if [ -z "$1" ]; then
  echo "Usage: ./complete-task.sh TASK_ID"
  exit 1
fi

TASK_ID=$1

curl -X POST http://localhost:3000/tasks/$TASK_ID/complete | jq '.'
