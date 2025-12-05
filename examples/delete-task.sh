#!/bin/bash

# Delete a task by ID
# Usage: ./delete-task.sh TASK_ID

if [ -z "$1" ]; then
  echo "Usage: ./delete-task.sh TASK_ID"
  exit 1
fi

TASK_ID=$1

curl -X DELETE http://localhost:3000/tasks/$TASK_ID -w "\nHTTP Status: %{http_code}\n"
