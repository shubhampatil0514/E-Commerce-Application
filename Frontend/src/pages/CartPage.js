import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading'; 


function CartPage() {
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios
      .get(`http://localhost:3005/cart/${userId}`)
      .then((response) => {
        setCart(response.data.items);
        setIsLoading(false);
        
      })
      .catch((error) => {
        console.error('Error fetching cart:', error);
        setIsLoading(false);
      });
  }, [userId]);

    const increaseQuantity = (productId) => {
      const updatedCart = cart.map((item) => {
        if (item.productId === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCart(updatedCart);
      updateCartOnServer(updatedCart);
    };
  
    const decreaseQuantity = (productId) => {
      const updatedCart = cart.map((item) => {
        if (item.productId === productId) {
          if (item.quantity <= 1) {
            return null; 
          } else {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      });
      const filteredCart = updatedCart.filter((item) => item !== null);   
      setCart(filteredCart);
      updateCartOnServer(filteredCart);
    };
  
    const updateCartOnServer = (updatedCart) => {
      axios
        .post(`http://localhost:3005/cart/update/${userId}`, { items: updatedCart })
        .then((response) => {
        })
        .catch((error) => {
          console.error('Error updating cart:', error);
        });
    };


    const calculateSubtotal = () => {
      return cart.reduce((total, item) => total + item.productPrice * item.quantity, 0);
    };  
      const taxRate = 0.1; 
      const tax = calculateSubtotal() * taxRate;
      const shippingCharges = 100; 
      const total = calculateSubtotal() + tax + shippingCharges;

  

    const handleCheckout = () => {
      const productIds = cart.map((item) => item.productId);
      const quantities = cart.map((item) => item.quantity);
     
     
      
      
      const requestData = {
        userId: userId,
        productIds: productIds,
        quantity: quantities,
      };
      navigate('/address', { state: { orderSummary: { subtotal: calculateSubtotal(), tax, shippingCharges, total } } });
      console.log('Request Data:', requestData);
      axios
        .post(`http://localhost:3005/order/${userId}`, requestData)
        .then((response) => {
        
          
        })
        .catch((error) => {
          console.error('Error creating order:', error);
        });

        
    };
    
  return (
         <div className="  bg-gray-400">
             <div className="mx-80 border-t-gray-400 rounded-lg bg-white py-4">
                  <div className="" >
                    {isLoading ? (
                    <Loading /> 
                    ) : (
                    <ul>
                      {cart.map((item) => (
                       <React.Fragment key={item.productId}>
                        <li key={item.productId} className="flex ml-4 ">
                          <div style={{ flex: "1" }}>
                            <img
                              src={`http://localhost:3005/${item.productimg}`}
                              alt={`Product: ${item.productimg}`}
                              className="max-w-xs max-h-32 flex items-center mr-4 border-2"
                            />
                          </div>
                          <div style={{ flex: "1", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <h2 className="text-2xl font-semibold mb-1">{item.productName}</h2>
                          </div>
                          <div style={{ flex: "1" }}>
                            <div style={{ flex: "1", display: "flex", justifyContent: "center", alignItems: "center" }}>
                              <h2 className="text-2xl rounded bg-gray-200 mb-1">Quantity</h2>
                            </div>
                            <div className="flex  items-center justify-center mt-2">
                              <button
                                onClick={() => decreaseQuantity(item.productId)}
                                className="bg-gray-200 text-black rounded-l-md px-3 py-1"
                              >
                                -
                              </button>
                              <p className="text-4xl mx-2">{item.quantity}</p>
                              <button
                                onClick={() => increaseQuantity(item.productId)}
                                className="bg-gray-200 text-black rounded-r-md px-3 py-1"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div  style={{ flex: "1", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <p className="text-gray-950 text-2xl font-semibold">₹{item.productPrice}</p>
                          </div>

                        </li>
                        <div className="bg-gray-200 w-11/12 mx-auto h-0.5 mt-4 mb-4"></div>
                        </React.Fragment>
                      ))}
                    </ul>
                    )}
                  </div>
                  <div className=" mx-40" >
                    <div className="bg-gray-200  p-8 ">
                      <div className="mb-2 flex text-xl justify-between mt-8">
                        <p>Subtotal:</p>
                        <p>₹{calculateSubtotal()}</p>
                      </div>
                      <div className="bg-gray-200 w-full mx-auto h-0.5 mt-4 mb-4"></div>
                      <div className="mb-2 flex text-xl justify-between  mt-4">
                        <p>Tax ({(taxRate * 100).toFixed(0)}%):</p>
                        <p>₹{tax.toFixed(2)}</p>
                      </div>
                      <div className="bg-gray-200 w-full mx-auto h-0.5 mt-4 mb-4"></div>
                      <div className="mb-2 flex text-xl justify-between  mt-4">
                        <p>Shipping Charges: </p>
                        <p>₹{shippingCharges}</p>
                      </div>
                      <div className="bg-gray-200 w-full mx-auto h-0.5 mt-4 mb-4"></div>
                      <div className="mb-2 flex text-xl justify-between font-semibold mt-4">
                        <p className="text-2xl   ">Total:</p>
                        <p className="text-2xl   ">₹{total.toFixed(2)}</p>
                      </div>
                      <div>
                      <button className="bg-gray-900 text-white mt-10 w-full rounded-lg px-4 py-2 cursor-pointer"
                        onClick={handleCheckout}>
                        Checkout
                      </button>
                    </div>
                  </div>
                  </div>
             </div>
         </div>                        
  );

}
export default CartPage;







