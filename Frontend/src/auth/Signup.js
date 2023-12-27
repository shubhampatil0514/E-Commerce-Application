import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('profilePicture', profilePicture);

      const response = await axios.post('http://localhost:3005/users/signup', formData);
      if (response.status === 200) {
        setUsername('');
        setEmail('');
        setPassword('');
        setProfilePicture(null);
        setMessage('User registered successfully');
      } else {
        setMessage('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center"
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
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form>
          <div className="mb-4 ">
            <label className="font-bold">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full py-2 px-4 border rounded border-gray-300 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="font-bold">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 px-4 border rounded border-gray-300 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="font-bold">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 px-4 border rounded border-gray-300 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="font-bold">Profile Picture:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              className="w-full py-2 px-4 border rounded border-gray-300 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            onClick={handleSignup}
            className="bg-gray-900 text-white py-2 px-4 rounded font-bold cursor-pointer"
          >
            Sign Up
          </button>
        </form>
        {message && <p className="text-red-500 mt-2">{message}</p>}
      </div>
    </div>
  );
}

export default Signup;


