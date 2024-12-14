import React, { useState } from 'react';
import './Chat.scss';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How are you?" },
    { id: 2, text: "I'm good, thanks! What about you?" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <div className="chatContainer">
      {/* Latest Messages Section */}
      <div className="latestMessages">
        <h3>Latest Messages</h3>
        <div className="messagesList">
          {messages.map((message) => (
            <p key={message.id}>{message.text}</p>
          ))}
        </div>
      </div>

      {/* Real-time Messaging Section */}
      <div className="realTimeMessaging">
        <h3>Real-Time Messaging</h3>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
