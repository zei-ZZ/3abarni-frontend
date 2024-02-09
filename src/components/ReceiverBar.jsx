import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { IoCallOutline } from 'react-icons/io5';
import { BsCameraVideo } from 'react-icons/bs';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import axiosInstance from "../utils/axiosInstance";

const backend_url = import.meta.env.VITE_BackendURL;
const ReceiverBar = ({ selectedContact }) => {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/users/${selectedContact}`)
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  }, [selectedContact]);

  return (
    <AppBar position="static" style={{ backgroundColor: '#F8F8F8', boxShadow: 'none' }}>
      <Toolbar style={{ borderBottom: '1px solid #ddd', padding : '10px' }}>
        <Avatar alt="receiver_profile_pic" src={backend_url + "/" + userData?.profilePicPath} />

        <div style={{ marginLeft: '10px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}>
            {userData?.userName}
          </div>
          <div style={{ fontSize: '14px', color: 'black' }}>
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
ReceiverBar.propTypes = {
  selectedContact: PropTypes.string,
};
export default ReceiverBar;
