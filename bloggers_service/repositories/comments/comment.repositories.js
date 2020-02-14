const Comment = require('../../models/Comment');

class CommentRepo {
  constructor(fields) {
    const {
      id,
      userId,
      postId,
      commentId,
      text,
    } = fields;

    this.id = id;
    this.userId = userId;
    this.postId = postId;
    this.commentId = commentId;
    this.text = text;
  }

  getComment() {
    const comment = Comment.findById(this.id);
    return comment;
  }

  createComment(commentedComment) {
    const { _id, ancestors } = commentedComment;

    const newComment = new Comment();
    ancestors.push(_id);

    newComment.userId = this.userId;
    newComment.postId = this.postId;
    newComment.commentId = _id;
    newComment.text = this.text;
    newComment.ancestors = ancestors;

    const comment = newComment.save();
    return comment;
  }

  createThread() {
    const newComment = new Comment();
    const ancestors = [this.postId];

    newComment.userId = this.userId;
    newComment.postId = this.postId;
    newComment.commentId = this.commentId;
    newComment.text = this.text;
    newComment.ancestors = ancestors;

    const comment = newComment.save();
    return comment;
  }

  likeComment() {
    const likedComment = Comment.findByIdAndUpdate(this.id, { $inc: { 'likes': 1 } }).exec();
    return likedComment;
  }
}

module.exports = CommentRepo;
