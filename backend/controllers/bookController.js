const Book = require('../models/bookModel.js');
const Review = require('../models/reviewModel.js');

// @desc    Get all books with pagination, search, filter, and sort
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        $or: [
          { title: { $regex: req.query.keyword, $options: 'i' } },
          { author: { $regex: req.query.keyword, $options: 'i' } },
        ],
      }
    : {};
  
  const genreFilter = req.query.genre ? { genre: req.query.genre } : {};
  
  const sortOrder = {};
  if (req.query.sortBy === 'year') {
    sortOrder.year = -1;
  } else if (req.query.sortBy === 'rating') {
    sortOrder.averageRating = -1;
  }

  try {
    const count = await Book.countDocuments({ ...keyword, ...genreFilter });
    const books = await Book.find({ ...keyword, ...genreFilter })
      .sort(sortOrder)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ books, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single book by ID
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a book
// @route   POST /api/books
// @access  Private
const createBook = async (req, res) => {
  const { title, author, description, genre, year } = req.body;
  try {
    const book = new Book({
      title,
      author,
      description,
      genre,
      year,
      addedBy: req.user._id,
    });
    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private
const updateBook = async (req, res) => {
  const { title, author, description, genre, year } = req.body;
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      if (book.addedBy.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }
      book.title = title || book.title;
      book.author = author || book.author;
      book.description = description || book.description;
      book.genre = genre || book.genre;
      book.year = year || book.year;

      const updatedBook = await book.save();
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      if (book.addedBy.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }
      await Review.deleteMany({ bookId: book._id });
      await book.deleteOne();
      res.json({ message: 'Book and associated reviews removed' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get books added by a specific user
// @route   GET /api/books/mybooks
// @access  Private
const getMyBooks = async (req, res) => {
    try {
        const books = await Book.find({ addedBy: req.user._id });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getMyBooks
};