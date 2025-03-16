import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope } from "react-icons/fa"; // Import icon
import "./Login.css"; // Uses shared styles

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/forgot-password", { email });
      setMessage("✅ Check your email for password reset instructions.");
    } catch (err) {
      setMessage("❌ Error sending reset link. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Forgot Password</h2>
        {message && <p className={`message ${message.includes("✅") ? "success" : "error"}`}>{message}</p>}
        
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="input-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit">Send Reset Link</button>
        </form>

        {/* Login Link */}
        <p>
          Remembered your password? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
