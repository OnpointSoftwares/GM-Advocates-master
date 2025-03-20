import React, { useState, useEffect } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./ChatBox.css";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("⚠️ API Key is missing! Set REACT_APP_GEMINI_API_KEY in your .env file.");
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

const ChatBox = ({ onClose }) => {
  const [messages, setMessages] = useState([{ text: "Hello! How can I help you today?", sender: "bot" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("models/gemini-1.5-pro");

  useEffect(() => {
    const listModels = async () => {
      if (!API_KEY) {
        console.error("🚨 API Key is missing. Cannot fetch models.");
        return;
      }
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`);
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        const validModels = data.models?.map(model => model.name).filter(name => name.includes("gemini-1.5")) || [];
        
        if (validModels.length === 0) throw new Error("No valid models found.");
        
        setModels(validModels);
        setSelectedModel(validModels[0]);
      } catch (error) {
        console.error("🚨 Error fetching models:", error.message);
        setModels(["models/gemini-1.5-pro"]);
      }
    };
    listModels();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    if (!genAI) {
      console.error("🚨 API instance is not initialized.");
      setMessages(prev => [...prev, { text: "Error: API Key is missing.", sender: "bot" }]);
      setLoading(false);
      return;
    }

    try {
      const model = genAI.getGenerativeModel({ model: selectedModel });
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: input }] }],
      });

      const botResponse = result?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "I'm not sure how to respond.";
      setMessages(prev => [...prev, { text: botResponse, sender: "bot" }]);
    } catch (error) {
      console.error("🚨 API Error:", error);
      let errorMessage = "An error occurred. Please try again later.";

      if (error.message.includes("429")) {
        errorMessage = "🚨 API quota exceeded. Try again later.";
        setSelectedModel("models/gemini-1.5-flash");
      } else if (error.message.includes("404")) {
        errorMessage = "⚠️ Selected model is unavailable. Switching to default.";
        setSelectedModel("models/gemini-1.5-pro");
      } else if (error.message.includes("NetworkError")) {
        errorMessage = "🚨 Network error. Please check your connection.";
      }

      setMessages(prev => [...prev, { text: errorMessage, sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window show">
        <div className="chat-header">
          <h3>Chat with Us</h3>
          <button className="close-chat" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="model-selector">
          <label>Select Model:</label>
          <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
            {models.length > 0 ? models.map((model, index) => (
              <option key={index} value={model}>{model}</option>
            )) : <option>Loading...</option>}
          </select>
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
            disabled={loading}
          />
          <button onClick={handleSend} disabled={loading}>
            {loading ? "..." : <FaPaperPlane />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
