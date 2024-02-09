import { IoSettingsOutline } from 'react-icons/io5';
import { LuUsers2 } from 'react-icons/lu';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import LogoImage from '../assets/images/logo.png';
import { SlLogout } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import Avatar from '@mui/material/Avatar';
import axiosInstance from "../utils/axiosInstance";

const Sidebar = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [senderUserId, setSenderUserId] = useState(null);
  const [userData, setUserData] = useState(null);

  const backend_url = import.meta.env.VITE_BackendURL;
  const navigate = useNavigate();


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

  const handleButtonClick = (buttonName) => {
    navigate("/" + buttonName);
    setActiveButton(buttonName);
  };

  const handleButtonLogoutClick = () => {
    setActiveButton(null); // Clear the active button on logout
    localStorage.removeItem('token');
    navigate("/login");
  };

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '200%',
        width: '70px',
        background: '#FFCC00',
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: '50px' }}>
        <div
          style={{
            width: '50px',
            height: '50px',
            background: 'white',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '60px',
          }}
        >
          <img
            src={LogoImage}
            alt="Logo"
            style={{
              width: '70%',
              borderRadius: '0%',
            }}
          />
        </div>
      </div>

      {/* Chat button */}
      <button
        style={{
          border: 'none',
          background: activeButton === 'chat' ? '#333' : 'transparent',
          color: activeButton === 'chat' ? '#FFF' : '#000',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
        onClick={() => handleButtonClick('chat')}
      >
        <IoChatbubbleEllipsesOutline size={20} />
      </button>

      {/* Contacts button */}
      <button
        style={{
          border: 'none',
          background: activeButton === 'contacts' ? '#333' : 'transparent',
          color: activeButton === 'contacts' ? '#FFF' : '#000',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
        onClick={() => handleButtonClick('chat')}
      >
        <LuUsers2 size={20} />
      </button>

      {/* Settings button */}
      <button
        style={{
          border: 'none',
          background: activeButton === 'settings' ? '#333' : 'transparent',
          color: activeButton === 'settings' ? '#FFF' : '#000',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
        onClick={() => handleButtonClick('settings')}
      >
        <IoSettingsOutline size={20} />
      </button>

      {/* Profile button */}
      <div style={{ marginTop: '250px' }}>
        <button
          style={{
            border: 'none',
            background: activeButton === 'profile' ? '#333' : 'transparent',
            color: activeButton === 'profile' ? '#FFF' : '#000',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
          onClick={() => handleButtonClick('profile')}
        >
          <Avatar alt={userData?.userName} src={backend_url + "/" + userData?.profilePicPath} />
        </button>

        {/* Logout button */}
        <button
          style={{
            border: 'none',
            background: activeButton === 'logout' ? '#333' : 'transparent',
            color: activeButton === 'logout' ? '#FFF' : '#000',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
          onClick={() => handleButtonLogoutClick()}
        >
          <SlLogout size={20} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;