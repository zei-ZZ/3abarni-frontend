import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { startConnection, addMessageListener, sendMessageToUser, stopConnection } from '../services/signalrService';
import { BsEmojiSmile } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import { IoIosLink } from "react-icons/io";
import Picker from 'emoji-picker-react';
import "../styles/ChatInterface.css";

const ChatInterface = ({ selectedContact, chatHistory }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [senderUserId, setSenderUserId] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    startConnection();

    const token = window.localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userIdClaim = 'user_id';
      const senderUserId = decodedToken[userIdClaim];
      setSenderUserId(senderUserId);
    }

    addMessageListener((data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      stopConnection();
    };
  }, []);

  // Function to categorize messages as sent or received
  const categorizeMessages = (history) => {
    return history.map(message => ({
      message: message.content,
      user: message.userId === senderUserId ? senderUserId : selectedContact
    }));
  };

  // Categorized messages based on chat history
  const categorizedMessages = categorizeMessages(chatHistory);

  useEffect(() => {
    if (chatHistory) {
      // Merge chat history messages with real-time messages
      const categorizedChatHistory = categorizeMessages(chatHistory);
      setMessages(prevMessages => [...prevMessages, ...categorizedChatHistory]);
    }
  }, [chatHistory]);

  const handleSendMessage = async () => {
    try {
      console.log("selectedContact", selectedContact);
      console.log("senderUserId", senderUserId);
      if (message.trim() !== '' && selectedContact) {
        // Use the selectedContact as the receiver
        await sendMessageToUser(selectedContact, senderUserId, message);
        // Display the sent message in the chat interface
        setMessages((prevMessages) => [...prevMessages, { user: senderUserId, message }]);
        setMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Scroll to the bottom of the message container
  /*useEffect(() => {
    const messageContainer = document.getElementById('messages');
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }, [messages]);*/

  const onEmojiClick = (emojiObject, event) => {
    setMessage((prevInput) => prevInput + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div id="big-box" className="flex flex-col h-screen items-center justify-between">
      {/* Display the chat messages */}
      <div id="messages" className="overflow-y-auto p-4 flex-grow" style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-2 rounded-md message ${msg.user === senderUserId ? 'sent-message' : 'received-message'}`}
            style={{
              alignSelf: msg.user === senderUserId ? 'flex-end' : 'flex-start',
              maxWidth: '50%',  // Set maximum width to 50%
              wordBreak: 'break-word',  // Break long words
            }}
          >
            {msg.message}
          </div>
        ))}
      </div>

      {/* Message input and send button */}
      <div id="box" className="p-4 bg-white flex items-center w-full bottom-0" style={{ padding: '10px', width: '100%' }}>
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
        <div className="p-1" style={{ position: 'relative' }}>
          <button className="text-black" onClick={() => setShowEmojiPicker((val) => !val)}>
            <BsEmojiSmile size={24} />
          </button>
          {showEmojiPicker && (
            <div className="emoji-picker-container">
              <Picker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>

        {/* Send button */}
        <div className="p-1">
          <button onClick={handleSendMessage} className="bg-black text-white p-1 rounded">
            <IoIosSend size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

ChatInterface.propTypes = {
  selectedContact: PropTypes.string,
  chatHistory: PropTypes.array.isRequired,
};

export default ChatInterface;
