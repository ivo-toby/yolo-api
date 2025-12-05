# Streak Tracking Capability

## ADDED Requirements

### Requirement: Streak Calculation
The system SHALL calculate a user's current completion streak based on consecutive days with at least one completed task.

#### Scenario: Active streak calculation
- **WHEN** a GET request is made to /streak
- **AND** tasks have been completed on consecutive days including today
- **THEN** the server SHALL respond with status 200
- **AND** return `{"currentStreak": N, "lastCompletionDate": "<ISO-8601>"}`
- **AND** N SHALL equal the count of consecutive days

#### Scenario: No streak exists
- **WHEN** a GET request is made to /streak
- **AND** no tasks have been completed today or yesterday
- **THEN** the server SHALL respond with status 200
- **AND** return `{"currentStreak": 0, "lastCompletionDate": null}`

#### Scenario: Streak broken by missed day
- **WHEN** tasks were completed 2+ days ago but not yesterday or today
- **THEN** the current streak SHALL be 0
- **AND** the streak SHALL reset

#### Scenario: Multiple tasks in one day count once
- **WHEN** multiple tasks are completed on the same day
- **THEN** the day SHALL count once toward the streak
- **AND** SHALL not increment the streak multiple times

### Requirement: Productivity Statistics
The system SHALL provide aggregate statistics via GET /stats.

#### Scenario: Retrieve statistics
- **WHEN** a GET request is made to /stats
- **THEN** the server SHALL respond with status 200
- **AND** return JSON with totalTasks, completedTasks, incompleteTasks, completionRate, and currentStreak

#### Scenario: Completion rate calculation
- **WHEN** statistics are requested
- **THEN** completionRate SHALL equal (completedTasks / totalTasks) * 100
- **AND** SHALL be rounded to 2 decimal places

#### Scenario: Empty task list statistics
- **WHEN** no tasks exist
- **THEN** totalTasks SHALL be 0
- **AND** completionRate SHALL be 0
- **AND** currentStreak SHALL be 0

### Requirement: Streak Maintenance
The system SHALL update streak status when tasks are completed.

#### Scenario: Completing first task today extends streak
- **WHEN** a task is completed
- **AND** it is the first completion today
- **AND** tasks were completed yesterday
- **THEN** the streak SHALL increment by 1

#### Scenario: Completing additional tasks today maintains streak
- **WHEN** a task is completed
- **AND** tasks were already completed today
- **THEN** the streak SHALL remain unchanged

#### Scenario: Completing task after gap resets streak
- **WHEN** a task is completed
- **AND** the last completion was 2+ days ago
- **THEN** the streak SHALL reset to 1
