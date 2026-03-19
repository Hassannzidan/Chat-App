import { useState } from "react";

export const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setCurrentMessage("");
    }
  };
  return (
    <>
      <div className="chat-container">
        <div className="chat-header">
          <p> live chat</p>
        </div>
        <div className="chat-body"></div>
        <div className="chat-footer">
          <input
            type="text"
            placeholder="Message..."
            onChange={(e) => setCurrentMessage(e.target.value)}
            value={currentMessage}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
    </>
  );
};
