import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiHome, HiShoppingCart, HiMenu, HiLogout } from 'react-icons/hi';

function Sidebar() {
  const location = useLocation();

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <HiHome className="w-5 h-5" /> },
    { path: '/orders', label: 'Orders', icon: <HiShoppingCart className="w-5 h-5" /> },
    { path: '/menu', label: 'Menu', icon: <HiMenu className="w-5 h-5" /> },
  ];

  return (
    <div className="w-72 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 flex flex-col shadow-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          RealityDiner Admin
        </h2>
      </div>

      <nav className="flex-grow">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActiveRoute(item.path)
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'hover:bg-gray-700/50 text-gray-300 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-gray-700 pt-4 mt-6">
        <button className="flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all duration-200">
          <HiLogout className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
        <p className="text-sm text-gray-400 mt-4 text-center">© 2024 RealityDiner</p>
      </div>
    </div>
  );
}

export default Sidebar;