import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import "../styles/ContactSearch.css";
import axiosInstance from "../utils/axiosInstance";
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';

const ContactSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        axiosInstance
            .get('/users')
            .then((response) => {
                console.log(response.data);
                setContacts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const [selectedContact, setSelectedContact] = useState(null);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCardClick = (contactId) => {
        setSelectedContact(contactId === selectedContact ? null : contactId);
    };

    const filteredContacts = contacts.filter((contact) =>
        contact.userName.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2 style={{
                fontFamily: 'Manrope, sans-serif',
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: '32px',
                lineHeight: '44px',
                marginTop: '15px',
                marginBottom: '25px',
                marginLeft: '5.5px'
            }}
            >Chats</h2>
            <Paper
                component="form"
                sx={{
                    p: '2px 4px', display: 'flex', alignItems: 'center',
                    width: 400, borderRadius: 5, boxShadow: 'none', marginTop: '15px',
                    marginBottom: '10px',
                }}
            >

                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon sx={{ color: '#B0B0B0' }} />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleSearchChange}
                />
                <IconButton color="primary" sx={{ p: '10px', color: "black" }} aria-label="filter">
                    <FilterListRoundedIcon />
                </IconButton>
            </Paper>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '400px',
                    padding: '20px',
                    background: 'transparent',
                }}
            >
                {filteredContacts.map((contact) => (
                    <div
                        key={contact.id}
                        style={{
                            marginBottom: '20px',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            backgroundColor:
                                selectedContact === contact.id ? 'black' : 'white',
                            color: selectedContact === contact.id ? 'white' : 'black',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '15px',
                        }}
                        onClick={() => handleCardClick(contact.id)}
                    >
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                            style={{ marginRight: '10px' }}
                        >
                            <Avatar alt={contact.userName} src={contact.profilePicPath} />
                        </Badge>

                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                {contact.userName}
                            </div>
                            <div style={{ fontSize: '14px', color: '#555' }}>
                                {contact.lastMessage}
                                hello dude!
                            </div>
                        </div>

                        <div style={{ marginLeft: '10px', fontSize: '12px' }}>
                            {contact.lastMessageTime}
                            9:35
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ContactSearch;