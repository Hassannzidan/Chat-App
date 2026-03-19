import { useState, useEffect, useRef } from "react";
import "./Chat.css";

const formatTime = () => {
  const d = new Date();
  const h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
};

/** Hash username to a stable palette index (0–5) so each user has a consistent color */
const getAuthorPaletteIndex = (author) => {
  let n = 0;
  for (let i = 0; i < author.length; i++) n = (n << 3) + author.charCodeAt(i);
  return Math.abs(n) % 6;
};

export const Chat = ({ socket, username, room, onLeaveRoom }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const messagesEndRef = useRef(null);
  const bodyRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const sendMessage = () => {
    const msg = currentMessage.trim();
    if (!msg) return;

    const messageData = {
      room,
      author: username,
      message: msg,
      time: formatTime(),
    };

    setMessageList((prev) => [...prev, messageData]);
    socket.emit("send_message", messageData);
    setCurrentMessage("");
  };

  useEffect(() => {
    const handleReceive = (data) => {
      setMessageList((prev) => [...prev, data]);
    };
    socket.on("receive_message", handleReceive);
    return () => {
      socket.off("receive_message", handleReceive);
    };
  }, [socket]);

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <header className="chat-header">
          <div className="chat-header-info">
            <span className="chat-header-room">#{room}</span>
            <span className="chat-header-you">You: {username}</span>
          </div>
          <button
            type="button"
            className="chat-leave-btn"
            onClick={onLeaveRoom}
            aria-label="Leave room"
          >
            Leave room
          </button>
        </header>

        <div className="chat-body" ref={bodyRef}>
          {messageList.length === 0 && (
            <div className="chat-empty">
              <p>No messages yet. Say hello!</p>
            </div>
          )}
          {messageList.map((item, index) => {
            const isOwn = item.author === username;
            const paletteIndex = getAuthorPaletteIndex(item.author);
            return (
              <div
                key={`${item.time}-${index}`}
                className={`chat-message ${isOwn ? "chat-message--own" : ""} ${!isOwn ? `chat-message--palette-${paletteIndex}` : ""}`}
              >
                <div className="chat-message-bubble">
                  {!isOwn && (
                    <span className="chat-message-author">{item.author}</span>
                  )}
                  <p className="chat-message-text">{item.message}</p>
                  <span className="chat-message-time">{item.time}</span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <footer className="chat-footer">
          <input
            type="text"
            className="chat-input"
            placeholder="Type a message..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            aria-label="Message input"
          />
          <button
            type="button"
            className="chat-send-btn"
            onClick={sendMessage}
            aria-label="Send message"
          >
            <span className="chat-send-icon" aria-hidden>→</span>
          </button>
        </footer>
      </div>
    </div>
  );
};
