import io from "socket.io-client";

import { useEffect } from "react";
const socket = io.connect("http://localhost:3001");


function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
  }, []);
  return <></>;
}

export default App;
