import React from 'react'
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <div>
  <footer className=" border-t-2 text-black-300 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-8">
          {/* About Link */}
          <Link
            to="/about"
            className="hover:text-gray-500 text-sm font-medium"
          >
            About
          </Link>
       
          {/* Privacy Link */}
          <Link
            to="/policy"
            className="hover:text-gray-500 text-sm font-medium"
          >
            Privacy Policy
          </Link>
          {/* Contact Link */}
          <Link
            to="/contact"
            className="hover:text-gray-500 text-sm font-medium"
          >
            Contact
          </Link>
        </div>
        {/* Copyright Section */}
        <div className="mt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} QuickLearn. All rights reserved. </p>
          <p >Transform your vision into a professional website that speaks volumes about your brand.  </p>
          <div className="max-w-7xl mx-auto flex justify-center space-x-4">
        <a 
          href="https://www.instagram.com/quick___tech?igsh=MXVoNXhmZ2hyYmp3ag==" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-gray-400"
        >
          <FaInstagram className="h-6 w-6" />
        </a>
        <a 
          href="https://wa.me/8129718562" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-gray-400"
        >
          <FaWhatsapp className="h-6 w-6" />
        </a>
        <a 
          href="mailto:ayalurajith@gmail.com" 
          className="hover:text-gray-400"
        >
          <FaEnvelope className="h-6 w-6" />
        </a>
      </div>

        </div>
      </div>
    </footer>    </div>
  )
}

export default Footer
