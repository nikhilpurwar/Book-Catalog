const Book = require('../models/books.model');

//get all books
const getBooks = async(req, res) => {
    // If the request is authenticated, return books for that user only.
    // If not authenticated, return all books (public view).
    const user_id = req.user ? req.user._id : null;
    try{
        const query = user_id ? { user_id } : {};
        const bookData = await Book.find(query).sort({createdAt:-1});
        res.status(200).json(bookData);
    }catch(err){
        console.error('Error fetching books:', err);
        res.status(400).json({error:err.message})
    }
}

//get single book by id
const getBook = async(req, res) => {
    try{
        const id = req.params.id;
        const bookData = await Book.findById({_id: id});
        res.status(200).json(bookData);
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

//Add Book
const addBook = async(req, res) => {
    const {title, author, genre, price, inStock} = req.body;
    // Ensure user is authenticated before adding a book
    if (!req.user) {
        return res.status(401).json({ error: 'You must be logged in' });
    }
    if(!title || !author || !genre || !price || !inStock){
        return res.status(400).json({error: "All fields are required"});
    }
    try{
        const user_id = req.user._id;
        const newBook = new Book({...req.body, user_id});
        const addBook = await newBook.save();
        res.status(201).json(addBook);
    }catch(err){
        res.status(400).json({error:err.message});
    }
}

//update book
const updateBook = async(req, res) => {
    try{
        const id = req.params.id;
        const bookData = await Book.findByIdAndUpdate({_id: id}, req.body, {new: true});
        res.status(200).json(bookData);
    }catch(err){
        res.status(400).json({error:err.message});
    }
}

//delete single book by id
const deleteBook = async(req, res) => {
    try{
        const id = req.params.id;
        const removeBook = await Book.findByIdAndDelete({_id: id});
        res.status(200).json(removeBook);
    }catch(err){
        res.status(400).json({error:err.message});
    }
}

module.exports = {
    getBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook,
}