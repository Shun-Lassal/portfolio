const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure nicknames are unique
    maxlength: 50, // Set a maximum length for nicknames
  },
  oldUsernames: [
    {
      type: String,
      maxlength: 50, // Set a maximum length for old nicknames
    },
  ],
  email: {
    type: String,
    required: true,
    unique: true, // Ensure emails are unique
    maxlength: 255, // Set a maximum length for emails
    // You can add email validation here if needed
  },
  password: {
    type: String,
    required: true,
  },
  picturePath: {
    type: String,
    maxlength: 255, // Set a maximum length for picture paths
  },
  motto: {
    type: String,
    maxlength: 255, // Set a maximum length for mottos
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role', // Reference to another model, assuming you have a Role model
    },
  ],
  dateOfCreation: {
    type: Date,
    default: Date.now,
  },
  dateLastSeenOnline: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = userSchema;
