import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import ContactForm from './ContactForm';

const Footer = () => {
  const [isContactFormVisible, setContactFormVisible] = useState(false);

  const toggleContactForm = () => {
    setContactFormVisible(!isContactFormVisible);
  };

  return (
    <footer className="bg-gray-800 text-white text-center py-6">
      {/* Contact Us Button */}
      <div className="mb-4">
        <button 
          className="contact-btn bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" 
          onClick={toggleContactForm}
        >
          Contact Us
        </button>
      </div>

      {/* Social Media Section */}
      <div className="container mx-auto px-4 py-4">
        <section className="mb-4">
          {/* Facebook */}
          <a className="text-white hover:text-gray-400 mx-2 text-lg" href="#!" role="button">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          {/* Twitter */}
          <a className="text-white hover:text-gray-400 mx-2 text-lg" href="#!" role="button">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          {/* Google */}
          <a className="text-white hover:text-gray-400 mx-2 text-lg" href="#!" role="button">
            <FontAwesomeIcon icon={faGoogle} />
          </a>
          {/* Instagram */}
          <a className="text-white hover:text-gray-400 mx-2 text-lg" href="#!" role="button">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          {/* LinkedIn */}
          <a className="text-white hover:text-gray-400 mx-2 text-lg" href="#!" role="button">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
          {/* Github */}
          <a className="text-white hover:text-gray-400 mx-2 text-lg" href="#!" role="button">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </section>
      </div>

      {/* Copyright Section */}
      <div className="bg-gray-700 py-2">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm">
            © 2024 Copyright:
            <a className="text-white hover:text-gray-400 ml-1" href="https://mdbootstrap.com/">
              CowCare Dairy
            </a>
          </p>
        </div>
      </div>

      {/* Contact Form Modal */}
      <ContactForm isVisible={isContactFormVisible} onClose={toggleContactForm} />
    </footer>
  );
};

export default Footer;
