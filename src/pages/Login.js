import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const AuthLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validation checks
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("https://home.gmorinaadvocates.org/api/login", { email, password });
  
      if (!response || !response.data) {
        throw new Error("Unexpected server response. Please try again.");
      }
  
      if (response.data.success) {
        const { token } = response.data;
  
        if (!token) {
          throw new Error("No token received. Please contact support.");
        }
  
        // ✅ Store token securely
        localStorage.setItem("token", token);
  
        // ✅ Decode the JWT token safely
        let tokenPayload;
        try {
          const base64Payload = token.split(".")[1];
          tokenPayload = JSON.parse(atob(base64Payload));
  
          if (!tokenPayload.username || !tokenPayload.exp) {
            throw new Error("Invalid token structure.");
          }
        } catch (error) {
          console.error("Error decoding token:", error.message);
          setError("Invalid token received. Please contact support.");
          setLoading(false);
          return;
        }
  
        // ✅ Check if token is expired
        const isTokenExpired = Date.now() >= tokenPayload.exp * 1000;
        if (isTokenExpired) {
          setError("Your session has expired. Please log in again.");
          setLoading(false);
          return;
        }
  
        // ✅ Store user info & Redirect
        localStorage.setItem("username", tokenPayload.username);
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Invalid credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
  
      if (err.response) {
        setError(err.response.data?.message || "Login failed. Please check your credentials.");
      } else if (err.request) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-[#dcdcdc]">
      <div className="w-full max-w-md p-6 sm:p-8 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center">
          <img src="/logo.png" alt="Bonnie Computer Hub" className="h-12 sm:h-16" />
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold text-center text-[#000435] mt-4">
          🔐 Welcome Back
        </h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form onSubmit={handleLogin} className="mt-6">
          <div className="flex items-center border border-[#555] p-2 rounded-md mb-4">
            <FaEnvelope className="text-[#555] mx-2" />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 focus:outline-none bg-transparent text-[#000435]"
            />
          </div>

          <div className="flex items-center border border-[#555] p-2 rounded-md mb-4 relative">
            <FaLock className="text-[#555] mx-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 focus:outline-none bg-transparent text-[#000435] pr-10"
            />
            <button
              type="button"
              className="absolute right-3 text-[#555]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#024677] text-white py-2 rounded-md hover:bg-[#000435] transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <hr className="my-4 border-[#555]" />
          <p className="text-sm text-[#555] text-center">
            Access your account to manage your services and stay connected.
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthLogin;
