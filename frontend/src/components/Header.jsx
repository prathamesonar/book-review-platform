import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon, FaBook, FaUser, FaSignOutAlt, FaPlus } from 'react-icons/fa';

const Header = () => {
  const { userInfo, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center">
            <FaBook className="mr-2" />
            BookReview
        </Link>
        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
          
          {userInfo ? (
            <div className="flex items-center space-x-4">
              <Link to="/addbook" className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                <FaPlus className="mr-2"/> Add Book
              </Link>
              <Link to="/profile" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                <FaUser className="mr-1"/> {userInfo.name}
              </Link>
              <button onClick={handleLogout} className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400">
                <FaSignOutAlt className="mr-1"/> Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-500">
                Login
              </Link>
              <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;