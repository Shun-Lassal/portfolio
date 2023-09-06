const mongoose = require('mongoose');

const timeTermSchema = new mongoose.Schema({
  termOrder: {
    type: Number,
    required: true
  },
  termDescription: {
    type: String,
    required: true
  }
});

const Time_Term = mongoose.model('Time_Term', timeTermSchema);

module.exports = timeTermSchema;
