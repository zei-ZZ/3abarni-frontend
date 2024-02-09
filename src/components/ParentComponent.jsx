import { useState, useEffect } from 'react';
import SideBar from './SideBar';
import ContactSearch from './ContactSearch';
import ChatInterface from './ChatInterface'; 
import MediaFiles from './MediaFiles';
import ReceiverBar from './ReceiverBar';
import noContactImage from '../assets/images/logo.png';  // Import your alternative image
import "../styles/ParentComponent.css"; 
import jwtDecode from 'jwt-decode';
import axiosInstance from "../utils/axiosInstance";

const ParentComponent = () => {
    const [selectedContact, setSelectedContact] = useState(null);
    const [chatHistory, setChatHistory] = useState(null);
    const [senderUserId, setSenderUserId] = useState(null);

    // Handle contact selection and set the selectedContact state
    const handleContactSelect = (contactId) => {
        setSelectedContact(contactId);
        setChatHistory(chatHistory);
    };

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userIdClaim = 'user_id';
            const senderUserId = decodedToken[userIdClaim];
            setSenderUserId(senderUserId);
        }
        axiosInstance
            .get(`/chats/messages/sender/${senderUserId}/receiver/${selectedContact}`)
            .then((response) => {
                console.log("Chat history fetched:", response.data);
                setChatHistory(response.data);
            })
            .catch((error) => {
                console.error('Error fetching chat history:', error);
            });
    }, [selectedContact, senderUserId]);

    // Log the chat history before passing it to ChatInterface
    console.log("Chat history in ParentComponent:", chatHistory);

    

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 14fr 1fr 1fr', gap: '0px', width: '100%', height: '100vh' }}>
            {/* Render SideBar */}
            <SideBar />
            {/* Render ContactSearch and pass the handleContactSelect function */}
            <div className="contacts" style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid #ddd' }}>
                <ContactSearch onContactSelect={handleContactSelect} />
            </div>
            {/* Conditional rendering: show ReceiverBar and ChatInterface if selectedContact is truthy, otherwise show alternative content */}
            {selectedContact ? (
                <div className="chat" style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid #ddd' }}>
                    <ReceiverBar selectedContact={selectedContact}/>
                    <ChatInterface selectedContact={selectedContact} chatHistory={chatHistory} />
                </div>
            ) : (
                <div className="alternative-content">
                    {/* Make the image smaller and center it using flexbox */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <img src={noContactImage} alt="No contact selected" style={{ width: '18%' }} />
                        <p style={{ fontSize: '14px' }}>No contact selected</p>
                    </div>
                </div>
            )}
            {/* Render MediaFiles */}
            <MediaFiles />
        </div>
    );
};

export default ParentComponent;
