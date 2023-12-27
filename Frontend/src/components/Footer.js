import React from 'react';
import Text from '../components/Text';

const Footer = () => {
  return (
    <footer className="bg-gray-300 text-black py-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 ml-10">
            <h3 className="text-lg font-semibold mb-4">Shop Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#">Electronics</a>
              </li>
              <li>
                <a href="#">Clothing</a>
              </li>
              <li>
                <a href="#">Home & Kitchen</a>
              </li>
              <li>
                <a href="#">Toys & Games</a>
              </li>
            </ul>
          </div>

    
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Shipping Information</a>
              </li>
              <li>
                <a href="#">Returns & Exchanges</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>

          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              vehicula lacus at dapibus. Nunc interdum in purus ut faucibus.
            </p>
          </div>

        
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <Text text='Facebook' color='primary'/>
            <Text text='Instagram' color='primary' />
            <Text text='Twitter' color='primary' />
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p>&copy; 2023 Your E-commerce Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
