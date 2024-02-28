# Chat Application Backend

This is the backend for a simple chat application. It's built with Node.js, Express, and Socket.IO, and uses MongoDB to store chat messages.

## Features

- Real-time chat functionality with Socket.IO
- Stores chat messages in MongoDB
- CORS enabled
- Listens for new connections, chat messages, and requests to clear all messages

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm
- MongoDB

### Installing

1. Clone the repository: `git clone https://github.com/yourusername/your-repo-url.git`
2. Navigate into the project directory: `cd your-repo-directory`
3. Install the dependencies: `npm install`
4. Start the server: `npm start`

The server will start on port 3000.

Go to http://localhost:3000 to check if back-end server works well

## Environment Variables

The project uses the following environment variables:

```properties
# DB DATA
DB_URI=your_mongodb_uri
DB_USER=your_mongodb_user
DB_PWD=your_mongodb_password

# BACK-END
CORS_ORIGIN=your_cors_origin
```

## Usage

When a client connects, the server fetches all chat messages from the database and emits them to the client.

When a client sends a chat message, the server saves the message to the database and emits the message to all connected clients.

When a client sends a 'clear messages' event, the server deletes all messages from the database and emits a 'messages cleared' event to all clients.

## Built With

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Socket.IO](https://socket.io/)
- [MongoDB](https://www.mongodb.com/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details