const { userAuth } = require('../../helpers');
const { PostRepo, CommentRepo } = require('../../repositories');

async function createThread(call, callback) {
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

    const { postId, text } = request;
    if (!postId || !text) {
      return callback(null, {
        success: false,
        message: 'Post id and text are required',
      });
    }
    const post = new PostRepo({ postId });
    const commentedPost = await post.getPost();

    if (!commentedPost) {
      return callback(null, {
        success: false,
        message: 'Post does not exist',
      });
    }
    if (commentedPost.userId === id) {
      return callback(null, {
        success: false,
        message: 'You cannot comment on yourself',
      });
    }

    const threadInputs = {
      userId: id,
      text,
      postId,
    };

    const thread = new CommentRepo(threadInputs);
    const createdThread = await thread.createThread();
    if (createThread) {
      return callback(null, {
        success: true,
        message: 'Commented',
        commentId: createdThread._id,
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

module.exports = createThread;
