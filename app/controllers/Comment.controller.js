/**
 * Comment controller
 */
// Model
import CommentModels from '../models/CommentModel';

class CommentController {
  /**
   * Tạo một comment trong post
   * @function async-await
   * @param {req} ->thông tin yêu cầu của client gửi nên server
   * @param {res} -> trả lời của server -> cho client
   * @param {next} -> callback argument to the middleware function
   * @return {void} -> trả về thông báo comment thành công & thông tin
   */

  createComment = async (req, res, next) => {
    const { userId, postId, comment } = req.body;

    const newComment = new CommentModels({
      userId, postId, comment,
    });

    try {
      const comment = await newComment.save();
      res.status(200).json({
        success: true,
        result: comment,
        message: 'Comment ok!',
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
export default new CommentController;
