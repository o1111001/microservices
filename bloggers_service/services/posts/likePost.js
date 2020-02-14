const { userAuth } = require('../../helpers');
const { PostRepo } = require('../../repositories');

async function likePost(call, callback) {
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
        message: 'Post id is required',
      });
    }

    const postInputs = {
      postId: id,
    };

    const post = new PostRepo(postInputs);
    const likedPost = await post.likePost();

    if (likedPost) {
      const response = {
        success: true,
        postId: likedPost._id,
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

module.exports = likePost;
