import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/Auth';
import { toast } from 'react-toastify';
import useCategory from '../../hooks/useCategory';
import logo from '../../assets/Black White Elegant Monogram Initial Name Logo_20240606_180138_0000.png';
import SearchInput from '../search/Search';
import { FaInstagram, FaWhatsapp } from "react-icons/fa"; // Import Instagram and WhatsApp icons

const Header = () => {
  const categories = useCategory();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpend, setIsOpend] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsOpend(!isOpend);
  const toggleCategoryDropdown = () => setIsCategoryOpen(!isCategoryOpen);



  const dashboardPath = `/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`;

  return (
    <nav className="w-full bg-gradient-to-r from-red-200 to-blue-200 border-b-2 top-0">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-10">
          {/* Logo */}
          <div >
            <Link to="/" className="text-black text-lg font-bold">
              <img className="h-8 w-20 object-cover  rounded" src={logo} alt="Quick Learn" />
              {/* Quick Learn */}
            </Link>
          </div>

          {/* <SearchInput /> */}
        
          {/* Hamburger Icon for mobile */}
          <div className="sm:hidden">
            <button onClick={toggleMenu} className="text-black-400 hover:text-black">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>

          {/* Links for large screens */}
     
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden px-2 pt-2 pb-3 space-y-1">
     

          <Link to="/about" className="block text-black-600 hover:bg-gray-400 hover:text-white px-3 py-2 rounded-md text-base font-medium">
            About Us
          </Link>

          <Link to="/policy" className="block text-black-600 hover:bg-gray-400 hover:text-white px-3 py-2 rounded-md text-base font-medium">
            Privacy Policy
          </Link>
           <Link to="/contact" className="block text-black-600 hover:bg-gray-400 hover:text-white px-3 py-2 rounded-md text-base font-medium">
            Contact us
          </Link>
         
         

{/*          
          <div className=" gap-4">
              <a href="https://www.instagram.com/cj_attire?igsh=NmlnNDNiZXE0N2Nx&utm_source=qr" target="_blank" rel="noopener noreferrer" className="flex gap-2 text-black hover:text-gray-400">
                <FaInstagram className="h-6 w-6" /> Instagram
              </a>
              <br />
              <a href="https://wa.me/qr/VIQQXSHMF7K4O1" target="_blank" rel="noopener noreferrer" className=" flex gap-2 text-black hover:text-gray-400">
                <FaWhatsapp className="h-6 w-6" /> Whatsapp
              </a>
            </div> */}
        </div>
      )}
    </nav>
  );
};

export default Header;
