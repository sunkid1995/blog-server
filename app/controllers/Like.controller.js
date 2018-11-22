/**
 * Like contronller
 */
import _ from 'lodash';

import mongoose from 'mongoose';

// Models
import LikeModels from '../models/LikeModel';
import UserModels from '../models/UserModel';


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
       const userIdLikePost = [];
       const like = await LikeModels.find({ postId });

       /**
        * lấy ra id của user like bài viết để lấy thông tin user đấy
        * format định dạng id về kiểu ObjectId
        */

       _.each(like, (item) => {
         const id = mongoose.Types.ObjectId(item.userId); // eslint-disable-line
         userIdLikePost.push(id);
       });

       if (userIdLikePost) {
         /**
          * tìm kiếm user đã like bài viết với 1 arr id
          */
         const userLikepost = await UserModels.find({ _id: { $in: userIdLikePost } }).select({
           username: 1,
           email: 1,
         });
         return res.status(200).json({
           success: true,
           user_like: userLikepost,
           total_like: like.length,
           message: 'Get like ok!',
         });
       }
     } catch (err) {
       res.status(400).json({
         success: false,
         result: [],
         message: `Error is: ${err}`,
       });
       next(err);
     }
   }
}
export default new LikeController;

