import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink, scroller } from 'react-scroll';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [farmerName, setFarmerName] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setFarmerName(decodedToken.farmer.farmerName);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (location.hash) {
      const section = location.hash.replace('#', '');
      scroller.scrollTo(section, {
        smooth: true,
        duration: 500,
      });
    }
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setFarmerName('');
  };

  const handleScrollLinkClick = (section) => {
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      setTimeout(() => {
        scroller.scrollTo(section, {
          smooth: true,
          duration: 500,
        });
      }, 100);  // Adjust the timeout if necessary
    } else {
      scroller.scrollTo(section, {
        smooth: true,
        duration: 500,
      });
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-green-200 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center text-3xl font-bold italic text-green-800">
            <img src='/img/logo1.png' className="h-20 w-20 rounded-full mr-2" /> Farmos
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link className="text-green-800 hover:text-green-900 font-semibold" to="/">
            <i className="fas fa-tractor"></i> Home
          </Link>
          <button className="text-green-800 hover:text-green-900 font-semibold" onClick={() => handleScrollLinkClick('about')}>
            <i className="fas fa-info-circle"></i> About
          </button>
          <button className="text-green-800 hover:text-green-900 font-semibold" onClick={() => handleScrollLinkClick('services')}>
            <i className="fas fa-concierge-bell"></i> Services
          </button>
          <button className="text-green-800 hover:text-green-900 font-semibold" onClick={() => handleScrollLinkClick('testimonials')}>
            <i className="fas fa-comments"></i> Testimonials
          </button>
          <Link className="text-green-800 hover:text-green-900 font-semibold" to="/product">
            <i className="fas fa-cow"></i> Products
          </Link>
          <Link className="text-green-800 hover:text-green-900 font-semibold" to="/cart">
            <i className="fas fa-shopping-cart"></i> Cart
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <span className="text-green-800 font-semibold">{farmerName}</span>
              <button onClick={handleLogout} className="text-green-800 hover:text-green-900 focus:outline-none font-semibold">
                <i className="fas fa-sign-out-alt"></i> Sign Out
              </button>
            </div>
          ) : (
            <Link className="border px-4 py-2 bg-green-300 rounded-lg text-green-800 hover:text-green-900 font-semibold" to="/login">
              <i className="fas fa-sign-in-alt"></i> Login
            </Link>
          )}
          <button onClick={toggleMenu} className="md:hidden ml-4 text-green-800 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-green-100 px-4 py-2`}>
        <ul className="space-y-2">
          <li>
            <Link className="block text-green-800 hover:text-green-900 font-semibold" to="/">
              <i className="fas fa-tractor"></i> Home
            </Link>
          </li>
          <li>
            <button className="block text-green-800 hover:text-green-900 font-semibold" onClick={() => handleScrollLinkClick('about')}>
              <i className="fas fa-info-circle"></i> About
            </button>
          </li>
          <li>
            <button className="block text-green-800 hover:text-green-900 font-semibold" onClick={() => handleScrollLinkClick('services')}>
              <i className="fas fa-concierge-bell"></i> Services
            </button>
          </li>
          <li>
            <button className="block text-green-800 hover:text-green-900 font-semibold" onClick={() => handleScrollLinkClick('testimonials')}>
              <i className="fas fa-comments"></i> Testimonials
            </button>
          </li>
          <li>
            <Link className="block text-green-800 hover:text-green-900 font-semibold" to="/product">
              <i className="fas fa-cow"></i> Products
            </Link>
          </li>
          <li>
            <Link className="block text-green-800 hover:text-green-900 font-semibold" to="/cart">
              <i className="fas fa-shopping-cart"></i> Cart
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="block w-full text-left text-green-800 hover:text-green-900 focus:outline-none font-semibold">
                <i className="fas fa-sign-out-alt"></i> Sign Out
              </button>
            ) : (
              <Link className="block text-green-800 hover:text-green-900 font-semibold" to="/login">
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
