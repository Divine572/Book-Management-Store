const express = require('express');

const bookController = require('../controllers/bookController');

const router = express.Router();

/**
 * @swagger
 * components:
 *      schemas:
 *          Book:
 *              type: object
 *              required:
 *                  - name
 *                  - description
 *                  - price
 *                  - quantity
 *                  - imageCover
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The unique identifier of each book
 *                  name:
 *                      type: string
 *                      description: The book name
 *                  description:
 *                      type: string
 *                      description: The book description
 *                  price:
 *                      type: number
 *                      description: The book price
 *                  quantity:
 *                      type: number
 *                      description: The book quantity
 *                  imageCover:
 *                      type: string
 *                      description: The book background image
 *               example:
 *                      id: ghhhxjhxhsdiius787288
 *                      name: Money making strategies
 *                      descripton: This book explains various money making strategies
 *                      price: 35
 *                      quantity: 20
 *                      imageCover: money-strategies.png
 *
 *
 **/

/**
 * @swagger
 * tags:
 *      name: Books
 *      description: The Books management API
 **/

/**
 * @swagger
 * /api/v1/books:
 *      get:
 *          summary: Returns the list of all the books
 *          tags: [Books]
 *          responses:
 *              200:
 *                  description: The list of books
 *                  content:
 *                      application/json
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Book'
 *
 *
 *
 *
 **/

router.route('/').get(bookController.getBooks).post(bookController.createBook);

module.exports = router;
