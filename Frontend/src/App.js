import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Product from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import ForgotPassword from './auth/ForgotPassword';
import OtpRequest from './auth/OtpRequest';
import AddressPage from './pages/AddressPage';
import PaymentPage from './pages/PaymentPage';
import ProfilePage from './pages/ProfilePage';
import ReviewPage from './components/ReviewPage';
import ProductNotFound from './components/ProductNotFound';


function App() { 
  return (
    <Router> 
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/otp" element={<OtpRequest />} />
        <Route path="/forgotpass" element={<ForgotPassword />} />
        <Route path="/address" element={<AddressPage  />}/>
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/review/:productId/:userName" element={<ReviewPage />} />
        <Route path="/notFound" element={<ProductNotFound />} />
      </Routes>
    </Router> 
  );
}

export default App;

