import React, { useState } from "react";
import { FaCommentDots, FaTimes, FaPaperPlane } from "react-icons/fa";
import "./ChatBox.css";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => {
    setIsOpen((prev) => {
      console.log("Chat Toggled! New state:", !prev);
      return !prev;
    });
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    // Simulated bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Thank you for reaching out! We'll get back soon.", sender: "bot" },
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="chat-container">
      <button className="chat-button" onClick={toggleChat}>
        <FaCommentDots />
      </button>

      <div className={`chat-window ${isOpen ? "show" : "hide"}`}>
        <div className="chat-header">
          <h3>Chat with Us</h3>
          <button onClick={toggleChat}>
            <FaTimes />
          </button>
        </div>
        <div className="chat-body">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
