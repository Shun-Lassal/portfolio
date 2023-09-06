const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: true
  },
  taskDescription: {
    type: String,
    required: true
  },
  taskDone: {
    type: Boolean,
    required: true
  },
  termId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Time_Term', // This establishes the reference to the 'Time_Term' model
    required: true
  }
});

const TodoModel = mongoose.model('Todo', todoSchema);

module.exports = todoSchema;
