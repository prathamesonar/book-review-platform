const express = require('express');
const router = express.Router();
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getMyBooks,
} = require('../controllers/bookController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.route('/').get(getBooks).post(protect, createBook);
router.route('/mybooks').get(protect, getMyBooks);
router
  .route('/:id')
  .get(getBookById)
  .put(protect, updateBook)
  .delete(protect, deleteBook);

module.exports = router;