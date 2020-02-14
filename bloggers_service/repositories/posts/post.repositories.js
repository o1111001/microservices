const Post = require('../../models/Post');

class PostRepo {
  constructor(fields) {
    const {
      postId,
      userId,
      content,
      userName,
    } = fields;

    this.userId = userId;
    this.postId = postId;
    this.content = content;
    this.userName = userName;
  }

  createPost() {
    const newPost = new Post();
    newPost.userId = this.userId;
    newPost.content = this.content;
    const post = newPost.save();
    return post;
  }

  getPost() {
    const post = Post.findById(this.postId);
    return post;
  }

  getPostById(id) {
    const post = Post.findById(id);
    return post;
  }

  likePost() {
    const likedPost = Post.findByIdAndUpdate(this.postId, { $inc: { 'likes': 1 } }).exec();
    return likedPost;
  }

  getLatestPosts() {
    const { userId } = this;
    const posts = Post.aggregate([
      {
        $match: {
          userId,
        },
      },
      {
        $sort: {
          timestamp: -1,
        },
      },
      {
        $limit: 5,
      },
      {
        $addFields: {
          postId: {
            $toString: '$_id',
          },
        },
      },
      {
        $lookup: {
          from: 'comments',
          let: { 'postId': '$postId' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: [ '$postId', '$$postId' ] },
              } },
            {
              $sort: {
                timestamp: -1,
              },
            },
            {
              $limit: 3,
            },
          ],
          as: 'comments',
        } },
    ]).exec();
    return posts;
  }

  getFullPost() {
    const { postId } = this;
    const post = Post.aggregate([
      {
        $addFields: {
          postId: {
            $toString: '$_id',
          },
        },
      },
      {
        $match: {
          postId,
        },
      },
      {
        $lookup: {
          from: 'comments',
          localField: 'postId',
          foreignField: 'ancestors.0',
          as: 'comments',
        },
      },
    ]).exec();

    return post;
  }

}



module.exports = PostRepo;
