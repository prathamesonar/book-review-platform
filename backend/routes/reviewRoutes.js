const express = require('express');
const router = express.Router();
const {
  getReviewsForBook,
  createReview,
  updateReview,
  deleteReview,
  getMyReviews,
} = require('../controllers/reviewController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.route('/').post(protect, createReview);
router.route('/myreviews').get(protect, getMyReviews);
router.route('/book/:bookId').get(getReviewsForBook);
router
  .route('/:id')
  .put(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;