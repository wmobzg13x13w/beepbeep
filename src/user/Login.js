import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { showToast } from "../utlis/toastNotifications";
import bg from "../assets/bg.jpg";
import logo from "../assets/logo.png";
import Lumialogo from "../assets/logolumia.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://oil-shard-ginger.glitch.me//api/auth/login",
        {
          email,
          password,
        }
      );
      const token = response.data.data.refreshToken;
      const user = response.data.data.user.id;
      localStorage.setItem("token", token);

      localStorage.setItem("user", user);

      const role = response.data.data.user.role;
      showToast("Login successful!", "success");
      if (role === "admin") {
        navigate("/");
      } else {
        navigate("/PresidentHome");
      }
    } catch (error) {
      showToast("Login failed. Please check your credentials.", "error");
    }
  };
  return (
    <div className='flex flex-col md:flex-row h-screen font-montserrat bg-gray-50 overflow-hidden'>
      <div className='md:w-1/2 flex flex-col items-center justify-center bg-white p-8 shadow-lg'>
        <img src={logo} className='w-52 mb-4' alt='Nectar Logo' />
        <h1 className='text-4xl font-bold mb-2 ' style={{ color: "#09B1EC" }}>
          Welcome to Beep <br />
          <span className='text-indigo-800 ml-8'> Beep delivery</span>
        </h1>
        <p className='text-xs text-gray-500 mb-6'>
          Welcome back! Please enter your details to continue.
        </p>

        <form className='w-full max-w-sm' onSubmit={(e) => e.preventDefault()}>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-semibold mb-2'
              htmlFor='email'>
              Email address
            </label>
            <input
              className='shadow-sm border rounded w-full py-2 px-3 border-gray-300 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-semibold mb-2'
              htmlFor='password'>
              Password
            </label>
            <div className='relative'>
              <input
                className='shadow-sm border rounded w-full py-2 px-3 border-gray-300 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='password'
                type={showPassword ? "text" : "password"}
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className='absolute inset-y-0 right-0 flex items-center justify-center px-3 text-gray-500 hover:text-gray-700'
                type='button'
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className='flex items-center justify-center mb-4'>
            <button
              className='bg-second hover:bg-second text-white text-sm py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-all'
              type='button'
              style={{ background: "#09B1EC" }}
              onClick={handleLogin}>
              Sign In
            </button>
          </div>
        </form>
      </div>

      <div
        className='md:w-1/2 bg-cover bg-center relative flex justify-center items-center'
        style={{ backgroundImage: `url(${bg})` }}>
        {/* Darker Overlay with Blur */}
        <div className='absolute inset-0 bg-gradient-to-b from-black/70 to-black/40'></div>
      </div>
    </div>
  );
}

export default Login;
