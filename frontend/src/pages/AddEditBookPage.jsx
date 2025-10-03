import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axiosConfig';
import Loader from '../components/Loader';
import Message from '../components/Message';

const AddEditBookPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { id } = useParams(); 

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        setLoading(true);
        try {
          const { data } = await api.get(`/api/books/${id}`);
          setTitle(data.title);
          setAuthor(data.author);
          setDescription(data.description);
          setGenre(data.genre);
          setYear(data.year);
        } catch (err) {
          setError('Failed to fetch book details.');
        } finally {
          setLoading(false);
        }
      };
      fetchBook();
    }
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const bookData = { title, author, description, genre, year: Number(year) };

    try {
      if (id) {
        // Update existing book
        await api.put(`/api/books/${id}`, bookData);
        navigate(`/book/${id}`);
      } else {
        // Create new book
        const { data } = await api.post('/api/books', bookData);
        navigate(`/book/${data._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${id ? 'update' : 'add'} book.`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) return <Loader />;

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          {id ? 'Edit Book' : 'Add a New Book'}
        </h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Author</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" rows="5" required></textarea>
          </div>
          <div>
            <label className="block mb-1 font-medium">Genre</label>
            <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Published Year</label>
            <input type="number" value={year} onChange={(e) => setYear(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />
          </div>
          <button type="submit" disabled={loading} className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-blue-400">
            {id ? 'Update Book' : 'Add Book'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditBookPage;