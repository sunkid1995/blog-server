/**
 * posts controller
 */
// Models
import PostsModels from '../models/PostModel';

class PostControoler {
  /**
   * Tạo mới một bài viết
   * @function asyn-await
   * @param {req} ->thông tin yêu cầu của client gửi nên server
   * @param {res} -> trả lời của server -> cho client
   * @param {next} -> callback argument to the middleware function
   * @return {void} -> trả về thông tin bài viết mới
   */

  createPost = async (req, res, next) => {
    const { title, image, content, authorId } = req.body;

    const newPost = new PostsModels({
      title, image, content, authorId,
    });

    try {
      const savePost = await newPost.save();
      res.status(200).json({
        success: true,
        post: savePost,
        message: 'Create post successfully!',
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        post: {},
        message: `Error is: ${err}`,
      });
      next(err);
    }
  }

  /**
   * cập nhật một bài viết
   * @param {req} ->thông tin yêu cầu của client gửi nên server
   * @param {res} -> trả lời của server -> cho client
   * @param {next} -> callback argument to the middleware function
   * @return {void} -> trả về thông tin bài viết mới được cập nhật
   */

  updatePost = async (req, res, next) => {
    const { post_id, ...post } = req.body;

    const options = { new: true };
    try {
      const uPost = await PostsModels.findByIdAndUpdate(post_id, { $set: post }, options);
      res.status(200).json({
        success: true,
        result: uPost,
        message: 'Update post successfully!',
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        result: {},
        message: `Error is: ${err}`,
      });
      next(err);
    }
  }
}

export default new PostControoler();
