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
   * @function asyn-await
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

  /**
   * Hiển thị tất cả các bài viết ra -> phân trang = limit & skip
   * @function asyn-await
   * @param {req} ->thông tin yêu cầu của client gửi nên server
   * @param {res} -> trả lời của server -> cho client
   * @param {next} -> callback argument to the middleware function
   * @return {void} -> trả về tất cả bài viết
   */

  getAllPost = async (req, res, next) => {
    const { page, perPage } = req.query;

    try {
      const populateQuery = [
        { path: 'authorId',
          select: { username: 1, email: 1 },
        },
      ];

      const posts = await PostsModels.find({})
          .populate(populateQuery)
          .limit(parseInt(perPage))
          .skip((parseInt(page) - 1) * parseInt(perPage));
      res.status(200).json({
        success: true,
        data: posts,
        total: posts.length,
        message: 'Logs all posts successfully!',
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        data: [],
        message: `Error is: ${err}`,
      });
      next(err);
    }
  }

  /**
   * tìm kiếm tất cả các bài viết ra
   * @function asyn-await
   * @param {req} ->thông tin yêu cầu của client gửi nên server
   * @param {res} -> trả lời của server -> cho client
   * @param {next} -> callback argument to the middleware function
   * @return {void} -> trả về tất cả bài viết có keyword
   */

  search = async (req, res, next) => {
    const { keyword, perpage } = req.query;

    const keyWord = {
      title: new RegExp(keyword, 'i'),
    };

    try {
      const posts = await PostsModels.find(keyWord)
          .limit(parseInt(perpage))
          .select({
            title: 1,
            content: 1,
            image: 1,
          });
      res.status(200).json({
        success: true,
        result: posts,
        total: posts.length,
        message: posts.length > 0 ? 'Search ok!' : 'Không có kết quả',
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        result: [],
        message: `Error is: ${err}`,
      });
      next(err);
    }
  }

  /**
   * xoá 1 bài viết
    * @function asyn-await
   * @param {req} ->thông tin yêu cầu của client gửi nên server
   * @param {res} -> trả lời của server -> cho client
   * @param {next} -> callback argument to the middleware function
   * @return {void} -> trả về thông báo xoá thành công
   */

   delete = async (req, res, next) => {
     const { postId } = req.body;
     try {
       const post = await PostsModels.findByIdAndRemove({ _id: postId });
       res.status(200).json({
         success: true,
         result: post,
         message: `Delete post successfully ${postId}`,
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
