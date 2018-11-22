/**
 * Like contronller
 */

// Models
import LikeModels from '../models/LikeModel';


class LikeController {
/**
   * Tạo một like
   * @function async-await
   * @param {req} ->thông tin yêu cầu của client gửi nên server
   * @param {res} -> trả lời của server -> cho client
   * @param {next} -> callback argument to the middleware function
   * @return {void} -> trả về thông tin bài viết mới
   */

  create = async (req, res, next) => {
    const { userId, postId } = req.body;

    const newLike = new LikeModels({
      userId, postId,
    });

    try {
      const like = await newLike.save();
      res.status(200).json({
        success: true,
        result: like,
        message: 'Like ok!',
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        result: {},
        message: `Error is: ${err}`,
      });
    }
  }
}
export default new LikeController;

