# Yolo API

Anti-procrastination task management API that helps users overcome decision paralysis by randomizing their task queue. Instead of agonizing over what to do next, users submit tasks and the API selects them randomly, removing the cognitive burden of prioritization.

## Features

- **Randomized Task Selection**: GET /next returns a random incomplete task
- **Streak Tracking**: Track consecutive days with task completions
- **Task Management**: Full CRUD operations for tasks
- **Difficulty Levels**: Categorize tasks as easy, medium, or hard
- **Statistics**: View completion rates and productivity metrics

## Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Build the project
npm run build

# Start the server
npm start
```

### Development

```bash
# Run in development mode with auto-reload
npm run dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Health Check

**GET /health**

Check if the API is running.

**Response (200 OK):**
```json
{
  "status": "ok",
  "timestamp": "2025-12-05T14:30:00.000Z"
}
```

---

### Task Management

**POST /tasks**

Create a new task.

**Request Body:**
```json
{
  "title": "Write documentation",
  "description": "Complete API documentation",
  "difficulty": "medium"
}
```

Fields:
- `title` (required): Task title
- `description` (optional): Task description
- `difficulty` (optional): One of `easy`, `medium`, `hard` (defaults to `medium`)

**Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Write documentation",
  "description": "Complete API documentation",
  "difficulty": "medium",
  "createdAt": "2025-12-05T14:30:00.000Z",
  "completedAt": null
}
```

**Error Responses:**
- `400 Bad Request`: Missing or invalid title
- `400 Bad Request`: Invalid difficulty level

---

**GET /tasks**

Retrieve all tasks with optional filtering.

**Query Parameters:**
- `status` (optional): Filter by `completed` or `incomplete`

**Examples:**
```bash
# Get all tasks
GET /tasks

# Get only incomplete tasks
GET /tasks?status=incomplete

# Get only completed tasks
GET /tasks?status=completed
```

**Response (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Write documentation",
    "description": "Complete API documentation",
    "difficulty": "medium",
    "createdAt": "2025-12-05T14:30:00.000Z",
    "completedAt": null
  }
]
```

---

**GET /next**

Get a random incomplete task (the core "YOLO" feature).

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Write documentation",
  "description": "Complete API documentation",
  "difficulty": "medium",
  "createdAt": "2025-12-05T14:30:00.000Z",
  "completedAt": null
}
```

**Error Response:**
- `404 Not Found`: No incomplete tasks available
  ```json
  {
    "error": "No tasks available"
  }
  ```

---

**POST /tasks/:id/complete**

Mark a task as completed.

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Write documentation",
  "description": "Complete API documentation",
  "difficulty": "medium",
  "createdAt": "2025-12-05T14:30:00.000Z",
  "completedAt": "2025-12-05T15:45:00.000Z"
}
```

**Error Responses:**
- `404 Not Found`: Task not found
- `400 Bad Request`: Task already completed

---

**DELETE /tasks/:id**

Delete a task.

**Response (204 No Content)**

**Error Response:**
- `404 Not Found`: Task not found

---

### Streak Tracking

**GET /streak**

Get current completion streak.

**Response (200 OK):**
```json
{
  "currentStreak": 5,
  "lastCompletionDate": "2025-12-05T15:45:00.000Z"
}
```

Streak calculation:
- Counts consecutive days with at least one completed task
- Multiple completions on the same day count as one day
- Streak resets if more than one day passes without a completion

---

**GET /stats**

Get productivity statistics.

**Response (200 OK):**
```json
{
  "totalTasks": 10,
  "completedTasks": 7,
  "incompleteTasks": 3,
  "completionRate": 70.00,
  "currentStreak": 5
}
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
NODE_ENV=development
```

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)

## Project Structure

```
yolo-api/
├── src/
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Express middleware
│   ├── models/           # Data models and interfaces
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── app.ts            # Express app configuration
│   └── server.ts         # Server entry point
├── dist/                 # Compiled JavaScript (generated)
├── .env                  # Environment variables
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies
```

## Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Storage**: In-memory (for MVP)

## Example Workflow

```bash
# 1. Add some tasks
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Clean desk", "difficulty": "easy"}'

curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Write blog post", "difficulty": "hard"}'

curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Review PR", "difficulty": "medium"}'

# 2. Get a random task (the YOLO way!)
curl http://localhost:3000/next

# 3. Complete the task
curl -X POST http://localhost:3000/tasks/{id}/complete

# 4. Check your streak
curl http://localhost:3000/streak

# 5. View your stats
curl http://localhost:3000/stats
```

## Philosophy

**YOLO API** embraces the "You Only Live Once" mindset by eliminating overthinking. The randomized task selection removes the paralysis of choice, encouraging action over endless planning. The streak tracking adds gamification to keep you motivated and building momentum.

## License

ISC
