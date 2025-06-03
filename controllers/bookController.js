const { db, getAllBooks, getBookByIsbn } = require('../models/db');

// GET all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET a book by ISBN
exports.getBookByISBN = async (req, res) => {
  try {
    const { isbn } = req.params;
    const book = await getBookByIsbn(isbn);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST add new book
exports.addBook = (req, res) => {
  const { title, author, publicationYear, isbn } = req.body;
  const sql = 'INSERT INTO books (title, author, publicationYear, isbn) VALUES (?, ?, ?, ?)';

  db.run(sql, [title, author, publicationYear, isbn], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, title, author, publicationYear, isbn });
  });
};

// PUT update a book by ISBN
exports.updateBookByISBN = (req, res) => {
  const { isbn } = req.params;
  const { title, author, publicationYear } = req.body;

  const fields = [];
  const values = [];

  if (title !== undefined) {
    fields.push('title = ?');
    values.push(title);
  }
  if (author !== undefined) {
    fields.push('author = ?');
    values.push(author);
  }
  if (publicationYear !== undefined) {
    fields.push('publicationYear = ?');
    values.push(publicationYear);
  }

  if (fields.length === 0) {
    return res.status(400).json({ error: 'No valid fields to update' });
  }

  const sql = `UPDATE books SET ${fields.join(', ')} WHERE isbn = ?`;
  values.push(isbn);

  db.run(sql, values, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Book not found' });

    res.json({ message: 'Book updated successfully' });
  });
};

// DELETE a book by ISBN
exports.deleteBookByISBN = (req, res) => {
  const { isbn } = req.params;
  const sql = 'DELETE FROM books WHERE isbn = ?';

  db.run(sql, [isbn], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  });
};
