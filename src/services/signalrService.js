import * as signalR from "@microsoft/signalr";

const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:7225/chatHub")
  .build();
// Use signalR here, for example, logging its version
console.log(signalR.VERSION);
export const startConnection = async () => {
  try {
    await hubConnection.start();
    console.log("Connection started!");
  } catch (err) {
    console.error("Error while establishing connection:", err);
  }
};
export const addMessageListener = (callback) => {
  hubConnection.on("ReceiveMessage", (user, message) => {
    callback({ user, message });
  });
};
