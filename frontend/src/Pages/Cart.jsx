import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart({ cartItems, updateCartItemQuantity, removeFromCart }) {
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((total, product) => total + product.price * product.quantity, 0);

  const handlePlaceOrder = () => {
    const shippingDetails = {
      name: "John Doe",
      address: "123 Main St, City, Country",
      phone: "1234567890",
    };

    navigate('/payment', {
      state: {
        shippingDetails,
        cartItems,
        totalAmount,
      },
    });
  };

  return (
    <div className="px-5 py-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {cartItems.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-700">Your Cart is Empty</h3>
            </div>
          ) : (
            cartItems.map((product) => (
              <div key={`${product.productID}-${product.quantity}`} className="bg-white p-6 mb-4 rounded-lg shadow-lg flex items-center">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-32 h-32 object-cover rounded-lg mr-4"
                  />
                )}
                <div className="flex-grow">
                  <h4 className="text-lg font-bold text-gray-800">{product.name}</h4>
                  <p className="text-gray-600 mb-1">Price: ${product.price.toFixed(2)}</p>
                  <p className="text-gray-600 mb-1">Category: {product.category}</p>
                  <p className="text-gray-600 mb-1">Stock: {product.stock}</p>
                  <p className="text-gray-600">Description: {product.description}</p>
                  <div className="flex items-center mt-4">
                    <button
                      onClick={() => updateCartItemQuantity(product, product.quantity - 1)}
                      className="bg-gray-300 text-gray-800 p-2 rounded-lg hover:bg-gray-400 transition-colors"
                      disabled={product.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="mx-4 text-gray-800 font-bold">{product.quantity}</span>
                    <button
                      onClick={() => updateCartItemQuantity(product, product.quantity + 1)}
                      className="bg-gray-300 text-gray-800 p-2 rounded-lg hover:bg-gray-400 transition-colors"
                      disabled={product.quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={() => removeFromCart(product)}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Items:</span>
              <span className="text-gray-800 font-bold">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-700">Total Amount:</span>
              <span className="text-gray-800 font-bold">${totalAmount.toFixed(2)}</span>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
