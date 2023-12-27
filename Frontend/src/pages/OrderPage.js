import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';

function OrderPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem('userId');
  const authToken = localStorage.getItem('token');
  

  useEffect(() => {
    if (!authToken) {
      console.error('User is not authenticated.');
      setIsLoading(false);
      return;
    }

    const axiosInstance = axios.create({
      baseURL: 'http://localhost:3005',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    axiosInstance
      .get(`/order/${userId}`)
      .then((response) => {
        setOrders(response.data.orders);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        setIsLoading(false);
      });
  }, [userId, authToken]);

  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-3xl font-semibold mb-4">Your Orders</h2>
      {isLoading ? (
        <Loading /> 
      ) : (
      <ul>
        {orders.map((order) => (
          <li key={order._id} className="mb-6 p-4 border rounded shadow-md">
            <div >
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
       )}
    </div>
  );
}

export default OrderPage;



