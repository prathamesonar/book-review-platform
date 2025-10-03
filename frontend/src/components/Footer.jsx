
import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 mt-auto shadow-inner">
      <div className="container mx-auto px-4 py-5 flex justify-between items-center text-sm">
        {/* Copyright Section */}
        <p>&copy; {new Date().getFullYear()} BookReview. All rights reserved.</p>

        {/* Built by Section */}
        <div className="flex items-center space-x-2">
          <span>Built with ❤️ by</span>
          <a
            href="https://github.com/prathamesonar" 
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 flex items-center"
          >
            Prathamesh Sonar
            <FaExternalLinkAlt className="ml-2" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;