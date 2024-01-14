import * as signalR from "@microsoft/signalr";

const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:7225/Hubs/ChatHub")
  .configureLogging(signalR.LogLevel.Information)
  .build();
console.log(signalR.VERSION);

//start connecion 
export const startConnection = async () => {
  try {
    await hubConnection.start();
    console.log("Connection started");
  } catch (err) {
    console.log(err);
  }
 
};
hubConnection.onclose(async () => {
  await startConnection();
});
startConnection();

export const addMessageListener = (callback) => {
  hubConnection.on("ReceiveMessage", (user, message) => {
    callback({ user, message });
  });
};

export const sendMessage = async (user, message) => {
  await hubConnection.invoke('SendMessage', user, message)
    .catch((error) => console.error(error));
};

export const stopConnection = () => {
  if (hubConnection && hubConnection.state === signalR.HubConnectionState.Connected) {
    hubConnection.stop();
  }
};
