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
   * @return {void} -> trả về thông báo like thành công & thông tin
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
      next(err);
    }
  }

  /**
   * bỏ một like
   * @function async-await
   * @param {req} ->thông tin yêu cầu của client gửi nên server
   * @param {res} -> trả lời của server -> cho client
   * @param {next} -> callback argument to the middleware function
   * @return {void} -> trả về thông báo bỏ like thành công & thông tin
   */

  unlike = async (req, res, next) => {
    const { likeId } = req.body;

    try {
      const like = await LikeModels.findByIdAndRemove({ _id: likeId });
      res.status(200).json({
        success: true,
        result: like,
        message: 'Unlike ok!',
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
export default new LikeController;

