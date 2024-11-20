import React, { useState } from 'react';
import 'animate.css';

const ContactForm = ({ isVisible, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  if (!isVisible) return null;

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email address is invalid';
    if (!formData.message) errors.message = 'Message is required';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('YOUR_API_ENDPOINT_HERE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setSuccess('Your message has been sent successfully!');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (err) {
      setError('There was a problem sending your message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate__animated animate__fadeIn">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md animate__animated animate__zoomIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-lg">Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" 
              required
            />
            {validationErrors.name && <p className="text-red-500 mt-1">{validationErrors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-lg">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" 
              required
            />
            {validationErrors.email && <p className="text-red-500 mt-1">{validationErrors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-lg">Message</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" 
              rows="4"
              required
            ></textarea>
            {validationErrors.message && <p className="text-red-500 mt-1">{validationErrors.message}</p>}
          </div>
          {error && <p className="text-red-500 animate__animated animate__shakeX">{error}</p>}
          {success && <p className="text-green-500 animate__animated animate__fadeIn">{success}</p>}
          <div className="flex justify-end space-x-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
            >
              Close
            </button>
            <button 
              type="submit" 
              className={`bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
