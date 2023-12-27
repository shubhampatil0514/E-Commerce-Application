import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3005/users/password-reset', {
        email,
        otp,
        newPassword,
      });
      setMessage(response.data.message);
      navigate('/login');
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="flex flex-col items-center "
      style={{
      backgroundImage: `url('./image/bg2.avif')`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed', 
      width: '100vw', 
      height: '100vh', 
      }}
      >
      <div className="flex flex-col items-center max-w-xs mx-auto p-4 mt-8 bg-green-300 shadow-md rounded"> 
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <form>
          <div className="mb-4">
            <label className="font-bold">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="font-bold">OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="font-bold">New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            onClick={handleResetPassword}
            className="bg-gray-900 text-white py-2 px-4 rounded font-bold cursor-pointer"
          >
            Reset Password
          </button>
        </form>
        {message && <p className="text-green-500 mt-2">{message}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;
