import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // React Router for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token); // Store token
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (err) {
      if (err.response) {
        // ✅ Server responded with a status outside 2xx (e.g., 400, 401, 500)
        console.error("Server Error:", err.response.data);
        setError(err.response.data.message || "Login failed. Please try again.");
      } else if (err.request) {
        // ✅ Request was made, but no response was received
        console.error("No Response from Server:", err.request);
        setError("Server is not responding. Please try again later.");
      } else {
        // ✅ Other unexpected errors
        console.error("Unexpected Error:", err.message);
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>🔐 System User Login</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
