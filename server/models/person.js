/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

mongoose.connect(url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.log('MongoDB connection unsuccesfull, error:', error);
  });

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String, required: true, unique: true, minlength: 3,
    },
    number: { type: String, required: true, minlength: 8 },
  },
);
personSchema.plugin(uniqueValidator);

personSchema.set('toJSON',
  {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });

module.exports = mongoose.model('Person', personSchema);
