import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import StyledBadge from '@mui/material/Badge';
import axiosInstance from "../utils/axiosInstance";
import { getConnectedUserIds  } from '../services/signalrService';
const ConnectedUsers = () => {
  const [connectedUsers, setConnectedUsers] = useState([]);
  const backend_url = import.meta.env.VITE_BackendURL;

  useEffect(() => {
    const fetchConnectedUsersData = async () => {
      try {
        const userIds = await getConnectedUserIds ();
        const usersData = await Promise.all(userIds.map(userId => fetchUserData(userId)));
        setConnectedUsers(usersData);
      } catch (error) {
        console.error('Error fetching connected users:', error);
      }
    };

    fetchConnectedUsersData();
  }, []);

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
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {connectedUsers.map(user => (
        <StyledBadge
          key={user.id}
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar alt={user?.userName} src={`${backend_url}/${user?.profilePicPath}`} />
        </StyledBadge>
      ))}
    </div>
  );
};

export default ConnectedUsers;
