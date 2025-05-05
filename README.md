# SecureNotes

A simple note-taking application with user authentication.

## Project Overview

SecureNotes is a lightweight note-taking application that allows users to create and manage personal notes securely. The application implements user authentication to ensure that notes are only accessible to their creators.

## Tech Stack

- **Backend**: Node.js with Express (TypeScript)
- **Frontend**: React (TypeScript)

## Features

- User authentication with token-based security
- Create and view personal notes
- Responsive user interface
- Secure API endpoints with authentication verification

## Requirements Implementation

### Backend

1. **User Authentication**
   - Implemented login for a hardcoded user
   - JWT token issued with 15-minute expiration
   - Token verification middleware for protected routes

2. **Notes Management**
   - RESTful API endpoints for listing and creating notes
   - Each note includes id, text content, and creation timestamp

3. **Access Control**
   - All note-related endpoints protected with authentication
   - Unauthorized requests rejected with appropriate error messages

4. **Validation & Error Handling**
   - Input validation for all API requests
   - Consistent error response format with appropriate HTTP status codes

5. **Automated Tests**
   - Unit tests for authentication flows
   - Integration tests for notes functionality

### Frontend

1. **Authentication Flow**
   - Login form with validation
   - Token storage in localStorage with expiration handling
   - Automatic redirection for unauthenticated users

2. **Notes Interface**
   - Clean UI for displaying existing notes
   - Form for adding new notes with success/error feedback

3. **Routing & Protection**
   - Protected routes using React Router
   - Authentication state management with context API

## Setup Instructions

### Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test
```

### Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test
```

## Trade-offs and Future Improvements

- Currently using a hardcoded user for simplicity; would implement proper user registration and database storage such as mongodb
- Add note editing and deletion functionality
- Implement categories or tags for better note organization
- Add end-to-end testing
- Improve UI/UX with animations and dark mode
- Implement data persistence with a proper database instead of in-memory storage 
- Deployment 
