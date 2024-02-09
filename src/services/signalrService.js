import * as signalR from "@microsoft/signalr";
import jwtDecode from 'jwt-decode';

const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:7225/Hubs/ChatHub", {
    accessTokenFactory: () => localStorage.getItem('token'),
  })
  .configureLogging(signalR.LogLevel.Information)
  .build();
console.log(signalR.VERSION);

export const startConnection = async () => {
  try {
    await hubConnection.start();
    // Share the username with the server upon connection
    const token = window.localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userIdClaim = 'user_id';
      const senderUserId = decodedToken[userIdClaim];
      //setSenderUserId(senderUserId);
      console.log(senderUserId);
      await hubConnection.invoke('AddUserConnection', senderUserId);
    }
  } catch (err) {
    console.log(err);
  }
};

hubConnection.onclose(async () => {
  await startConnection();
});


// Handle receiving chat history and real-time messages
export const addMessageListener = (callback) => {
  hubConnection.on("ReceiveMessage", (user, message) => {
    callback({ user, message });
  });
};

// Send message to a specific user
export const sendMessageToUser = async (receiverUsername, senderUsername, message) => {
  try {
    await hubConnection.invoke('SendMessageToUser', receiverUsername, senderUsername, message);
  } catch (error) {
    console.error(error);
  }
};


/*export const getChatHistory = async (senderUsername, receiverUsername) => {
  try {
    const chatHistory = await hubConnection.invoke('GetChatHistory', senderUsername, receiverUsername);
    console.log("done",chatHistory);
    return chatHistory;
  } catch (error) {
    console.error(error);
  }
};*/

export const stopConnection = () => {
  if (hubConnection && hubConnection.state === signalR.HubConnectionState.Connected) {
    hubConnection.stop();
  }
};
