import io from "socket.io-client";
import { useState } from "react";
import "./App.css";
import { Chat } from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [hasJoined, setHasJoined] = useState(false);

  const joinRoom = () => {
    const name = username.trim();
    const roomId = room.trim();
    if (name !== "" && roomId !== "") {
      socket.emit("join_room", { username: name, room: roomId });
      setHasJoined(true);
    }
  };

  const leaveRoom = () => {
    setHasJoined(false);
    setUsername("");
    setRoom("");
  };

  return (
    <div className={`App ${hasJoined ? "App--in-room" : ""}`}>
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />

      {!hasJoined ? (
        <div className="join-card">
          <h3>Join a chat</h3>
          <div className="form-group">
            <label htmlFor="username">Your name</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your name ..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && joinRoom()}
            />
          </div>
          <div className="form-group">
            <label htmlFor="room">Room ID</label>
            <input
              id="room"
              type="text"
              placeholder="Room ID ..."
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && joinRoom()}
            />
          </div>
          <div className="join-btn-wrap">
            <button type="button" className="join-btn" onClick={joinRoom}>
              Join room
            </button>
          </div>
        </div>
      ) : (
        <Chat
          socket={socket}
          username={username.trim()}
          room={room.trim()}
          onLeaveRoom={leaveRoom}
        />
      )}
    </div>
  );
}

export default App;
