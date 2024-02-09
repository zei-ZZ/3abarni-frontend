import * as signalR from "@microsoft/signalr";
import jwtDecode from 'jwt-decode';

const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:7225/Hubs/ChatHub", {
    accessTokenFactory: () => localStorage.getItem('token'),
  })
  .configureLogging(signalR.LogLevel.Information)
  .build();

console.log(signalR.VERSION);
let setConnectedUserIds;
export const startConnection = async (setIds) => {
  setConnectedUserIds = setIds; // Update setConnectedUserIds function
  try {
    await hubConnection.start();
    const token = window.localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userIdClaim = 'user_id';
      const senderUserId = decodedToken[userIdClaim];
      console.log(senderUserId);
      await hubConnection.invoke('AddUserConnection', senderUserId);
      hubConnection.on("UserConnected", (username) => {
        if (senderUserId !== username)
          setIds(prevUserIds => [...prevUserIds, username]);
      });
      let connectedUserIds = await hubConnection.invoke('GetConnectedUserIds');
      console.log("Connected User IDs:", connectedUserIds);
      connectedUserIds = connectedUserIds.filter(id => id !== senderUserId);
      setIds(connectedUserIds); // Pass connected user IDs to the component
    }
  } catch (err) {
    console.log(err);
  }
};

export const getConnectedUserIds = async () => {
  try {
    const connectedUserIds = await hubConnection.invoke('GetConnectedUserIds');
    return connectedUserIds;
  } catch (error) {
    console.error('Error fetching connected user IDs:', error);
    return [];
  }
};

hubConnection.onclose(async () => {
  await startConnection(setConnectedUserIds);
});
export const sendFileToUser = async (receiverUsername, senderUsername, fileName) => {
  try {
    await hubConnection.invoke('SendFileToUser', receiverUsername, senderUsername, fileName);
  } catch (error) {
    console.error('Error sending file:', error);
    throw error; // Rethrow the error to propagate it to the caller
  }
};


export const addMessageListener = (callback) => {
  hubConnection.on("ReceiveMessage", (user, message) => {
    callback({ user, message });
  });
};
// Function to add a listener for incoming file messages
export const addFileListener = (callback) => {
  hubConnection.on("ReceiveFile", (senderUsername, fileName) => {
    callback({ senderUsername, fileName });
  });
};


export const sendMessageToUser = async (receiverUsername, senderUsername, message) => {
  try {
    if (senderUsername !== receiverUsername)
      await hubConnection.invoke('SendMessageToUser', receiverUsername, senderUsername, message);
  } catch (error) {
    console.error(error);
  }
};

export const stopConnection = () => {
  if (hubConnection && hubConnection.state === signalR.HubConnectionState.Connected) {
    hubConnection.stop();
  }
};
