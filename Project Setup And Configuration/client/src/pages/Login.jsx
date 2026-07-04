import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Lnav from '../components/LNavbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { email, password };
      const res = await axios.post("https://nutrition-assistant-2.onrender.com/login", payload);

      if (res.data.status === "success") {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // CRITICAL: Ensure 'isAdmin' is returned by your backend
        // Use console.log to debug
        console.log("User Data:", res.data.user);

        if (res.data.user.isAdmin === true) {
          navigate("/admin"); 
        } else {
          navigate("/home");
        }
      } else {
        alert(res.data.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("An error occurred during login");
    }
  };

  const goToSignup = () => { navigate("/register"); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-200">
      <Lnav />
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h2 className="mb-6 text-center text-4xl font-semibold text-gray-800">Welcome Back 👋</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300" placeholder="you@example.com" />
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300" placeholder="Enter password" />
            <button type="submit" className="w-full py-2 bg-[#b21b46] hover:bg-rose-700 text-white font-semibold rounded-lg">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;