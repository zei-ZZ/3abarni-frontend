import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import jwtDecode from 'jwt-decode';
import axiosInstance from "../utils/axiosInstance";
import SideBar from './SideBar';


const user = {
    id: 1,
    name: 'John Doe',
    description: 'A passionate individual exploring the world of web development.',
    avatarUrl: 'https://example.com/avatar.jpg',
};


const Profile = () => {
    const [name, setName] = useState(user.name);
    const [description, setDescription] = useState(user.description);
    const [senderUserId, setSenderUserId] = useState(null);
    const [userData, setUserData] = useState(null);

    const backend_url = import.meta.env.VITE_BackendURL;

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userIdClaim = 'user_id';
            const senderUserId = decodedToken[userIdClaim];
            setSenderUserId(senderUserId);
            //console.log("waaa sa7bi",senderUserId);
        }
        axiosInstance
            .get(`/users/${senderUserId}`)
            .then((response) => {
                // console.log("waaa sa7bi",response.data);
                setUserData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching user:', error);
            });
    }, [senderUserId]);

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSave = () => {
        // Implement logic to save the modified data
        // For simplicity, log the updated values for now
        console.log('Updated Name:', name);
        console.log('Updated Description:', description);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 14fr 1fr 1fr', gap: '0px', width: '100%', height: '100vh' }}>
            {/* Render SideBar */}
            <SideBar />
            <div class="MuiPaper-root" style={{ marginLeft: '70px',width: '200%' }}>
                <Paper elevation={3} />
                <h2 style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: '32px',
                    lineHeight: '44px',
                    marginTop: '5px',
                    marginBottom: '100px',
                    marginLeft: '5.5px'
                }}
                >Profile</h2>
                {/* Avatar and user details */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '26px'
                }}  >
                    <Avatar alt={userData?.userName} src={backend_url + "/" + userData?.profilePicPath} sx={{ width: 100, height: 100 }} />
                </div>

                <div style={{ marginBottom: '26px', width: '100%' }}>
                    <TextField
                        label=""
                        value={userData?.userName}
                        onChange={handleNameChange}
                        fullWidth
                    />
                </div>

                <div style={{ marginBottom: '16px', width: '100%' }}>
                    <TextField
                        label="Bio"
                        multiline
                        rows={4}
                        value={description}
                        onChange={handleDescriptionChange}
                        fullWidth
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: '#000000',
                            marginRight: 'auto', // Align the button to the left
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'right',
                            justifyContent: 'right',
                        }}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default Profile;