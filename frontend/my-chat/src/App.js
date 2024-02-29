import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Picker from 'emoji-picker-react';

import './App.css'; // Import the CSS file

const SERVER_URL = window.location.hostname === "localhost" ? "http://localhost:3001" : "https://realtimechat-backend-l49g.onrender.com/";
let socket = io(SERVER_URL);

function getColorFromAuthor(author) {
    if (author.length < 2) {
        return '#000'; // Default color if the author's name is less than 2 characters
    }
    const hue = (author.charCodeAt(0) + author.charCodeAt(1)) * 6 % 360;
    return `hsl(${hue}, 70%, 70%)`;
}

function App() {
    const [pseudo, setPseudo] = useState(localStorage.getItem('pseudo') || '');
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('pseudo')); // Add this line
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    useEffect(() => {
        socket.on('chat messages', (messages) => {
            setMessages(messages);
        });

        socket.on('messages cleared', () => {
            setMessages([]);
        });
    }, []);

    const onEmojiClick = (emojiObject, event) => {
        setMessage(prevMessage => prevMessage + emojiObject.emoji);
    };

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleLogin = (e) => {
      e.preventDefault();
      if (pseudo.length < 2) {
        alert('Pseudo must be at least 2 characters long.'); // Replace this with your actual method of showing an error
        return;
      } else {
        localStorage.setItem('pseudo', pseudo);
        setIsLoggedIn(true); // Add this line  
      }
    };

    const handleDisconnect = () => {
      setPseudo('');
      localStorage.removeItem('pseudo');
      setIsLoggedIn(false); // Add this line
    };

    const handleMessageSubmit = (e) => {
        e.preventDefault();
        if (pseudo) {
            socket.emit('chat message', { pseudo: pseudo, message: message });
            setMessages([...messages, { pseudo: pseudo, message: message }]);
            setMessage('');
        }
    };

    const handleClearMessages = () => {
        socket.emit('clear messages');
    };

    return (
      <div className="app-container">
        <header className="chat-header">
            <h1>Chat Application</h1>
        </header>
        <form onSubmit={handleLogin}>
            <label htmlFor="pseudo-input">Pseudo:</label>
            <input id="pseudo-input" className="input-field" value={pseudo} onChange={e => setPseudo(e.target.value)} disabled={isLoggedIn} />
            <button className={`login-button ${isLoggedIn ? 'disabled' : ''}`} disabled={isLoggedIn}>Login</button>
            <button className="disconnect-button" onClick={handleDisconnect} disabled={!isLoggedIn}>Disconnect</button> {/* Change this line */}
        </form>
        {isLoggedIn ? <p>Welcome {pseudo} - You are login !</p> : <p>You are not logged in! Please enter a pseudo</p> } 
        <ul className="message-list">
            {messages.map((message, index) => (
                <li key={index} className={`message-item ${message.sentByMe ? 'sent' : 'received'}`}>
                    <span className="message-author" style={{color: getColorFromAuthor(message.pseudo)}}>{message.pseudo}  </span>
                    <div className="message-content">
                        <span className="message-text">{message.message}</span>
                    </div>
                </li>
            ))}
        </ul>
        {isLoggedIn && (
            <>
                <form onSubmit={handleMessageSubmit}>
                    <label htmlFor="message-input">Message:</label>
                    <input id="message-input" className="input-field" value={message} onChange={e => setMessage(e.target.value)} />
                    <button type="button" onClick={toggleEmojiPicker}>😀</button>
                    {showEmojiPicker ? <Picker onEmojiClick={onEmojiClick} /> : null}
                    <button className="message-button">Send</button>
                </form>
                <button className="clear-messages-button" onClick={handleClearMessages}>Clear Messages</button> 
            </>
        )}
      </div>
    );
}

export default App;