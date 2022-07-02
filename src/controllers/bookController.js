const Book = require('../models/bookModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createBook = catchAsync(async (req, res, next) => {
  const book = await Book.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      book,
    },
  });
});

exports.getBooks = catchAsync(async (req, res, next) => {
  const queryObj = { ...req.query };
  const excludedFields = ['sort', 'fields', 'limit', 'page'];
  excludedFields.forEach(el => delete queryObj[el]);

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

  let query = Book.find(JSON.parse(queryStr));

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  if (req.query.select) {
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v');
  }

  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  const books = await query;

  res.status(200).json({
    status: 'success',
    result: books.length,
    data: {
      books,
    },
  });
});

exports.getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new AppError('No book with the given ID was found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      book,
    },
  });
});

exports.updateBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  if (!book) {
    return next(new AppError('No book with the given ID was found', 404));
  }

  res.status(201).json({
    status: 'success',
    data: {
      book,
    },
  });
});

exports.deleteBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book) {
    return next(new AppError('No book with the given ID was found', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
