import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function AddressForm({ onClose}) {
  const location = useLocation();
  const orderSummary = location.state && location.state.orderSummary;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    orderNotes: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
<div className="flex ml-20">
    <div className="w-1/3 ">
        <h2 className="text-2xl  mt-4 w-40 bg-gray-900  mx-auto text-center rounded-lg text-white font-semibold mb-4">Add Address</h2> 
        <div className="container  p-4 bg-gray-900 rounded shadow-md  ">
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label htmlFor="firstName" className="block font-semibold text-white">First name *</label>
            <input
                type="text"
                id="firstName"bg-gray-900
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
            />
            </div>
            <div className="mb-4">
            <label htmlFor="lastName" className="block font-semibold text-white">Last name *</label>
            <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
            />
            </div>
            <div className="mb-4">
            <label htmlFor="apartment" className="block font-semibold text-white">Apartment, suite, unit*</label>
            <input
                type="text"
                id="apartment"
                name="apartment"
                value={formData.apartment}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            </div>
            <div className="mb-4">
            <label htmlFor="streetAddress" className="block font-semibold text-white">Street address </label>
            <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
            />
            </div>
            <div className="mb-4">
            <label htmlFor="city" className="block font-semibold text-white">Town / City *</label>
            <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
            />
            </div>
            <div className="mb-4">
            <label htmlFor="state" className="block font-semibold text-white">State *</label>
            <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
            />
            </div>
            <div className="mb-4">
            <label htmlFor="postalCode" className="block font-semibold text-white">PIN Code *</label>
            <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
            />
            </div>
            <div className="mb-4">
            <label htmlFor="orderNotes" className="block font-semibold text-white">Order notes (optional)</label>
            <textarea
                id="orderNotes"
                name="orderNotes"
                value={formData.orderNotes}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            ></textarea>
            </div>
        </form>
        </div>
    </div>

    <div className="w-1/2  mx-auto p-4">
        <h2 className="text-2xl  mt-4 w-60 bg-gray-900  mx-auto text-center rounded-lg text-white font-semibold mb-4">Payment Methods</h2>
        <div className=" ">
              <div className="bg-gray-200  p-10 h-full">
                <h2 className="text-2xl bg-gray-900 rounded-lg py-2 text-center font-semibold text-white">Order Summary</h2>
                <div className="mb-2 text-2xl font-semibold mt-14">
                  <p>Subtotal: ₹{orderSummary.subtotal}</p>
                </div>
                <div className="mb-2 text-2xl font-semibold mt-6">
                  <p>Tax : ₹{orderSummary.tax.toFixed(2)}</p>
                </div>
                <div className="mb-2 font-semibold text-2xl mt-6">
                  <p>Shipping Charges: ₹{orderSummary.shippingCharges}</p>
                </div>
                <hr className="my-2" />
                <div>
                  <p className="text-3xl font-bold  mt-6">Total: ₹{orderSummary.total.toFixed(2)}</p>
                </div>
              </div>
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Payment Method</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
            >
            <option value="upi">UPI</option>
            <option value="card">Card</option>
            <option value="cashOnDelivery">Cash on Delivery</option>
          </select>
          <button
            type="button"
            className="bg-gray-900 text-white font-semibold py-2 px-4 rounded-md"
            >
            Pay and Place Order
          </button>
        </div>
    </div>
</div>
  );
}

export default AddressForm;

