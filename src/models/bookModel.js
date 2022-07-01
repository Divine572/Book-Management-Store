const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      maxlength: [40, 'A book must not contain more than 40 characters'],
      minlength: [4, 'A book must not contain more than 4 characters'],
      required: [true, 'Book name is required to create a Book'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'A book should have a description'],
    },
    price: {
      type: Number,
      required: [true, 'A book  should have a selling price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (value) {
          return this.price > value;
        },
        message:
          'Discount price {VALUE} can not be greater than the normal price',
      },
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      required: [true, 'A book should have the number of stocks available'],
    },
    imageCover: {
      type: String,
      required: [true, 'A book should have a cover image'],
    },
    images: [String],
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

module.exports = mongoose.model('Book', bookSchema);
