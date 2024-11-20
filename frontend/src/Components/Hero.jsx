import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'animate.css/animate.min.css'; 
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaPhoneAlt } from 'react-icons/fa';

const carouselItems = [
    {
        id: 1,
        image: "/img/carousel-1.jpg",
        altText: "Image 1",
        captionTitle: "The Farm of Dairy Products",
        captionText: "Welcome to our dairy farm",
        buttonText: "Explore More",
        animation: "animate__slideInRight"
    },
    {
        id: 2,
        image: "/img/carousel-2.jpg",
        altText: "Image 2",
        captionTitle: "Best Organic Dairy Products",
        captionText: "Welcome to our dairy farm",
        buttonText: "Explore More",
        animation: "animate__slideInLeft"
    }
];

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative overflow-hidden">
            {/* Social Media and Contact Information */}
            <div className="bg-gradient-to-r from-white-800 to-gray-600 py-2">
                <div className="container mx-auto flex justify-between items-center px-4 lg:px-6">
                    <div className="flex items-center space-x-4">
                        <span className="text-green font-semibold text-sm lg:text-base">Follow Us:</span>
                        <a href="#" className="text-green hover:text-blue-500 transition-transform transform hover:scale-110">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="#" className="text-green hover:text-blue-400 transition-transform transform hover:scale-110">
                            <FaTwitter size={20} />
                        </a>
                        <a href="#" className="text-green hover:text-blue-700 transition-transform transform hover:scale-110">
                            <FaLinkedinIn size={20} />
                        </a>
                        <a href="#" className="text-green hover:text-pink-500 transition-transform transform hover:scale-110">
                            <FaInstagram size={20} />
                        </a>
                    </div>
                    <div className="flex items-center space-x-4 bg-green-900 text-white py-2 px-4 rounded-lg shadow-md">
                        <FaPhoneAlt className="mr-2" />
                        <span>+012 345 6789</span>
                    </div>
                </div>
            </div>

  {/* Carousel */}
<div className="relative overflow-hidden">
    {carouselItems.map((item, index) => (
        <div key={item.id} className={`carousel-item ${index === currentIndex ? 'block' : 'hidden'}`}>
            <img className="w-full h-[100vh] object-cover" src={item.image} alt={item.altText} />
            <div className="absolute inset-0 flex items-center justify-end bg-black bg-opacity-50 p-6">
                <div className="text-right text-white max-w-md mr-6">
                    <p className="text-xl md:text-3xl mb-4 animate__animated animate__fadeIn">{item.captionText}</p>
                    <h1 className={`text-4xl md:text-7xl mb-5 font-italic animate__animated ${item.animation}`}>{item.captionTitle}</h1>
                    {/* Removed the "Explore" button */}
                </div>
            </div>
        </div>
    ))}
    <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full text-white transition-transform hover:scale-110"
        type="button"
        aria-label="Previous"
        onClick={handlePrevClick}
    >
        <span className="text-xl md:text-2xl">&lt;</span>
    </button>
    <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full text-white transition-transform hover:scale-110"
        type="button"
        aria-label="Next"
        onClick={handleNextClick}
    >
        <span className="text-xl md:text-2xl">&gt;</span>
    </button>
</div>



