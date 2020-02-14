const { userAuth } = require('../../helpers');
const { CommentRepo } = require('../../repositories/');

async function likeComment(call, callback) {
  try {
    const { request } = call;
    const auth = await userAuth(request);
    if (!auth) {
      return callback(null, {
        success: false,
        message: 'Auth error',
      });
    }

    const { id } = request;
    if (!id) {
      return callback(null, {
        success: false,
        message: 'Comment id is required',
      });
    }

    const commentInputs = {
      id,
    };

    const comment = new CommentRepo(commentInputs);
    const likedComment = await comment.likeComment();

    if (likedComment) {
      const response = {
        success: true,
        message: 'Liked',
      };
      return callback(null, response);
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

module.exports = likeComment;
