import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '../utils/axiosInstance';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const ConnectedUsers = ({ connectedUserIds }) => {
  const [connectedUsersData, setConnectedUsersData] = useState([]);
  const backend_url = import.meta.env.VITE_BackendURL;

  useEffect(() => {
    const fetchConnectedUsersData = async () => {
      try {
        console.log("connectedUsers are : ", connectedUserIds);
        const usersData = await Promise.all(connectedUserIds.map(userId => fetchUserData(userId)));
        console.log(usersData); 
        setConnectedUsersData(usersData.filter(user => user));
      } catch (error) {
        console.error('Error fetching connected users:', error);
      }
    };

    fetchConnectedUsersData();
  }, [connectedUserIds]);

  const fetchUserData = async (userId) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {connectedUsersData.map(user => (
        <div key={user.id} style={{ marginRight: '8px' }}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar alt={user.userName} src={backend_url+"/"+user.profilePicPath} />
          </StyledBadge>
        </div>
      ))}
    </div>
  );
};

ConnectedUsers.propTypes = {
  connectedUserIds: PropTypes.array.isRequired,
};

export default ConnectedUsers;
