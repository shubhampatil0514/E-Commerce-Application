import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { GoogleLogin } from 'react-google-login';
import Loading from '../components/Loading'; 

const googleClientId = '815662093826-r5nonbtal3r861d29hd8ib3jlqmkbtg1.apps.googleusercontent.com ';

function Login() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post('http://localhost:3005/users/login', { email, password });
      const { message, token } = response.data;
      
      console.log(token);
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
     
      const userId = decodedToken.userId;

      localStorage.setItem('userId', userId);
      localStorage.setItem('token', token);
      setMessage(message);
      navigate('/');
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      localStorage.setItem('userId', userId);
    }
    setIsLoading(false); 
  }, []);


  const responseGoogle = (response) => {
    if (response.tokenId) {
      handleGoogleLoginSuccess(response.tokenId);
    } else {
      setMessage('Google login failed.');
    }
  };

  const handleGoogleLoginSuccess = async (tokenId) => {
    try {
      const response = await axios.post('http://localhost:3000/users/auth/google', { tokenId });
      const { message, token } = response.data;

      localStorage.setItem('token', token);
      setMessage(message);
      
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="flex flex-col  items-center "
        style={{
          backgroundImage: `url('./image/bg2.avif')`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed', 
          width: '100vw', 
          height: '100vh', 
        }}
      >
         {isLoading ? (
        <Loading /> 
      ) : (
        <div className="flex flex-col items-center max-w-xs mx-auto p-4 mt-8 bg-green-300 shadow-md rounded">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
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
              <label className="font-bold">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              onClick={handleLogin}
              className="bg-gray-900 text-white py-2 px-4 rounded font-bold cursor-pointer"
              >
              Login
            </button>
            <p className="mt-2 text-sky-500">
            <a href="/otp">Forgot Password?</a>
            </p>
          </form>
          <GoogleLogin
                clientId="815662093826-r5nonbtal3r861d29hd8ib3jlqmkbtg1.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
          {message && <p>{message}</p>}
        </div>
        )}
        <div className="bg-gray-900 w-96 h-1 mt-4 mb-4"></div>
        <div class="mt-6 ">
         <button
          onClick={handleSignupClick}
          className="bg-gray-900 text-white py-2 px-4 rounded font-bold cursor-pointer mt-2"
          >
          Create Your Account
          </button>
        </div>
  </div>

  );
}

export default Login;

