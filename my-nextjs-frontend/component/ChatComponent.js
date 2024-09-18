import { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from "./chatComponent.module.css";

const socket = io("http://localhost:3001");

const ChatComponent = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("Connecting to WebSocket...");

    //connect event listener, connection established, cb will run
    socket.on("connect", () => {
      console.log("Connected to WebSocket");
    });

    socket.on("message", (msg) => {
      console.log("Received message:", msg); //should get username: "", text:""
      setMessages((prevMessages) => [...prevMessages, msg]); //update message list,... will copy into new array
    });

    //clean up function
    return () => {
      socket.off("message"); //remove event listener
      socket.off("connect"); //disconnect here, remove the connection established
    };
  }, []);

  const sendMessage = () => {
    //check if these states are not empty
    if (message && username) {
      socket.emit("message", { username, text: message });
      //reset input field, new message
      setMessage("");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Chat</h2>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className={styles.button} onClick={sendMessage}>
          Send
        </button>
      </div>
      <div className={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div key={index} className={styles.message}>
            <strong>{msg.username}:</strong> {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatComponent;
