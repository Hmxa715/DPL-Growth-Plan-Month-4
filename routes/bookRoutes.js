const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const bookController = require("../controllers/bookController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - isbn
 *       properties:
 *         title:
 *           type: string
 *         author:
 *           type: string
 *         publicationYear:
 *           type: integer
 *         isbn:
 *           type: string
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: List of all books
 */

/**
 * @swagger
 * /api/books/{isbn}:
 *   get:
 *     summary: Get book by ISBN
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ISBN
 *     responses:
 *       200:
 *         description: Book data
 *       404:
 *         description: Book not found
 */

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Add a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book added
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/books/{isbn}:
 *   put:
 *     summary: Partially update a book by ISBN
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ISBN to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publicationYear:
 *                 type: integer
 *             example:
 *               title: "Updated Title"
 *               author: "Updated Author"
 *     responses:
 *       200:
 *         description: Book updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Book not found
 */

/**
 * @swagger
 * /api/books/{isbn}:
 *   delete:
 *     summary: Delete a book by ISBN
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted
 *       404:
 *         description: Book not found
 */

//validators
const bookValidation = [
  body("title").optional().isString().withMessage("Title is required"),
  body("author").notEmpty().withMessage("Author is required"),
  body("publicationYear")
    .isInt({ min: 1850 })
    .withMessage("Publication year must be a valid year"),
  body("isbn").notEmpty().withMessage("ISBN is required")
];
const partialValidation = [
  body('title').optional().isString(),
  body('author').optional().isString(),
  body('publicationYear')
    .optional()
    .isInt({ min: 1850 })
    .withMessage("Publication year must be a valid year")
];
// validation handler
function validateRequest(req, res, next) {
  const errors = require("express-validator").validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

// Routes
router.get("/", bookController.getAllBooks);
router.get("/:isbn", bookController.getBookByISBN);
router.post("/", bookValidation, validateRequest, bookController.addBook);
router.put(
  "/:isbn",
  partialValidation,
  validateRequest,
  bookController.updateBookByISBN
);
router.delete("/:isbn", bookController.deleteBookByISBN);

module.exports = router;
// This code defines the routes for managing books in an Express application, including validation for book data.
