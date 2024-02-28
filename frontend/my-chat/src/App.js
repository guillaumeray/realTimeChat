import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css'; // Import the CSS file

const SERVER_URL = window.location.hostname === "localhost" ? "http://localhost:3001" : "https://your-production-url.com";
let socket = io(SERVER_URL);

function App() {
    const [pseudo, setPseudo] = useState(localStorage.getItem('pseudo') || '');
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('pseudo')); // Add this line
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('chat messages', (messages) => {
            setMessages(messages);
        });

        socket.on('messages cleared', () => {
            setMessages([]);
        });
    }, []);

    
    const handleLogin = (e) => {
      e.preventDefault();
      localStorage.setItem('pseudo', pseudo);
      setIsLoggedIn(true); // Add this line
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
        <form onSubmit={handleLogin}>
        <input className="input-field" value={pseudo} onChange={e => setPseudo(e.target.value)} disabled={isLoggedIn} /> {/* Change this line */}
        <button className={`login-button ${isLoggedIn ? 'disabled' : ''}`} disabled={isLoggedIn}>Login</button> {/* Change this line */}
        </form>
        {isLoggedIn ? <p>Welcome {pseudo} - You are login !</p> : <p>You are not logged in! Please enter a pseudo</p> } 
        <button className="disconnect-button" onClick={handleDisconnect} disabled={!isLoggedIn}>Disconnect</button> {/* Change this line */}
        <ul className="message-list">
                {messages.map((message, index) => (
                    <li key={index} className="message-item">
                        <span className="pseudo">{message.pseudo}</span>
                        <span className="text">{message.message}</span>
                    </li>
                ))}
            </ul>
        <form onSubmit={handleMessageSubmit}>
            <input className="input-field" value={message} onChange={e => setMessage(e.target.value)} />
            <button className="message-button">Send</button>
        </form>
        <button className="clear-messages-button" onClick={handleClearMessages}>Clear Messages</button> {/* Add the CSS class */}
      </div>
    );
}

export default App;