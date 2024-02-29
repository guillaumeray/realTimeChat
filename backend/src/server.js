const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const Chat = require('./data/Message');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const CORS_ORIGIN = process.env.CORS_ORIGIN;

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
    },
});

app.get('/', (req, res) => {
    res.send('Back-end server works!');
});

io.on('connection', async (socket) => {
    console.log('New client connected');
    // Fetch all chat messages from the database when a new client connects
    Chat.find().then((message) => {
        // Emit the messages to the client
        socket.emit('chat messages', message);
    });

    // Save messages to the database and emit them to all clients
    socket.on('chat message', async (data) => {
        const chatMessage = new Chat({ pseudo: data.pseudo, message: data.message });
        try {
            await chatMessage.save()
            .then(() => {
                // Emit the new message to all connected clients
                io.emit('chat message', data.pseudo + ': ' + data.message);
            })
        } catch (err) {
            console.error(err);
        }
    });

    // Listen for the 'clear messages' event
    socket.on('clear messages', () => {
        // Delete all messages from the database
        Chat.deleteMany({})
        .then(() => {
            // Emit a 'messages cleared' event to all clients
            io.emit('messages cleared');
        })
        .catch(err => {
            console.error(err);
        });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(3001, () => console.log('Listening on port 300'));