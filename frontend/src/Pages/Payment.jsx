import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Payment() {
  const location = useLocation();
  const { cartItems, totalAmount } = location.state;
  const [address, setAddress] = useState('');
  const [upiId, setUpiId] = useState('');
  const navigate = useNavigate();

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    // Simulate generating UPI payment link
    const upiPaymentLink = `upi://pay?pa=${upiId}&pn=YourStoreName&am=${totalAmount.toFixed(2)}&cu=INR`;

    // In real scenario, you would save order details to your database here
    alert('Redirecting to UPI payment...');
    window.location.href = upiPaymentLink;

    // After payment, redirect to order confirmation page
    navigate('/order-confirmation');
  };

  return (
    <div className="px-5 py-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Payment</h2>
      <form onSubmit={handlePlaceOrder} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Shipping Address</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="upiId" className="block text-gray-700 font-bold mb-2">UPI ID</label>
          <input
            type="text"
            id="upiId"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800">Order Summary</h3>
          <div className="flex justify-between mt-2">
            <span className="text-gray-700">Total Amount:</span>
            <span className="text-gray-800 font-bold">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
