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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("https://home.gmorinaadvocates.org/api/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        let tokenPayload;
        try {
          tokenPayload = JSON.parse(atob(response.data.token.split(".")[1]));
        } catch (error) {
          setError("Invalid token received. Please try again.");
          setLoading(false);
          return;
        }
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
