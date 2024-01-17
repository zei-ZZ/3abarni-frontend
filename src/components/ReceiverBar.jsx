import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import { IoCallOutline } from 'react-icons/io5';
import { BsCameraVideo } from 'react-icons/bs';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

const ReceiverBar = ({ receiver }) => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#F8F8F8' }}>
      <Toolbar >
        <Avatar alt="chams" src=""  />

        <div style={{ marginLeft: '10px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}>
            chams
          </div>
          <div style={{ fontSize: '14px', color: 'green', color: 'black' }}>
            Online
          </div>
        </div>

        <IoCallOutline style={{ fontSize: '20px', marginLeft: '100px', margin: '0 10px', cursor: 'pointer', color: 'black' }} />
        <BsCameraVideo style={{ fontSize: '20px', margin: '0 10px', cursor: 'pointer', color: 'black' }} />
        <HiOutlineDotsHorizontal style={{ fontSize: '20px', cursor: 'pointer', color: 'black' }} />
      </Toolbar>
    </AppBar>
  );
};

export default ReceiverBar;
