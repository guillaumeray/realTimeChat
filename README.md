# Chat Application

This is a real-time chat application built with React on the frontend and Node.js on the backend.

## Preview

App preview available : https://realtimechat-frontend.onrender.com/

Deploy with Render.com


## Frontend

The frontend of the application is built with React. It includes a login system where users can enter their pseudo name to join the chat. Once logged in, users can send messages that are displayed in a message list. The frontend communicates with the backend through a WebSocket connection, using the Socket.IO library.

The frontend also includes the following features:

- Users can see a list of all messages sent since they logged in.
- The "Login" button is disabled and turned grey when a user is logged in.
- A message is displayed when a user is not logged in.
- The application has a basic responsive design.

## Backend

The backend of the application is built with Node.js and Express. It sets up a WebSocket server using the Socket.IO library to handle real-time communication with the frontend.

When a user sends a message from the frontend, the backend broadcasts the message to all connected clients, including the one that sent the message.

## Running the Application

To run the application, you need to start both the frontend and the backend servers.

### Frontend

Navigate to the frontend directory and run the following commands:

```bash
npm install
npm start
```

The frontend server will start on http://localhost:3000.

### Backend
Navigate to the backend directory and run the following commands:

```bash
npm install
npm run dev
```

The backend server will start on http://localhost:3001.