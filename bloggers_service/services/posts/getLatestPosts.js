const { userAuth, getUserIdByUsername } = require('../../helpers');
const { PostRepo } = require('../../repositories');

async function getPost(call, callback) {
  try {
    const { request } = call;
    const auth = await userAuth(request);
    if (!auth) {
      return callback(null, {
        success: false,
        message: 'Auth error',
      });
    }

    const userId = await getUserIdByUsername(request);
    if (!userId) {
      return callback(null, {
        success: false,
        message: 'User is not defined',
      });
    }

    const postInputs = {
      userId,
    };

    const post = new PostRepo(postInputs);
    const posts = await post.getLatestPosts();

    if (posts) {
      return callback(null, {
        success: true,
        posts,
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

module.exports = getPost;
