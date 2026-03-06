import React, { useState, useEffect } from "react";
import { socket } from "../../utils/socket";
import { useSearchParams } from "react-router-dom";


function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user_id");
  const receiverId = searchParams.get("receiver_id");

  useEffect(() => {
    socket.connect(); // connect when component mounts
    socket.emit("join", userId);

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
      socket.disconnect(); // cleanup when leaving page
    };
  }, [userId]);

  const sendMessage = () => {
    socket.emit("private_message", {
      senderId: userId,
      receiverId: receiverId,
      text: message,
      time: new Date().toLocaleTimeString(),
    });
    setMessage("");
  };

  return (
    <div>
      <h2>Chat Page</h2>

      {messages.map((msg, index) => (
        <div key={index}>
          {msg.time}: {msg.text}
        </div>
      ))}

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
