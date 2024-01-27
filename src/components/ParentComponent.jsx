import { useState } from 'react';
import SideBar from './SideBar';
import ContactSearch from './ContactSearch';
import ChatInterface from './ChatInterface'; 
import MediaFiles from './MediaFiles';
import ReceiverBar from './ReceiverBar';
import noContactImage from '../assets/images/logo.png';  // Import your alternative image
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
            <div className="contacts">
                <ContactSearch onContactSelect={handleContactSelect} />
            </div>
            {/* Conditional rendering: show ReceiverBar and ChatInterface if selectedContact is truthy, otherwise show alternative content */}
            {selectedContact ? (
                <div className="chat">
                    <ReceiverBar selectedContact={selectedContact}/>
                    <ChatInterface selectedContact={selectedContact} style={{ gridColumn: 'span 2' }} />
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
