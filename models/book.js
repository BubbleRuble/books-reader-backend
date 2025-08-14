const { required } = require('joi');
const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');

const bookGenres = ['fantasy', 'triller', 'drama', 'detective', 'horror', 'romance'];
const dataRegexp = /^\d{2}-\d{2}-\d{4}$/;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    genre: {
      type: String,
      enum: bookGenres,
      required: true,
    },
    date: {
      type: String,
      match: dataRegexp,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

bookSchema.post('save', handleMongooseError);

const Book = model('book', bookSchema);

const Joi = require('joi');

const addSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  favorite: Joi.boolean(),
  genre: Joi.string().valid(...bookGenres).required(),
  date: Joi.string().pattern(dataRegexp).required(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
})

const schemas = {
  addSchema,
  favoriteSchema,
}

module.exports = { 
  Book, 
  schemas,
};
