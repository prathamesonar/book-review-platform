import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axiosConfig';
import Message from '../components/Message';
import Rating from '../components/Rating';
import useAuth from '../hooks/useAuth';
import RatingChart from '../components/RatingChart';
import Loader from '../components/Loader';


const EditReviewModal = ({ review, onClose, onSave }) => {
  const [rating, setRating] = useState(review.rating);
  const [reviewText, setReviewText] = useState(review.reviewText);

  const handleSave = (e) => {
    e.preventDefault();
    onSave(review._id, { rating, reviewText });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Your Review</h2>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Rating</label>
            <select value={rating} onChange={e => setRating(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Comment</label>
            <textarea rows="5" value={reviewText} onChange={e => setReviewText(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};


const BookDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useAuth();
  
  const [book, setBook] = useState(location.state?.book || null);
  const [reviews, setReviews] = useState([]);
  
  const [pageLoading, setPageLoading] = useState(!location.state?.book);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      setReviewsLoading(true);
      const { data } = await api.get(`/api/reviews/book/${id}`);
      setReviews(data);
    } catch (err) {
      console.error("Failed to fetch reviews");
    } finally {
      setReviewsLoading(false);
    }
  };
  
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const { data } = await api.get(`/api/books/${id}`);
        setBook(data);
      } catch (err) {
        setError('Book not found or server error.');
      } finally {
        setPageLoading(false);
      }
    };

    if (!book) {
      setPageLoading(true);
      fetchBookData();
    }
    fetchReviews();
  }, [id]);

  const reviewSubmitHandler = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setReviewError('Please select a rating.');
      return;
    }
    setReviewLoading(true);
    try {
      await api.post(`/api/reviews`, { bookId: id, rating, reviewText });
      setRating(0);
      setReviewText('');
      setReviewError('');
      setIsReviewFormVisible(false); 
      fetchReviews();
    } catch (err) {
      setReviewError(err.response?.data?.message || 'Failed to submit review.');
    } finally {
      setReviewLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete your review?')) {
      try {
        await api.delete(`/api/reviews/${reviewId}`);
        fetchReviews();
      } catch (err) {
        alert('Failed to delete the review.');
      }
    }
  };

  const handleOpenEditModal = (review) => {
    setEditingReview(review);
    setIsModalOpen(true);
  };
  
  const handleUpdateReview = async (reviewId, updatedData) => {
    try {
      await api.put(`/api/reviews/${reviewId}`, updatedData);
      setIsModalOpen(false);
      setEditingReview(null);
      fetchReviews();
    } catch (err) {
      alert('Failed to update the review.');
    }
  };

  const deleteBookHandler = async () => {
      if(window.confirm('Are you sure you want to delete this book?')) {
          try {
              await api.delete(`/api/books/${id}`);
              navigate('/');
          } catch(err) {
              setError('Failed to delete book.');
          }
      }
  }

  if (pageLoading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;
  if (!book) return <Message>Book not found.</Message>;
  
  const userHasReviewed = userInfo && reviews.some(review => review.userId._id === userInfo._id);

  return (
    <div className="max-w-4xl mx-auto">
        {isModalOpen && (
          <EditReviewModal
            review={editingReview}
            onClose={() => setIsModalOpen(false)}
            onSave={handleUpdateReview}
          />
        )}
        <Link to="/" className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded mb-6 hover:bg-gray-300 dark:hover:bg-gray-600">Go Back</Link>
        <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">{book.title}</h1>
                  <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-4">by {book.author} ({book.year})</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 inline-block px-3 py-1 rounded-full mb-4">{book.genre}</p>
              </div>
              {userInfo && userInfo._id === book.addedBy && (
                  <div className="flex space-x-2 mt-4 md:mt-0">
                      <Link to={`/editbook/${book._id}`} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</Link>
                      <button onClick={deleteBookHandler} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                  </div>
              )}
            </div>
            <div className="my-4"><Rating value={book.averageRating} text={`${reviews.length} reviews`} /></div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">{book.description}</p>
            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                {reviewsLoading ? <div className="text-center py-4">Loading reviews...</div> : reviews.length === 0 ? <Message>No reviews yet.</Message> : (
                  <div className="space-y-4 mb-8">
                    {reviews.map(review => (
                      <div key={review._id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <strong className="text-gray-900 dark:text-white">{review.userId.name}</strong>
                            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">{new Date(review.createdAt).toLocaleDateString()}</span>
                            <Rating value={review.rating} />
                          </div>
                          {userInfo && userInfo._id === review.userId._id && (
                            <div className="flex space-x-2">
                                <button onClick={() => handleOpenEditModal(review)} className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm font-semibold hover:bg-yellow-600 transition-colors">Edit</button>
                                <button onClick={() => handleDeleteReview(review._id)} className="px-3 py-1 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700 transition-colors">Delete</button>
                            </div>
                          )}
                        </div>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">{review.reviewText}</p>
                      </div>
                    ))}
                  </div>
                )}
                
               
                {userInfo && !userHasReviewed && (
                  <div className="mt-8">
                    {!isReviewFormVisible ? (
                      <button 
                        onClick={() => setIsReviewFormVisible(true)}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Write a Review
                      </button>
                    ) : (
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Write a Review</h3>
                        {reviewError && <Message variant="danger">{reviewError}</Message>}
                        <form onSubmit={reviewSubmitHandler}>
                            <div className="mb-4">
                                <label className="block mb-2 font-medium">Rating</label>
                                <select value={rating} onChange={e => setRating(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                                    <option value="0">Select...</option>
                                    <option value="1">1 - Poor</option>
                                    <option value="2">2 - Fair</option>
                                    <option value="3">3 - Good</option>
                                    <option value="4">4 - Very Good</option>
                                    <option value="5">5 - Excellent</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 font-medium">Comment</label>
                                <textarea rows="4" value={reviewText} onChange={e => setReviewText(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"></textarea>
                            </div>
                            <div className="flex items-center space-x-4">
                              <button type="submit" disabled={reviewLoading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400">
                                  {reviewLoading ? 'Submitting...' : 'Submit Review'}
                              </button>
                              <button type="button" onClick={() => setIsReviewFormVisible(false)} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400">
                                Cancel
                              </button>
                            </div>
                        </form>
                      </div>
                    )}
                  </div>
                )}
                {userInfo && userHasReviewed && !reviewsLoading && <Message>You have already reviewed this book.</Message>}
                {!userInfo && !reviewsLoading && <Message>Please <Link to="/login" className="underline">sign in</Link> to write a review.</Message>}
            </div>
             {reviews.length > 0 && !reviewsLoading && <RatingChart reviews={reviews} />}
        </div>
    </div>
  );
};

export default BookDetailsPage;