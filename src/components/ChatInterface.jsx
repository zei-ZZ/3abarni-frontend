
import jwtDecode from 'jwt-decode'; // Correct import statement
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { startConnection, addMessageListener, sendMessage, stopConnection } from '../services/signalrService';

const ChatInterface = ({ selectedContact }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [senderUsername, setSenderUsername] = useState('');

  useEffect(() => {
    // Initialize SignalR connection
    startConnection();

    // Decode the JWT to get the sender's username
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const usernameClaim = 'name'; // Replace with the actual claim name for the username
      const senderUsername = decodedToken[usernameClaim];
      setSenderUsername(senderUsername);
    }

    // Add message listener to update state with incoming messages
    addMessageListener((messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    // Clean up SignalR connection on component unmount
    return () => {
      stopConnection();
    };
  }, []);

  const handleSendMessage = async () => {
    try {
      if (message.trim() !== '' && selectedContact) {
        // Use the selectedContact as the receiver
        await sendMessage(senderUsername, selectedContact, message);
        setMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      {/* Display the chat messages */}
      <div className="overflow-y-auto p-4 max-h-96 border border-gray-300 w-96">
        {messages.map((msg, index) => (
          <div key={index} className="my-2">
            <strong>{msg.user}:</strong> {msg.message}
          </div>
        ))}
      </div>

      {/* Message input and send button */}
      <div className="p-4 bg-gray-300 w-96">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="border p-2 w-full"
        />
        <button onClick={handleSendMessage} className="mt-2 bg-blue-500 text-white p-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

ChatInterface.propTypes = {
  selectedContact: PropTypes.string, // Replace with the appropriate prop type
};

export { ChatInterface as default };
