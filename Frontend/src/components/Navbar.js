import React, { useState } from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';


function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); 

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    navigate(`/product?search=${searchQuery}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <header className="bg-gray-900 text-white flex justify-between h-16 items-center">
       <nav>
        <ul className="flex ml-4">
          <li className="mr-4">
            <a href="/" className="text-white  font-bold">Home</a>
          </li>
          <li className="mr-4">
            <a href="/login" className="text-white font-bold">Login</a>
          </li>
          <li className="mr-4">
            <a href="/product" className="text-white  font-bold">Products</a>
          </li>
          <li className="mr-4">
            <a href="/orders" className="text-white  font-bold">My Orders</a>
          </li>
        </ul>
      </nav>
      <div className="flex text-black  items-center w-5/12">
        <input type="text" placeholder="Search products" 
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        className="border-2 border-gray-400 rounded-lg p-2 mr-2 w-11/12" />
        <button type="button"
        onClick={handleSearch} on={handleSearch}
         className="bg-yellow-500 text-black  rounded-lg px-4 py-2 cursor-pointer">Search</button>
      </div>
      <nav>
        <ul className="flex mr-4">
        <li>
            <Link to="/profile" className="text-white  font-bold relative">
              <FaUserCircle className="text-4xl mr-8" />
            </Link>
          </li>
          <li>
            <Link to="/cart" className="text-white  font-bold relative">
              <FiShoppingCart className="text-4xl mr-4" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

