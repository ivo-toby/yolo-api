# Example Scripts

This directory contains simple bash scripts to test the Yolo API endpoints using curl.

## Prerequisites

- `curl` installed
- `jq` installed (for JSON formatting)
- Yolo API server running on `http://localhost:3000`

## Quick Start

```bash
# Start the server first
npm run dev

# Then run the example scripts
```

## Scripts

### create-task.sh
Create a new task.

```bash
# Basic usage
./create-task.sh "Write documentation"

# With difficulty
./create-task.sh "Clean desk" "easy"

# With difficulty and description
./create-task.sh "Write blog post" "hard" "Complete the API tutorial"
```

### get-next.sh
Get a random incomplete task (the YOLO way!).

```bash
./get-next.sh
```

### list-tasks.sh
List all tasks or filter by status.

```bash
# List all tasks
./list-tasks.sh

# List incomplete tasks
./list-tasks.sh incomplete

# List completed tasks
./list-tasks.sh completed
```

### complete-task.sh
Mark a task as completed.

```bash
./complete-task.sh TASK_ID
```

### get-stats.sh
View productivity statistics and current streak.

```bash
./get-stats.sh
```

### delete-task.sh
Delete a task.

```bash
./delete-task.sh TASK_ID
```

## Full Test Suite

Run the comprehensive test script from the project root:

```bash
cd ..
./test-api.sh
```

This will test all endpoints and error scenarios.

## Example Workflow

```bash
# 1. Create some tasks
./create-task.sh "Clean desk" "easy"
./create-task.sh "Write blog post" "hard" "Complete tutorial"
./create-task.sh "Review PR" "medium"

# 2. List incomplete tasks
./list-tasks.sh incomplete

# 3. Get a random task to work on
./get-next.sh

# 4. Complete it (replace with actual task ID)
./complete-task.sh 550e8400-e29b-41d4-a716-446655440000

# 5. Check your stats
./get-stats.sh
```
