# Task Management Capability

## ADDED Requirements

### Requirement: Task Data Model
The system SHALL represent tasks with the following properties: id (unique string), title (string), description (optional string), difficulty (enum: easy|medium|hard), createdAt (ISO-8601 timestamp), and completedAt (nullable ISO-8601 timestamp).

#### Scenario: Task creation with all fields
- **WHEN** a task is created with title, description, and difficulty
- **THEN** the system SHALL assign a unique id
- **AND** set createdAt to current timestamp
- **AND** set completedAt to null

#### Scenario: Task creation with minimal fields
- **WHEN** a task is created with only a title
- **THEN** the system SHALL use default difficulty "medium"
- **AND** set description to empty string

### Requirement: Create Task
The system SHALL allow users to add new tasks via POST /tasks.

#### Scenario: Successful task creation
- **WHEN** a POST request is made to /tasks with `{"title": "Example task", "difficulty": "hard"}`
- **THEN** the server SHALL respond with status 201
- **AND** return the created task object with id and timestamps
- **AND** add the task to the task store

#### Scenario: Missing required title
- **WHEN** a POST request is made to /tasks without a title
- **THEN** the server SHALL respond with status 400
- **AND** return `{"error": "Title is required"}`

#### Scenario: Invalid difficulty level
- **WHEN** a POST request includes difficulty not in [easy, medium, hard]
- **THEN** the server SHALL respond with status 400
- **AND** return `{"error": "Invalid difficulty level"}`

### Requirement: List Tasks
The system SHALL allow users to retrieve all tasks via GET /tasks with optional filtering.

#### Scenario: List all tasks
- **WHEN** a GET request is made to /tasks
- **THEN** the server SHALL respond with status 200
- **AND** return JSON array of all tasks ordered by createdAt descending

#### Scenario: Filter incomplete tasks
- **WHEN** a GET request is made to /tasks?status=incomplete
- **THEN** the server SHALL respond with status 200
- **AND** return only tasks where completedAt is null

#### Scenario: Filter completed tasks
- **WHEN** a GET request is made to /tasks?status=completed
- **THEN** the server SHALL respond with status 200
- **AND** return only tasks where completedAt is not null

### Requirement: Random Task Selection
The system SHALL provide a randomized task selection endpoint via GET /next.

#### Scenario: Get next random task
- **WHEN** a GET request is made to /next
- **AND** incomplete tasks exist
- **THEN** the server SHALL respond with status 200
- **AND** return a single randomly-selected incomplete task

#### Scenario: No incomplete tasks available
- **WHEN** a GET request is made to /next
- **AND** no incomplete tasks exist
- **THEN** the server SHALL respond with status 404
- **AND** return `{"error": "No tasks available"}`

#### Scenario: Randomization is fair
- **WHEN** multiple requests are made to /next
- **THEN** different incomplete tasks SHOULD be selected over time
- **AND** each incomplete task SHALL have equal probability of selection

### Requirement: Complete Task
The system SHALL allow users to mark tasks as complete via POST /tasks/:id/complete.

#### Scenario: Successfully complete a task
- **WHEN** a POST request is made to /tasks/123/complete
- **AND** task 123 exists and is incomplete
- **THEN** the server SHALL respond with status 200
- **AND** set the task's completedAt to current timestamp
- **AND** return the updated task object

#### Scenario: Task not found
- **WHEN** a POST request is made to /tasks/999/complete
- **AND** task 999 does not exist
- **THEN** the server SHALL respond with status 404
- **AND** return `{"error": "Task not found"}`

#### Scenario: Task already completed
- **WHEN** a POST request is made to /tasks/123/complete
- **AND** task 123 is already completed
- **THEN** the server SHALL respond with status 400
- **AND** return `{"error": "Task already completed"}`

### Requirement: Delete Task
The system SHALL allow users to delete tasks via DELETE /tasks/:id.

#### Scenario: Successfully delete a task
- **WHEN** a DELETE request is made to /tasks/123
- **AND** task 123 exists
- **THEN** the server SHALL respond with status 204
- **AND** remove the task from the task store

#### Scenario: Delete non-existent task
- **WHEN** a DELETE request is made to /tasks/999
- **AND** task 999 does not exist
- **THEN** the server SHALL respond with status 404
- **AND** return `{"error": "Task not found"}`
