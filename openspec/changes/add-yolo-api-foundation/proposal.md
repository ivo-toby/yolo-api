# Change: Add Yolo API Foundation

## Why

Task management apps often worsen decision paralysis by forcing users to constantly prioritize and choose what to do next. When faced with a long todo list, people spend more time organizing and re-organizing than actually doing. Yolo API solves this by removing the choice burden—submit your tasks and let randomization decide what's next. This "just do it" approach reduces cognitive overhead and gamifies productivity through streak tracking, turning task completion into momentum rather than a planning exercise.

## What Changes

- **NEW**: Core task management API with randomized task selection
- **NEW**: Streak tracking system to gamify productivity
- **NEW**: Express + TypeScript REST API foundation
- **NEW**: Task CRUD operations (create, retrieve, complete, delete)
- **NEW**: Randomized task retrieval that considers incomplete tasks only
- **NEW**: Completion streak calculation and statistics

## Impact

- Affected specs: `task-management`, `streak-tracking`, `api-foundation` (all new)
- Affected code: New project—establishes initial API structure, routing, models, and business logic
- Breaking changes: None (initial implementation)