<div id="about" className="py-16 bg-gradient-to-r from-white-50 to-blue-100">
  <div className="container mx-auto px-4">
    <div className="text-center mx-auto pb-8 animate__animated animate__zoomIn animate__delay-1s" style={{ maxWidth: '500px' }}>
      <p className="bg-white text-primary px-4 py-2 inline-block rounded-full shadow-lg animate__animated animate__bounce animate__infinite">About Us</p>
      <h1 className="mt-5 text-3xl sm:text-4xl font-bold text-gray-800">Explore Our Platform & Its Features</h1>
    </div>
    <div className="flex flex-wrap -mx-4">
      <div className="w-full sm:w-1/2 lg:w-1/3 px-4 pt-5 animate__animated animate__fadeIn animate__delay-1s">
        <div className="flex flex-col h-full bg-white shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 group">
          <div className="flex-shrink-0">
            <img className="w-full h-56 object-cover rounded-t-lg group-hover:opacity-75 transition-opacity duration-300" src="img/gallery-8.jpg" alt="Comprehensive Dashboard" />
          </div>
          <div className="p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 shadow-md animate__animated animate__rotateIn animate__delay-1s">
              <img className="w-12 h-12 rounded-full" src="img/gallery-8.jpg" alt="Comprehensive Dashboard" />
            </div>
            <h5 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-700">Comprehensive Dashboard</h5>
            <p className="text-sm sm:text-base text-gray-500 mb-4">Our platform offers a comprehensive dashboard that provides an overview of all key metrics, including stock levels, sales data, and financial summaries, all in one place.</p>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/3 px-4 pt-5 animate__animated animate__fadeIn animate__delay-2s">
        <div className="flex flex-col h-full bg-white shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 group">
          <div className="flex-shrink-0">
            <img className="w-full h-56 object-cover rounded-t-lg group-hover:opacity-75 transition-opacity duration-300" src="img/gallery-4.jpg" alt="Real-Time Stock Management" />
          </div>
          <div className="p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 shadow-md animate__animated animate__rotateIn animate__delay-1s">
              <img className="w-12 h-12 rounded-full" src="img/gallery-4.jpg" alt="Real-Time Stock Management" />
            </div>
            <h5 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-700">Real-Time Stock Management</h5>
            <p className="text-sm sm:text-base text-gray-500 mb-4">Manage your dairy stock in real time with our intuitive stock management system. Track inventory levels, update records, and ensure accurate stock data effortlessly.</p>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/3 px-4 pt-5 animate__animated animate__fadeIn animate__delay-3s">
        <div className="flex flex-col h-full bg-white shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 group">
          <div className="flex-shrink-0">
            <img className="w-full h-56 object-cover rounded-t-lg group-hover:opacity-75 transition-opacity duration-300" src="img/gallery-3.jpg" alt="Detailed Sales Tracking" />
          </div>
          <div className="p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 shadow-md animate__animated animate__rotateIn animate__delay-1s">
              <img className="w-12 h-12 rounded-full" src="img/gallery-3.jpg" alt="Detailed Sales Tracking" />
            </div>
            <h5 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-700">Detailed Sales Tracking</h5>
            <p className="text-sm sm:text-base text-gray-500 mb-4">Our sales tracking feature allows you to monitor and analyze sales data with detailed reports and charts, helping you make informed business decisions and drive growth.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>






{/* Additional Features Section */}
<div className="container mx-auto py-16 px-4 lg:px-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="text-center bg-primary p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
            <img className="w-16 h-16 mb-4 mx-auto" src="img/experience.png" alt="Experience" />
            <h1 className="text-3xl sm:text-4xl text-white mb-2 animate__animated animate__bounceIn">25</h1>
            <span className="text-base sm:text-lg font-semibold text-secondary">Years Experience</span>
        </div>
        <div className="text-center bg-secondary p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
            <img className="w-16 h-16 mb-4 mx-auto" src="img/award.png" alt="Awards" />
            <h1 className="text-3xl sm:text-4xl mb-2 animate__animated animate__bounceIn">183</h1>
            <span className="text-base sm:text-lg font-semibold text-primary">Awards Won</span>
        </div>
        <div className="text-center bg-secondary p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
            <img className="w-16 h-16 mb-4 mx-auto" src="img/animal.png" alt="Animals" />
            <h1 className="text-3xl sm:text-4xl mb-2 animate__animated animate__bounceIn">2619</h1>
            <span className="text-base sm:text-lg font-semibold text-primary">Total Animals</span>
        </div>
        <div className="text-center bg-primary p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
            <img className="w-16 h-16 mb-4 mx-auto" src="img/client.png" alt="Clients" />
            <h1 className="text-3xl sm:text-4xl text-white mb-2 animate__animated animate__bounceIn">51,940</h1>
            <span className="text-base sm:text-lg font-semibold text-secondary">Happy Clients</span>
        </div>
    </div>
</div>

