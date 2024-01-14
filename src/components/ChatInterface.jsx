// ChatInterface.js

import { useState, useEffect } from 'react';
import signalRService from '../services/signalrService.js'; // Import your SignalR service

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  // we will use this later
  //const [connectedUsers, setConnectedUsers] = useState([]);
 // const [activeChats, setActiveChats] = useState([]);

  useEffect(() => {
    // Start SignalR connection when the component mounts
    signalRService.startConnection();

    // Add a listener for incoming messages
    signalRService.addMessageListener((messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    // Cleanup SignalR connection when the component unmounts
    return () => {
      signalRService.stopConnection();
    };
  }, []);

  const sendMessage = () => {
    // Implement your logic to send messages
    // You may want to call a function in your SignalR service to send the message
    // signalRService.sendMessage(receiverUserId, message);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar with user list */}
      <div className="w-1/4 p-4 bg-gray-200">
        <h2 className="text-xl font-semibold mb-4">Connected Users</h2>
        <ul>
          
          {
          /* This is the list for the connected users */
          /*connectedUsers.map((user) => (
            <li key={user.id}>{user.name}</li>
          )) */}
        </ul>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Connected users at the top */}
        <div className="p-4 bg-gray-300">
          <h2 className="text-xl font-semibold">Connected Users</h2>
          <ul className="flex">
             { /* This is the list for the connected users *
             connectedUsers.map((user) => (
              <li key={user.id} className="mr-2">
                {user.name}
              </li>
             ))*/}
          </ul>
        </div>

        {/* Active chat list */}
        <div className="flex-1 overflow-y-auto p-4">
          {/*activeChats.map((chat) => (
            <div key={chat.userId} className="mb-4">
              <h3 className="text-lg font-semibold">{chat.userName}</h3>
              <div className="flex flex-col">
                {messages
                  .filter((msg) => msg.user === chat.userId)
                  .map((msg, index) => (
                    <div key={index} className="my-2">
                      {msg.message}
                    </div>
                  ))}
              </div>
            </div>
                  ))*/}
        </div>

        {/* Message input and send button */}
        <div className="p-4 bg-gray-300">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="border p-2 w-full"
          />
          <button onClick={sendMessage} className="mt-2 bg-blue-500 text-white p-2 rounded">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
