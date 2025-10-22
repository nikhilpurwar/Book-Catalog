const express = require('express');
const router = express.Router();
const { authUser } = require('../middlewares/user.middleware');

// controllers
const {getBooks, getBook, addBook, updateBook, deleteBook} = require('../controllers/book.controller');

// Public routes (optional auth)
// Get all books (if Authorization header present, optionalAuth will set req.user)
router.get('/', require('../middlewares/user.middleware').optionalAuth, getBooks);
// Get single book
router.get('/:id', require('../middlewares/user.middleware').optionalAuth, getBook);

// Protected routes (require auth)
router.post('/', authUser, addBook);
router.put('/:id', authUser, updateBook);
router.delete('/:id', authUser, deleteBook);

module.exports = router;