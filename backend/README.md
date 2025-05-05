# Getting Started with SecureNotes - Backend

## Prerequisites
- Node.js (v14 or higher recommended)
- npm (v6 or higher recommended)

## Dependencies
- **Main Dependencies**:
  - express: ^4.18.2 - Web framework for Node.js
  - cors: ^2.8.5 - CORS middleware for Express
  - dotenv: ^16.5.0 - Environment variable loader
  - jsonwebtoken: ^9.0.2 - JWT implementation for authentication

- **Development Dependencies**:
  - typescript: ^5.8.3 - TypeScript language
  - ts-node: ^10.9.2 - TypeScript execution environment
  - Various TypeScript type definitions (@types packages)

- Make sure to replace the <code>JWT_SECRET</code> value

## Installation
```
npm install
```

## Available Scripts

In the project directory, you can run:

```
npm run build 
npm start
```

- `npm run build`: Compiles TypeScript code to JavaScript
- `npm start`: Runs the compiled application
- `npm run dev`: Runs the application in development mode with ts-node

### Backend Tests

The backend uses Jest and Supertest for testing API endpoints and services:

```bash
# Run backend tests
cd backend
npm test

# Run with watch mode
npm run test:watch
```

Tests include:
- Unit tests for authentication and note services
- Integration tests for API endpoints
- JWT token validation
- Input validation

## Running the App
The backend server will start on [http://localhost:8000](http://localhost:8000). 
<br>This will run in the background and does not need to be opened in a browser.
