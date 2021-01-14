const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: String,
}, {timestamps: true});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;
