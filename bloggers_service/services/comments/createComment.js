const { userAuth } = require('../../helpers');
const { CommentRepo } = require('../../repositories');

async function createComment(call, callback) {
  try {
    const { request } = call;
    const auth = await userAuth(request);
    if (!auth) {
      return callback(null, {
        success: false,
        message: 'Auth error',
      });
    }
    const { id } = auth;
    const { commentId, text } = request;

    if (!commentId || !text) {
      return callback(null, {
        success: false,
        message: 'Comment id and text are required',
      });
    }

    const commentInputs = {
      userId: id,
      text,
      id: commentId,
    };

    const comment = new CommentRepo(commentInputs);
    const commentedComment = await comment.getComment();

    if (!commentedComment) {
      return callback(null, {
        success: false,
        message: 'Comment does not exist',
      });
    }

    const createdComment = await comment.createComment(commentedComment);
    if (createdComment) {
      return callback(null, {
        success: true,
        message: 'Commented',
        commentId: createdComment._id,
      });
    }

    return callback(null, {
      success: false,
      message: 'Internal error',
    });
  } catch (error) {
    return callback(null, {
      success: false,
      message: 'Internal error',
    });
  }
}

module.exports = createComment;
