
const Review = require('../models/reviewModel.js');
const Book = require('../models/bookModel.js');

// Function to update the average rating of a book
async function updateAverageRating(bookId) {
  const reviews = await Review.find({ bookId });
  if (reviews.length === 0) {
    await Book.findByIdAndUpdate(bookId, { averageRating: 0 });
    return;
  }
  const totalRating = reviews.reduce((acc, item) => item.rating + acc, 0);
  const average = totalRating / reviews.length;
  await Book.findByIdAndUpdate(bookId, { averageRating: average });
}

// @desc    Get all reviews for a book
// @route   GET /api/reviews/book/:bookId
// @access  Public
const getReviewsForBook = async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId }).populate(
      'userId',
      'name'
    );
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new review
// @route   POST /api/reviews/
// @access  Private
const createReview = async (req, res) => {
  const { bookId, rating, reviewText } = req.body;

  try {
   
    const alreadyReviewed = await Review.findOne({
      bookId,
      userId: req.user._id,
    });
    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Book already reviewed' });
    }

    const review = new Review({
      bookId,
      userId: req.user._id,
      rating,
      reviewText,
    });
    const createdReview = await review.save();
    await updateAverageRating(bookId); 
    res.status(201).json(createdReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = async (req, res) => {
  const { rating, reviewText } = req.body;
  try {
    const review = await Review.findById(req.params.id);
    if (review) {
      if (review.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }
      review.rating = rating || review.rating;
      review.reviewText = reviewText || review.reviewText;

      const updatedReview = await review.save();
      await updateAverageRating(review.bookId); 
      res.json(updatedReview);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review) {
      if (review.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }
      const bookId = review.bookId;
      await review.deleteOne();
      await updateAverageRating(bookId); 
      res.json({ message: 'Review removed' });
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get reviews by a specific user
// @route   GET /api/reviews/myreviews
// @access  Private
const getMyReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ userId: req.user._id }).populate('bookId', 'title');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
  getReviewsForBook,
  createReview,
  updateReview,
  deleteReview,
  getMyReviews,
};