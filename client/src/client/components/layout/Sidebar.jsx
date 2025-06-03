import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUtensils, FaPlus, FaStore, FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { ShopContext } from '@/context/ShopContext';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { setRestaurant } = useContext(ShopContext);

  const handleLogout = () => {
    Cookies.remove('clientToken');
    Cookies.remove('clientData');
    setRestaurant('')
    navigate('/client/login');
    toast.success('Logged out successfully');
  };

  return (
    <div className={`bg-gray-800 text-white h-screen ${isExpanded ? 'w-60' : 'w-14'} flex flex-col transition-all duration-300 pt-4 fixed top-0 left-0 z-10`}>
      <button onClick={() => setIsExpanded(!isExpanded)} className="p-2 flex items-center justify-start ml-2">
        <FaBars />
      </button>
      <nav className="mt-4">
        <ul className="space-y-4 flex flex-col items-center w-full p-2">
          <li className="w-full">
            <Link to="/client/dashboard" className={`flex items-center p-2 hover:bg-gray-700 ${isExpanded ? 'justify-start' : 'justify-center'} w-full`}>
              <FaHome className={isExpanded ? "mr-2" : ""} />
              {isExpanded && <span>Dashboard</span>}
            </Link>
          </li>
          <li className="w-full">
            <Link to="/client/menu" className={`flex items-center p-2 hover:bg-gray-700 ${isExpanded ? 'justify-start' : 'justify-center'} w-full`}>
              <FaUtensils className={isExpanded ? "mr-2" : ""} />
              {isExpanded && <span>Menu</span>}
            </Link>
          </li>
          <li className="w-full">
            <Link to="/client/add-products" className={`flex items-center p-2 hover:bg-gray-700 ${isExpanded ? 'justify-start' : 'justify-center'} w-full`}>
              <FaPlus className={isExpanded ? "mr-2" : ""} />
              {isExpanded && <span>Add Products</span>}
            </Link>
          </li>
          <li className="w-full">
            <Link to="/client/restaurant-details" className={`flex items-center p-2 hover:bg-gray-700 ${isExpanded ? 'justify-start' : 'justify-center'} w-full`}>
              <FaStore className={isExpanded ? "mr-2" : ""} />
              {isExpanded && <span>Restaurant Details</span>}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="absolute bottom-0 w-full p-2">
        <ul className="space-y-2">
          <li>
            <Link to="/client/profile" className={`flex items-center p-2 hover:bg-gray-700 ${isExpanded ? 'justify-start' : 'justify-center'}`}>
              <FaUser className={isExpanded ? "mr-2" : ""} />
              {isExpanded && <span>Profile</span>}
            </Link>
          </li>
          <li>
            <div onClick={handleLogout} className={`flex items-center p-2 hover:bg-gray-700 ${isExpanded ? 'justify-start' : 'justify-center'}`}>
              <FaSignOutAlt className={isExpanded ? "mr-2" : ""} />
              {isExpanded && <span>Logout</span>}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar; 