/**
 * Like contronller
 */
import _ from 'lodash';

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
    const { userId, postId, totalLike } = req.body;

    const newLike = new LikeModels({
      userId, postId, totalLike,
    });

    try {
      const findLike = await LikeModels.findOne({ postId });

      if (findLike !== null) {
        const optipons = { new: true };

        const updateLike = await LikeModels.findOneAndUpdate({ postId }, { $set: { totalLike }, $push: { userId } }, optipons);

        return res.status(200).json({
          success: true,
          data: updateLike,
          error: [],
        });
      } else {
        const like = await newLike.save();
        return res.status(200).json({
          success: true,
          data: like,
          error: [],
        });
      }
    } catch (err) {
      res.status(400).json({
        success: false,
        data: {},
        error: [
          { message: `Error is: ${err}` },
        ],
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
    const { userId, postId, totalLike } = req.body;

    /**
     * tìm like theo likeId: _id
     */

    try {
      const likes = await LikeModels.findOne({ postId });

      /**
       * điều kiện để unlike là: userid và postId ở trong likes phải bằng userid và postId của client req nên
       * mới cho xoá
       */

      if (postId == likes.postId) {
        const optipons = { new: true };

        const like = await LikeModels.findOneAndUpdate({ postId }, { $set: { totalLike }, $pull: { userId } }, optipons );
        return res.status(200).json({
          success: true,
          data: like,
          error: [],
        });
      } else {
        return res.status(401).json({
          success: false,
          data: {},
          error: [
            { message: 'Unlike fail!' },
          ],
        });
      }
    } catch (err) {
      res.status(400).json({
        success: false,
        data: {},
        error: [
          { message: `Error is: ${err}` },
        ],
      });
      next(err);
    }
  }

  /**
   * Hiển thị số lượt like
   * @function async-await
   * @param {req} ->thông tin yêu cầu của client gửi nên server
   * @param {res} -> trả lời của server -> cho client
   * @param {next} -> callback argument to the middleware function
   * @return {void} -> trả về thông tin số lượt like
   */

   getLike = async (req, res, next) => {
     const { postId } = req.query;

     try {
       /**
       * điều kiện để tìm kiếm
       * path: 'userId': tìm kiếm user like bài viết qua document userId trong LikeModels
       * select: chỉ lấy ra những thứ mình muốn username, email
       */

       const populateQuery = [
         { path: 'userId',
           select: { username: 1, email: 1 },
         },
       ];

       /**
       * populate: dược mongoose cung cấp để ta truy vấn data ở các collection khác
       * ở đây t truy vấn và lấy ra thông tin của 'user bằng điều kiện populateQuery
       * ở trên -  path: 'userId'
       * lấy ra ngưởi dùng đã like bài viết
       */

       const like = await LikeModels.find({ postId }).populate(populateQuery);
       res.status(200).json({
         success: true,
         data: like,
         like: like.length,
         message: 'Get like succesfully!',
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
   * Hiển thị tất cả lượt like
   * @function async-await
   * @param {req} ->thông tin yêu cầu của client gửi nên server
   * @param {res} -> trả lời của server -> cho client
   * @param {next} -> callback argument to the middleware function
   * @return {void} -> trả về thông tin số lượt like
   */

   getAllLike = async (req, res, next) => {
     const { page, perPage } = req.query;

     try {
       /**
       * populate: dược mongoose cung cấp để ta truy vấn data ở các collection khác
       * ở đây t truy vấn và lấy ra thông tin của 'user bằng điều kiện populateQuery
       * ở trên -  path: 'userId'
       * lấy ra ngưởi dùng đã like bài viết
       */

       const populateQuery = [
         { path: 'postId',
           select: { title: 1 },
         },
         { path: 'userId',
           select: { username: 1 },
         },
       ];

       const likes = await LikeModels.find({})
           .populate(populateQuery)
           .limit(parseInt(perPage))
           .skip((parseInt(page) - 1) * parseInt(page));
       res.status(200).json({
         success: true,
         data: likes,
         message: 'Get like succesfully!',
       });
     } catch (err) {
       res.status(400).json({
         success: false,
         data: [],
         message: `Error is: ${err}`,
       });
     }
   }
}
export default new LikeController;

