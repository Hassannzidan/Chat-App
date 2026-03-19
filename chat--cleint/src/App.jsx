import io from "socket.io-client";

import { useState } from "react";
const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", { username, room });
    }
    setUsername("");
    setRoom("");
  };

  
  return (
    <>
      <div className="App">
        <h3>Joint A Chat</h3>
        <input
          type="text"
          placeholder="Enter your name ..."
          value={username}
          onChange={(e) => setUsername(e.target.value) }
        />
        <input
          type="text"
          placeholder="Room ID ..."
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
    </>
  );
}

export default App;
