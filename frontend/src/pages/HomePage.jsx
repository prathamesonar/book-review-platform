import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Pagination from '../components/Pagination';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [initialLoading, setInitialLoading] = useState(true); 
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  
  const { keyword: urlKeyword, pageNumber: urlPageNumber } = useParams();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState(urlKeyword || '');
  const [genre, setGenre] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (keyword !== (urlKeyword || '')) {
        if (keyword.trim()) {
          navigate(`/search/${keyword}`);
        } else {
          navigate('/');
        }
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [keyword, urlKeyword, navigate]);


  useEffect(() => {
    const fetchBooks = async () => {
      
      setLoading(true); 
      try {
        const { data } = await api.get(`/api/books`, {
          params: {
            keyword: urlKeyword,
            pageNumber: urlPageNumber,
            genre: genre,
            sortBy: sortBy,
          },
        });
        setBooks(data.books);
        setPage(data.page);
        setPages(data.pages);
      } catch (err) {
        setError('Failed to fetch books. Please try again later.');
        console.error(err);
      } finally {
       
        setLoading(false);
        setInitialLoading(false);
      }
    };
    fetchBooks();
  }, [urlKeyword, urlPageNumber, genre, sortBy]);

  
  if (initialLoading) {
    return <Loader />;
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Latest Books</h1>
      
      <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Search by Title/Author</label>
            <input
              type="text"
              id="search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search as you type..."
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Filter by Genre</label>
            <select
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md bg-white dark:bg-gray-700"
            >
              <option value="">All Genres</option>
              <option value="Fiction">Fiction</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Mystery">Mystery</option>
              <option value="Non-Fiction">Non-Fiction</option>
            </select>
          </div>
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sort By</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md bg-white dark:bg-gray-700"
            >
              <option value="">Default</option>
              <option value="year">Published Year</option>
              <option value="rating">Average Rating</option>
            </select>
          </div>
        </div>
      </div>

      {error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${
              loading ? 'opacity-50 pointer-events-none' : 'opacity-100'
            }`}
          >
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
          
          {books.length === 0 && !loading && (
             <Message>No books found.</Message>
          )}

          <Pagination pages={pages} page={page} keyword={urlKeyword ? urlKeyword : ''} />
        </>
      )}
    </div>
  );
};

export default HomePage;