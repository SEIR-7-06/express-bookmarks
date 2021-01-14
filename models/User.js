const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bookmarks: [ // Referenced Association
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bookmark'
    }
  ],
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;
