import { useState } from 'react';
import SideBar from './SideBar';
import ContactSearch from './ContactSearch';
import ChatInterface from './ChatInterface'; 
import MediaFiles from './MediaFiles';
import ReceiverBar from './ReceiverBar';
import "../styles/ParentComponent.css"; 

const ParentComponent = () => {
    const [selectedContact, setSelectedContact] = useState(null);

    // Handle contact selection and set the selectedContact state
    const handleContactSelect = (contactId) => {
        setSelectedContact(contactId);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 14fr 1fr 1fr', gap: '16px', width: '100%' }}>
            {/* Render SideBar */}
            <SideBar />
            {/* Render ContactSearch and pass the handleContactSelect function */}
            <div class="contacts">
            <ContactSearch onContactSelect={handleContactSelect} />
            </div>
            {/* Render ChatInterface and pass the selectedContact */}
            <div class="chat">
                <ReceiverBar />
                <ChatInterface selectedContact={selectedContact} style={{ gridColumn: 'span 2' }} />
            </div>
            {/* Render MediaFiles */}
            <MediaFiles />
        </div>
    );
};

export default ParentComponent;
