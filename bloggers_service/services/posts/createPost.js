const { userAuth } = require('../../helpers');
const { PostRepo } = require('../../repositories');

async function createPost(call, callback) {
  try {
    const { request } = call;
    const auth = await userAuth(request);
    if (!auth) {
      return callback(null, {
        success: false,
        message: 'Auth error',
      });
    }
    const { id, role } = auth;

    if (role !== 'blogger') {
      return callback(null, {
        success: false,
        message: 'You should be a blogger',
      });
    }

    const { content } = request;
    if (!content) {
      return callback(null, {
        success: false,
        message: 'Content is required',
      });
    }

    const postInputs = {
      userId: id,
      content,
    };
    const post = new PostRepo(postInputs);
    const createdPost = await post.createPost();
    if (createdPost) {
      const response = {
        success: true,
        message: 'Post has been created',
        id: createdPost._id,
      };
      return callback(null, response);
    }
    return callback(null, {
      success: false,
      message: 'Post has not been created',
    });
  } catch (error) {
    return callback(null, {
      success: false,
      message: 'Internal error',
    });
  }
}

module.exports = createPost;
