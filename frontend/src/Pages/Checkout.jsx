import { useState } from 'react';

export default function Checkout({ cartItems, totalAmount }) {
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({
      ...shippingDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your checkout logic here (e.g., send the details to the backend)
    console.log('Order placed with details:', shippingDetails, cartItems, totalAmount);
  };

  return (
    <div className="px-5 py-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Shipping Details</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={shippingDetails.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={shippingDetails.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={shippingDetails.city}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={shippingDetails.state}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="zip">ZIP Code</label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={shippingDetails.zip}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={shippingDetails.country}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-800 font-bold">Total: ${totalAmount.toFixed(2)}</span>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
