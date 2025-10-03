import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import api from '../api/axiosConfig';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    const { userInfo } = useAuth();
    const [myBooks, setMyBooks] = useState([]);
    const [myReviews, setMyReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true);
                const [booksRes, reviewsRes] = await Promise.all([
                    api.get('/api/books/mybooks'),
                    api.get('/api/reviews/myreviews')
                ]);
                setMyBooks(booksRes.data);
                setMyReviews(reviewsRes.data);
            } catch (err) {
                setError('Failed to fetch profile data.');
            } finally {
                setLoading(false);
            }
        };
        fetchProfileData();
    }, []);

    if (loading) return <Loader />;
    if (error) return <Message variant="danger">{error}</Message>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">My Profile</h1>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-2">{userInfo.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">{userInfo.email}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* My Books Section */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Books I've Added</h2>
                    {myBooks.length === 0 ? (
                        <Message>You haven't added any books yet.</Message>
                    ) : (
                        <ul className="space-y-3">
                            {myBooks.map(book => (
                                <li key={book._id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm">
                                    <Link to={`/book/${book._id}`} className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                                        {book.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {/* My Reviews Section */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
                     {myReviews.length === 0 ? (
                        <Message>You haven't written any reviews yet.</Message>
                    ) : (
                        <ul className="space-y-3">
                            {myReviews.map(review => (
                                <li key={review._id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm">
                                    <p className="mb-2">
                                        <span className="font-semibold">Review for: </span>
                                        <Link to={`/book/${review.bookId._id}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                                            {review.bookId.title}
                                        </Link>
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-300">"{review.reviewText}"</p>
                                    <p className="text-sm text-yellow-500 mt-1">Rating: {review.rating}/5</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;