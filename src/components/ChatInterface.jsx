import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { startConnection, addMessageListener, sendMessageToUser, stopConnection } from '../services/signalrService';

const ChatInterface = ({ selectedContact }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [senderUserId, setSenderUserId] = useState('');

  useEffect(() => {
    startConnection();

    const token = window.localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userIdClaim = 'user_id';
      const senderUserId = decodedToken[userIdClaim];
      setSenderUserId(senderUserId);
    }

    addMessageListener((messageData) => {
      console.log('Received message:', messageData); 
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    return () => {
      stopConnection();
    };
  }, []);

  const handleSendMessage = async () => {
    try {
      console.log("selectedContact", selectedContact);
      console.log("senderUserId", senderUserId);
      if (message.trim() !== '' && selectedContact) {
        // Use the selectedContact as the receiver
        await sendMessageToUser(selectedContact, message);
        
        // Display the sent message in the chat interface
        setMessages((prevMessages) => [...prevMessages, { user: senderUserId, message }]);
        console.log(message);
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
            {msg.user}: {msg.message}
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
  selectedContact: PropTypes.string,
};

export default ChatInterface;
