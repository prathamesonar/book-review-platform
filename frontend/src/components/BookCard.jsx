import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const BookCard = ({ book }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          <Link to={`/book/${book._id}`} state={{ book }} className="hover:text-blue-500 dark:hover:text-blue-400">
            {book.title}
          </Link>
        </h3>
        <p className="text-md text-gray-700 dark:text-gray-300 mb-4">by {book.author}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 inline-block px-2 py-1 rounded">
            {book.genre}
        </p>
      </div>
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
        <Rating value={book.averageRating} text={`${book.averageRating.toFixed(1)} stars`} />
      </div>
    </div>
  );
};

export default BookCard;