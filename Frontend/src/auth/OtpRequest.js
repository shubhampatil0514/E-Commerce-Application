import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3005/users/password-reset-request', {
        email,
      });
      setMessage(response.data.message);
      navigate('/forgotpass');
    } catch (error) {
      setMessage(error.response.data.error);
    }
   
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center max-w-xs mx-auto p-4 mt-12 bg-gray-900 text-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <form>
          <div className="mb-4">
            <label className="font-bold">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 px-4 border border-gray-300 text-black rounded focus:outline-none"
              required
            />
          </div>       
          <button
            type="submit"
            onClick={handleResetOtp}
            className="bg-yellow-500 text-black  py-2 px-4 rounded font-bold cursor-pointer"
          >
            Send Otp
          </button>
        </form>
        {message && <p className="text-green-500 mt-2">{message}</p>}
      </div>  
    </div>
  );
}

export default ForgotPassword;
