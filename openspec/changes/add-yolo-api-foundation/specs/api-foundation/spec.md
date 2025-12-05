# API Foundation Capability

## ADDED Requirements

### Requirement: Express Server Configuration
The system SHALL provide a RESTful API server built with Express and TypeScript.

#### Scenario: Server starts successfully
- **WHEN** the application is started
- **THEN** the Express server SHALL listen on the configured port
- **AND** log the startup message

#### Scenario: JSON request parsing
- **WHEN** a client sends a request with JSON body
- **THEN** the server SHALL parse the JSON automatically
- **AND** make it available in request handlers

### Requirement: Health Check Endpoint
The system SHALL provide a health check endpoint for monitoring.

#### Scenario: Health check success
- **WHEN** a GET request is made to /health
- **THEN** the server SHALL respond with status 200
- **AND** return JSON `{"status": "ok", "timestamp": "<ISO-8601>"}`

### Requirement: Error Handling
The system SHALL handle errors gracefully and return appropriate HTTP status codes.

#### Scenario: Validation error response
- **WHEN** a request contains invalid data
- **THEN** the server SHALL respond with status 400
- **AND** return JSON with error details `{"error": "message"}`

#### Scenario: Resource not found
- **WHEN** a request references a non-existent resource
- **THEN** the server SHALL respond with status 404
- **AND** return JSON `{"error": "Resource not found"}`

#### Scenario: Internal server error
- **WHEN** an unexpected error occurs
- **THEN** the server SHALL respond with status 500
- **AND** return JSON `{"error": "Internal server error"}`
- **AND** log the full error details

### Requirement: CORS Configuration
The system SHALL allow cross-origin requests for API access.

#### Scenario: CORS headers present
- **WHEN** any request is made to the API
- **THEN** the response SHALL include appropriate CORS headers
- **AND** allow requests from any origin (for MVP)
