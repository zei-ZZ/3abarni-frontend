import React from 'react';
import Paper from '@mui/material/Paper';
import SideBar from './SideBar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';

const Settings = () => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 14fr 1fr 1fr', gap: '0px', width: '100%', height: '100vh' }}>
            <SideBar />
            <div style={{ marginLeft: '30px', width: '200%' }}>
                <Paper  style={{ padding: '20px', maxWidth: '300px', margin: '0 auto' }}>
                    <Typography variant="h5" gutterBottom>
                        Settings
                    </Typography>
                    <TextField
                        label="Username"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Notification Sound"
                        fullWidth
                        margin="normal"
                    />
                    <FormControlLabel
                        control={<Switch />}
                        label="Show Typing Indicator"
                    />
                    <FormControlLabel
                        control={<Switch />}
                        label="Enable Dark Mode"
                    />
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
                    >
                        Save
                    </Button>
                </Paper>
            </div>
        </div>
    );
};

export default Settings;
