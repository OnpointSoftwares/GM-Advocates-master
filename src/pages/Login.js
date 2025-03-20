import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

const AuthLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        const tokenPayload = JSON.parse(atob(response.data.token.split(".")[1]));
        localStorage.setItem("username", tokenPayload.username);
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        {/* Logo */}
        <div className="flex justify-center">
          <img src="/logo.png" alt="GM Orina Advocates" className="h-16" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mt-4">
          🔐 System Login
        </h2>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="mt-6">
          <div className="flex items-center border border-gray-300 p-2 rounded-md mb-4">
            <FaEnvelope className="text-gray-500 mx-2" />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 focus:outline-none"
            />
          </div>

          <div className="flex items-center border border-gray-300 p-2 rounded-md mb-4">
            <FaLock className="text-gray-500 mx-2" />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Tiny Description */}
          <hr className="my-4 border-gray-300" />
          <p className="text-sm text-gray-600 text-center">
            Access your account to manage your services and stay connected.
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthLogin;
