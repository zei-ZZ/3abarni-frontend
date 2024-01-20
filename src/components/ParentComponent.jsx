import { useState } from 'react';
import ContactSearch from './ContactSearch';
import ChatInterface from './ChatInterface'; // Import the ChatInterface component

const ParentComponent = () => {
    const [selectedContact, setSelectedContact] = useState(null);

    // Handle contact selection and set the selectedContact state
    const handleContactSelect = (contactId) => {
        setSelectedContact(contactId);
    };

    return (
        <div>
            {/* Render ContactSearch and pass the handleContactSelect function */}
            <ContactSearch onContactSelect={handleContactSelect} />
            {/* Render ChatInterface and pass the selectedContact */}
            <ChatInterface selectedContact={selectedContact} />
        </div>
    );
};

export default ParentComponent;
