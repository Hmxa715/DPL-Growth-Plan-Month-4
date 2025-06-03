const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const DB_FILE = process.env.DB_FILE || path.join(__dirname, 'books.db');

const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) {
    console.error('Failed to connect to database:', err.message);
  } else {
    console.log(`Connected to SQLite database at ${DB_FILE}`);
  }
});

// Initialize books table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    publicationYear INTEGER NOT NULL,
    isbn TEXT NOT NULL UNIQUE
  )`);
});

// Helper to get all books (returns Promise)
function getAllBooks() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM books', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// Helper to get one book by ISBN (returns Promise)
function getBookByIsbn(isbn) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM books WHERE isbn = ?', [isbn], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

module.exports = {
  db,
  getAllBooks,
  getBookByIsbn,
};