<div className="relative overflow-hidden py-10 bg-cover bg-center" style={{ backgroundImage: 'url(img/banner.jpg)' }}>
  <div className="absolute inset-0 bg-black opacity-50"></div>
  <div className="relative container mx-auto px-4 py-10">
    <div className="flex flex-wrap -mx-4">
      <div className="w-full lg:w-1/2 px-4 mb-10 lg:mb-0">
        <div className="flex flex-wrap -mx-4 items-center">
          <div className="w-full sm:w-1/3 px-4 mb-6 sm:mb-0">
            <img className="w-full h-auto rounded-lg" src="img/banner-1.jpg" alt="Quality Dairy Products" />
          </div>
          <div className="w-full sm:w-2/3 px-4">
            <h2 className="text-white text-xl sm:text-2xl mb-3">Top-Quality Dairy Products from India</h2>
            <p className="text-white text-sm sm:text-base mb-4">Experience the finest dairy products with our commitment to freshness and quality. From rich milk to creamy curd, we bring the best of Indian dairy to your doorstep.</p>
          
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 px-4">
        <div className="flex flex-wrap -mx-4 items-center">
          <div className="w-full sm:w-1/3 px-4 mb-6 sm:mb-0">
            <img className="w-full h-auto rounded-lg" src="img/banner-2.jpg" alt="Fresh Milk Delivery" />
          </div>
          <div className="w-full sm:w-2/3 px-4">
            <h2 className="text-white text-xl sm:text-2xl mb-3">Fresh Milk Delivery Across India</h2>
            <p className="text-white text-sm sm:text-base mb-4">Enjoy fresh milk delivered straight to your home, ensuring the highest quality and taste. Our delivery service spans across the nation, bringing you the best from our farms.</p>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<div id="services" className="py-16 bg-gradient-to-r from-white-50 to-blue-100">
  <div className="container mx-auto px-4">
    <div className="text-center mx-auto pb-8 animate__animated animate__zoomIn animate__delay-1s" style={{ maxWidth: '500px' }}>
      <p className="bg-white text-primary px-4 py-2 inline-block rounded-full shadow-lg animate__animated animate__bounce animate__infinite">Our Services</p>
      <h1 className="mt-5 text-4xl font-bold text-gray-800">Services That We Offer For Entrepreneurs</h1>
    </div>
    <div className="flex flex-wrap -mx-4">
      {[
        {
          imgSrc: 'img/service-1.jpg',
          altText: 'Livestock Management',
          title: 'Livestock Management',
          description: 'We provide comprehensive services for managing your livestock, ensuring their health and productivity.',
          delay: '0.1s',
        },
        {
          imgSrc: 'img/service-2.jpg',
          altText: 'Financial Management',
          title: 'Financial Management',
          description: 'Our experts help you manage finances effectively, maximizing profits and ensuring sustainable growth.',
          delay: '0.3s',
        },
        {
          imgSrc: 'img/service-3.jpg',
          altText: 'Breeding & Veterinary',
          title: 'Breeding & Veterinary',
          description: 'We offer expert breeding advice and veterinary services to maintain the health and productivity of your livestock.',
          delay: '0.5s',
        },
      ].map((service, index) => (
        <div
          key={index}
          className="w-full sm:w-1/2 lg:w-1/3 px-4 pt-5 animate__animated animate__fadeIn"
          style={{ animationDelay: service.delay }}
        >
          <div className="flex flex-col h-full bg-white shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 group">
            <div className="flex-shrink-0">
              <img className="w-full h-56 object-cover rounded-t-lg group-hover:opacity-75 transition-opacity duration-300" src={service.imgSrc} alt={service.altText} />
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 shadow-md animate__animated animate__rotateIn" style={{ animationDelay: service.delay }}>
                <img className="w-12 h-12 rounded-full" src={service.imgSrc} alt={service.altText} />
              </div>
              <h5 className="text-2xl font-semibold mb-3 text-gray-700">{service.title}</h5>
              <p className="text-gray-500 mb-4">{service.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>




<div className="h-screen w-screen py-12 px-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 h-full">
    <div className="relative overflow-hidden rounded-lg group">
      <a href="img/gallery-5.jpg" data-lightbox="gallery" className="block h-full w-full">
        <img className="w-full h-full object-cover transition-transform transform group-hover:scale-110 rounded-lg shadow-lg" src="img/gallery-5.jpg" alt="Gallery 5" />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-lg font-semibold">View Image</div>
      </a>
    </div>
    <div className="relative overflow-hidden rounded-lg group">
      <a href="img/gallery-1.jpg" data-lightbox="gallery" className="block h-full w-full">
        <img className="w-full h-full object-cover transition-transform transform group-hover:scale-110 rounded-lg shadow-lg" src="img/gallery-1.jpg" alt="Gallery 1" />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-lg font-semibold">View Image</div>
      </a>
    </div>
    <div className="relative overflow-hidden rounded-lg group">
      <a href="img/gallery-2.jpg" data-lightbox="gallery" className="block h-full w-full">
        <img className="w-full h-full object-cover transition-transform transform group-hover:scale-110 rounded-lg shadow-lg" src="img/gallery-2.jpg" alt="Gallery 2" />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-lg font-semibold">View Image</div>
      </a>
    </div>
    <div className="relative overflow-hidden rounded-lg group">
      <a href="img/gallery-6.jpg" data-lightbox="gallery" className="block h-full w-full">
        <img className="w-full h-full object-cover transition-transform transform group-hover:scale-110 rounded-lg shadow-lg" src="img/gallery-6.jpg" alt="Gallery 6" />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-lg font-semibold">View Image</div>
      </a>
    </div>
    <div className="relative overflow-hidden rounded-lg group">
      <a href="img/gallery-7.jpg" data-lightbox="gallery" className="block h-full w-full">
        <img className="w-full h-full object-cover transition-transform transform group-hover:scale-110 rounded-lg shadow-lg" src="img/gallery-7.jpg" alt="Gallery 7" />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-lg font-semibold">View Image</div>
      </a>
    </div>
    <div className="relative overflow-hidden rounded-lg group">
      <a href="img/gallery-3.jpg" data-lightbox="gallery" className="block h-full w-full">
        <img className="w-full h-full object-cover transition-transform transform group-hover:scale-110 rounded-lg shadow-lg" src="img/gallery-3.jpg" alt="Gallery 3" />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-lg font-semibold">View Image</div>
      </a>
    </div>
    <div className="relative overflow-hidden rounded-lg group">
      <a href="img/gallery-4.jpg" data-lightbox="gallery" className="block h-full w-full">
        <img className="w-full h-full object-cover transition-transform transform group-hover:scale-110 rounded-lg shadow-lg" src="img/gallery-4.jpg" alt="Gallery 4" />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-lg font-semibold">View Image</div>
      </a>
    </div>
    <div className="relative overflow-hidden rounded-lg group">
      <a href="img/gallery-8.jpg" data-lightbox="gallery" className="block h-full w-full">
        <img className="w-full h-full object-cover transition-transform transform group-hover:scale-110 rounded-lg shadow-lg" src="img/gallery-8.jpg" alt="Gallery 8" />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-lg font-semibold">View Image</div>
      </a>
    </div>
  </div>
</div>




        <div>
{/* Product Start */}
<div className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <p className="bg-white text-primary px-4 py-2 inline-block rounded-full shadow-lg animate__animated animate__bounce animate__infinite">
        Our Product
      </p>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 text-gray-800">
        Our Dairy Products For Healthy Living
      </h1>
    </div>
    <div className="flex flex-wrap -mx-4">
      {/* Product Item */}
      {[1, 2, 3, 4].map((num) => (
        <div
          key={num}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8"
        >
          <div className="relative bg-white p-6 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-50 duration-300 ease-in-out">
            <img
              className="w-full h-48 sm:h-56 object-cover rounded-md mb-4 transition-transform transform hover:scale-110 duration-300 ease-in-out"
              src={`img/product-${num}.jpg`}
              alt={`Product ${num}`}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out">
              <a
                className="bg-secondary text-white p-3 rounded-full mx-2 transition-transform transform hover:scale-110 duration-300 ease-in-out"
                href="#"
              >
                <i className="bi bi-link"></i>
              </a>
              <a
                className="bg-secondary text-white p-3 rounded-full mx-2 transition-transform transform hover:scale-110 duration-300 ease-in-out"
                href="#"
              >
                <i className="bi bi-cart"></i>
              </a>
            </div>
            <div className="text-center mt-4">
              <a
                className="block text-sm sm:text-base md:text-lg font-semibold text-gray-800 hover:text-primary transition-colors duration-300 ease-in-out"
                href="#"
              >
                Product {num}
              </a>
              <div className="flex justify-center items-baseline mt-2">
                <span className="text-primary text-lg sm:text-xl font-semibold">$19.00</span>
                <span className="text-gray-500 ml-2 text-sm line-through">$29.00</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
{/* Product End */}




{/* Team Section */}
<div className="py-20 bg-gradient-to-r from-white-50 to-gray-100 relative overflow-hidden">
    {/* Background Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-white to-transparent opacity-30"></div>

    <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
            <p className="bg-white text-primary px-4 py-2 inline-block rounded-full shadow-lg animate__animated animate__bounce animate__infinite">
                Meet the Team
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 text-gray-800 animate__fadeIn">Our Dedicated Team</h1>
        </div>
        <div className="flex flex-wrap justify-center -mx-4">
            {[
                {
                    imgSrc: 'img/team-1.jpg',
                    name: 'Ravi Kumar',
                    role: 'Farm Owner',
                    description: 'Ravi Kumar is the visionary behind our dairy farm, dedicated to improving the quality of dairy products while preserving traditional farming practices.',
                    social: ['facebook-f', 'twitter', 'instagram']
                },
                {
                    imgSrc: 'img/team-2.jpg',
                    name: 'Aarti Patel',
                    role: 'Veterinarian',
                    description: 'Aarti Patel ensures the health and well-being of our livestock with her extensive expertise in animal care and veterinary practices.',
                    social: ['facebook-f', 'twitter', 'instagram']
                },
                {
                    imgSrc: 'img/team-3.jpg',
                    name: 'Vinay Singh',
                    role: 'Marketing Specialist',
                    description: 'Vinay Singh manages our marketing strategies, ensuring our farm\'s products are well-promoted and appreciated in the local and regional markets.',
                    social: ['facebook-f', 'twitter', 'instagram']
                },
            ].map((member, index) => (
                <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-2xl relative overflow-hidden animate__fadeIn animate__animated">
                        <img className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 border-4 border-blue-200 transition-transform transform hover:rotate-12" src={member.imgSrc} alt={member.name} />
                        <h5 className="text-lg sm:text-xl font-semibold text-gray-800">{member.name}</h5>
                        <p className="text-sm text-gray-500 mb-2">{member.role}</p>
                        <p className="text-gray-600 mb-4 text-sm sm:text-base">{member.description}</p>
                        <div className="flex justify-center space-x-3">
                            {member.social.map((network, index) => (
                                <a key={index} className="text-blue-600 hover:text-blue-800 transition-colors text-xl sm:text-2xl" href={`#`} aria-label={network}>
                                    <i className={`bi bi-${network}`}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
</div>
</div>

<section id="testimonials" className="py-8 px-4">
  <div className="flex flex-col items-center mb-8">
    <div className="text-center max-w-2xl">
      <p className="bg-white text-primary px-4 py-2 inline-block rounded-full shadow-lg animate__animated animate__bounce animate__infinite">
        Testimonials
      </p>
      <h3 className="text-3xl font-semibold mb-4 animate__animated animate__fadeInDown">Testimonials</h3>
      <p className="mb-4 pb-2 md:mb-5 md:pb-0 text-lg animate__animated animate__fadeIn">
        Our customers love our fresh dairy products. Hear what they have to say about their experiences with our farm.
        We take pride in providing top-quality milk, butter, ghee, and paneer, produced using sustainable and ethical farming practices. Our commitment to excellence and customer satisfaction is reflected in these heartfelt testimonials from our valued customers across India.
      </p>
    </div>
  </div>

  <div className="flex flex-wrap justify-center items-stretch animate__animated animate__fadeInUp">
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 flex animate__animated animate__zoomIn animate__delay-0.5s">
      <div className="bg-white rounded-lg shadow-lg w-full">
        <div className="h-24 bg-green-700 rounded-t-lg"></div>
        <div className="relative flex justify-center -mt-8">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
            className="rounded-full border-4 border-white"
            alt="Avatar"
          />
        </div>
        <div className="p-4">
          <h4 className="text-lg font-semibold mb-4">Aditi Sharma</h4>
          <hr className="my-4"/>
          <p className="text-gray-700 mt-4 text-sm">
            <i className="fas fa-quote-left pr-2"></i>The fresh milk from this dairy farm is simply the best. Our family loves it, and the quality is always top-notch.
          </p>
        </div>
      </div>
    </div>
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 flex animate__animated animate__zoomIn animate__delay-1s">
      <div className="bg-white rounded-lg shadow-lg w-full">
        <div className="h-24 bg-green-700 rounded-t-lg"></div>
        <div className="relative flex justify-center -mt-8">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
            className="rounded-full border-4 border-white"
            alt="Avatar"
          />
        </div>
        <div className="p-4">
          <h4 className="text-lg font-semibold mb-4">Meera Joshi</h4>
          <hr className="my-4"/>
          <p className="text-gray-700 mt-4 text-sm">
            <i className="fas fa-quote-left pr-2"></i>We have been sourcing our dairy products from this farm for years. The butter and ghee are particularly outstanding.
          </p>
        </div>
      </div>
    </div>
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 flex animate__animated animate__zoomIn animate__delay-1.5s">
      <div className="bg-white rounded-lg shadow-lg w-full">
        <div className="h-24 bg-green-700 rounded-t-lg"></div>
        <div className="relative flex justify-center -mt-8">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp"
            className="rounded-full border-4 border-white"
            alt="Avatar"
          />
        </div>
        <div className="p-4">
          <h4 className="text-lg font-semibold mb-4">Rajesh Kumar</h4>
          <hr className="my-4"/>
          <p className="text-gray-700 mt-4 text-sm">
            <i className="fas fa-quote-left pr-2"></i>I'm so glad we found this dairy farm. The paneer is incredibly fresh and delicious. Highly recommended!
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

</div>
 );
};
export default Hero;
