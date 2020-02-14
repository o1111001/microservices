const { userAuth } = require('../../helpers');
const { PostRepo } = require('../../repositories');

async function getFullPost(call, callback) {
  try {
    const { request } = call;
    const auth = await userAuth(request);
    if (!auth) {
      return callback(null, {
        success: false,
        message: 'Auth error',
      });
    }

    const { postId } = request;
    if (!postId) {
      return callback(null, {
        success: false,
        message: 'Post id is required',
      });
    }

    const postInputs = {
      postId,
    };

    const post = new PostRepo(postInputs);
    const receivedPost = await post.getFullPost();

    if (receivedPost) {
      return callback(null, {
        success: true,
        post: receivedPost[0],
      });
    }
    return callback(null, {
      success: false,
      message: 'Post does not exist',
    });
  } catch (error) {
    return callback(null, {
      success: false,
      message: 'Internal error',
    });
  }
}

module.exports = getFullPost;
