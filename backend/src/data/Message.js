const mongoose = require('mongoose');
require('dotenv').config();

const DB_URI = process.env.DB_URI;
const DB_USER = process.env.DB_USER;
const DB_PWD = process.env.DB_PWD;

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PWD}@${DB_URI}/chat?retryWrites=true&w=majority&appName=Cluster0`, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', err => {
    console.error('There was a mongodb connection error', err);
});

const chatSchema = new mongoose.Schema({ pseudo: String, message: String });

// Create a model using the chatSchema and export it
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;