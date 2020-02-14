const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: '',
  },
  postId: {       //parrent post id
    type: String,
    default: '',
  },
  commentId: {    //parrent comment id
    type: String,
    default: '',
  },
  ancestors: {
    type: [String],
    default: [],
  },
  text: {
    type: String,
    default: '',
  },
  likes: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;

