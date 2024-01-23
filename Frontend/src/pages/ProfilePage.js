import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading'; 



function UserProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); 
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]); 

   

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false); 
      navigate('/login');
      return;
    }
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      axios
        .get(`http://localhost:3005/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => {
          setError('Failed to fetch user data.');
        });
      
      axios
        .get(`http://localhost:3005/order/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setOrders(response.data.orders);
          setIsLoading(false);

        })
        .catch((error) => {
          setError('Failed to fetch order history.');
          setIsLoading(false);
        });
    } catch (error) {
      setError('Invalid token. Please log in again.');
      setIsLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const handleReview = (productId, userName) => {
    console.log('productId:', productId);
    console.log('userName:', userName);
    console.log('hii');
    navigate(`/review/${productId}/${userName}`);
  };
  
  return (
    <div className="max-w-screen-xl mx-auto p-4">
      {isLoading && <Loading />} 
      {error && !isLoading && <p className="text-red-500">{error}</p>}
      {user && (
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-2xl font-bold mb-4">User Profile</h2>
          <div className="flex items-center">
            <div className="w-28 h-28 ml-4 rounded-full overflow-hidden">
              <img
                src={`http://localhost:3005/${user.profilePicture}`}
                alt={`Product: ${user.name}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-10 text-xl container px-4 max-w-md  ">
              <p className="mb-4 mt-6">
                <strong>User ID:</strong> {user._id}
              </p>
              <p className="mb-4">
                <strong>Name:</strong> {user.username}
              </p>
              <p className="mb-4">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="mb-6">
                <strong>Joined:</strong> {user.createdAt}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Logout
          </button>
        </div>
      )}

      {orders.length > 0 && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2">Order History</h2>
          <ul>
            {orders.map((order) => (
              <li key={order._id} className="mb-6 p-4 border rounded shadow-md">
                <div>
                  <span className="text-lg font-semibold">Order ID:</span>
                  <span className="text-gray-700 ml-2">{order._id}</span>
                </div>
                <div className="mt-4">
                  <span className="text-lg font-semibold">Products:</span>
                  <ul className="list-disc ml-6">
                    {order.products.map((product, index) => (
                      <li key={index} className="mt-2">
                        <div>
                          <span className="text-lg font-semibold">Product ID:</span>
                          <span className="text-gray-700 ml-2">{order.products[index]}</span>
                        </div>
                        <div className="mt-2">
                          <span className="text-lg font-semibold">Quantity:</span>
                          <span className="text-gray-700 ml-2">{order.quantity[index]}</span>
                        </div>
                        <button
                          onClick={() => handleReview(order.products[index],user.username,)}
                          className="mt-4 bg-yellow-500 hover:bg-red-600 text-black font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                          Write Review
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-2">
                  <span className="text-lg font-semibold">Date placed:</span>
                  <span className="text-gray-700 ml-2">{order.orderDate}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
