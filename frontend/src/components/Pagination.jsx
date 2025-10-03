import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ pages, page, keyword = '' }) => {
  if (pages <= 1) return null;

  return (
    <div className="flex justify-center mt-8">
      <nav className="flex rounded-md shadow">
        {[...Array(pages).keys()].map((x) => (
          <Link
            key={x + 1}
            to={
              keyword
                ? `/search/${keyword}/page/${x + 1}`
                : `/page/${x + 1}`
            }
            className={`px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium
              ${
                x + 1 === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }
              ${x === 0 ? 'rounded-l-md' : ''}
              ${x === pages - 1 ? 'rounded-r-md' : ''}
            `}
          >
            {x + 1}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Pagination;