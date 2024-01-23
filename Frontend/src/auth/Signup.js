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
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center max-w-xs mx-auto p-4 mt-12 bg-gray-900 text-slate-200  shadow-md rounded">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form>
          <div className="mb-4 ">
            <label className="font-bold">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full py-2 px-4 border rounded text-black border-gray-300 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="font-bold">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 px-4 border rounded border-gray-300 text-black focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="font-bold">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 px-4 border rounded border-gray-300 text-black focus:outline-none"
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
            className="bg-yellow-500 text-black py-2 px-4 rounded font-bold cursor-pointer"
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


