// Sidebar.jsx
import { useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuUsers2 } from 'react-icons/lu';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import LogoImage from '../assets/images/logo.png';
import { CgProfile } from 'react-icons/cg'; // Import the profile icon
import { SlLogout } from 'react-icons/sl'; // Import the logout icon
const Sidebar = () => {
const [activeButton, setActiveButton] = useState(null);
  

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
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
        onClick={() => handleButtonClick('contacts')}
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
        }}
        onClick={() => handleButtonClick('settings')}
      >
        <IoSettingsOutline size={20} />
      </button>
    {/* Profile  button */}
    <div style ={{marginTop : '250px'}}>
      <button
  style={{
    border: 'none',
    background: activeButton === 'profile' ? '#333' : 'transparent',
    color: activeButton === 'profile' ? '#FFF' : '#000',
    cursor: 'pointer',
    marginBottom: '20px', // Add margin to create space
  }}
  onClick={() => handleButtonClick('profile')}
>
  <CgProfile size={20} />
</button>
{/* Settings Logout  */}
<button
  style={{
    border: 'none',
    background: activeButton === 'logout' ? '#333' : 'transparent',
    color: activeButton === 'logout' ? '#FFF' : '#000',
    cursor: 'pointer',
    marginBottom: '20px', // Add margin to create space
  }}
  onClick={() => handleButtonClick('logout')}
>
  <SlLogout size={20} />
</button>
</div>
  </div>


  );
};

export default Sidebar;
