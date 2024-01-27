import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { startConnection, addMessageListener, sendMessageToUser, stopConnection } from '../services/signalrService';
import { BsEmojiSmile } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import { IoIosLink } from "react-icons/io";

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
      //setMessages(() => [messageData]); this solves the duplicated received message but the previous received message is no longer displayed after we receive a new message
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
      <div className="overflow-y-auto p-4 max-h-96 w-96">
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              backgroundColor: msg.user === senderUserId ? "#FFFFFF" : "#000000",
              color: msg.user === senderUserId ? "#000000" : "#FFFFFF",
              border: msg.user === senderUserId ? "2px solid #FFB61D" : "none",
            }}
            className="my-2 p-2 rounded-md"
          >
            {msg.message}
          </div>
        ))}
      </div>
      {/* Message input and send button */}
      <div className="p-4 bg-white w-96 rounded-lg flex items-center">
        {/* Attachments icon */}
        <div className="p-1">
          <button className="text-black">
            <IoIosLink size={24} />
          </button>
        </div>

        {/* Input field */}
        <div className="flex-grow">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message ..."
            className="border-none outline-none p-1 w-full"
          />
        </div>

        {/* Emoji icon */}
        <div className="p-1">
          <button className="text-black">
            <BsEmojiSmile size={24} />
          </button>
        </div>

        {/* Send button */}
        <div className="p-1">
          <button onClick={handleSendMessage} className="bg-black text-white p-1 rounded">
            <IoIosSend size={24} />
          </button>
        </div>
      </div>
    </div >
  );
};

ChatInterface.propTypes = {
  selectedContact: PropTypes.string,
};

export default ChatInterface;
