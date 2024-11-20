import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Navbar from './Components/Navbar';
import Signup from './Pages/Signup';
import Dashboard from './Components/Dashboard';
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminSignup from './Pages/Admin/AdminSignup';
import AdminHome from './Pages/Admin/AdminHome';
import AdminProduct from './Pages/Admin/AdminProducts';
import { FarmerProvider } from './Pages/Admin/FarmerContext';
import AdminLivestock from './Pages/Admin/AdminLivestock';
import Hero from './Components/Hero';
import Footer from './Components/Footer';
import Cart from './Pages/Cart';
import AllProducts from './Pages/AllProducts';
import Payment from './Pages/Payment';
import OrderConfirmation from './Pages/OrderConfirmation'; 

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cartItems.find(item => item.productID === product.productID);
    if (existingProduct) {
      setCartItems(cartItems.map(item =>
        item.productID === product.productID ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    setCartItems(cartItems.filter((item) => item.productID !== product.productID));
  };

  const updateCartItemQuantity = (product, quantity) => {
    if (quantity <= 0) {
      removeFromCart(product);
    } else {
      setCartItems(cartItems.map(item =>
        item.productID === product.productID ? { ...item, quantity } : item
      ));
    }
  };

  return (
    <Router>
      <FarmerProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/dashboard" element={<AdminHome />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/admin/products" element={<AdminProduct />} />
          <Route path="/admin/livestock" element={<AdminLivestock />} />
          <Route path="/product" element={<AllProducts addToCart={addToCart} />} />
          <Route path="/cart" element={
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              updateCartItemQuantity={updateCartItemQuantity}
            />
          } />
          <Route path="/payment" element={<Payment />} /> 
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
      </FarmerProvider>
      <Footer />
    </Router>
  );
}

export default App;
