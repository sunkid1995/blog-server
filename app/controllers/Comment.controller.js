/**
 * Comment controller
 */
import _ from 'lodash';

import mongoose from 'mongoose';

// Model
import CommentModels from '../models/CommentModel';
import UserModels from '../models/UserModel';

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

  /**
   * Cập nhật một comment trong post
   * @function async-await
   * @param {req} ->thông tin yêu cầu của client gửi nên server
   * @param {res} -> trả lời của server -> cho client
   * @param {next} -> callback argument to the middleware function
   * @return {void} -> trả về thông báo update comment thành công & thông tin
   */

  updateComment = async (req, res, next) => {
    const { userId, postId, commentId, comment } = req.body;

    try {
      /**
       * tìm comment theo commentId: _id
       */
      const comments = await CommentModels.findById({ _id: commentId });

      /**
       * điều kiện để update userid và postId ở trong comment phải bằng userid và postId của client req nên
       * mới cho update
       * options -> điều kiện lấy ra dữ liệu luôn mới sau udpate
       */
      const options = { new: true };
      if (userId == comments.userId && postId == comments.postId && commentId == comments._id) {
        const newComment = await CommentModels.findByIdAndUpdate(commentId, { $set: { comment } }, options);
        return res.status(200).json({
          success: true,
          result: newComment,
          message: 'Update comment ok!',
        });
      } else {
        return res.status(200).json({
          success: false,
          result: {},
          message: 'Bạn không có quyền cập nhật comment này!',
        });
      }
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
   * Xoá một comment
   * @function async-await
   * @param {req} ->thông tin yêu cầu của client gửi nên server
   * @param {res} -> trả lời của server -> cho client
   * @param {next} -> callback argument to the middleware function
   * @return {void} -> trả về thông báo xoá comment thành công & thông tin
   */

   deleteComment = async (req, res, next) => {
     const { userId, postId, commentId } = req.body;
     try {
       /**
      * Tìm comment theo commentId: _.id
      */
       const commnets = await CommentModels.findById({ _id: commentId });

       /**
       * điều kiện để xoá là: userid và postId ở trong comment phải bằng userid và postId của client req nên
       * mới cho xoá
       */
       if (userId == commnets.userId && postId == commnets.postId && commentId == commnets._id) {
         const newComment = await CommentModels.findByIdAndRemove({ _id: commentId });
         return res.status(200).json({
           success: true,
           result: newComment,
           message: `Remove comment: ${commnets._id} ok!`,
         });
       } else {
         return res.status(401).json({
           success: false,
           result: {},
           message: 'Bạn không có quyền xoá comment này!',
         });
       }
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
    * Hiển thị comment trong post
    * @param {req} ->thông tin yêu cầu của client gửi nên server
    * @param {res} -> trả lời của server -> cho client
    * @param {next} -> callback argument to the middleware function
    * @return {void} -> trả về các comment trong 1 bài viết
    */

    showComment = async (req, res, next) => {
      const { postId, perPage } = req.query;

      try {
        const userIdCommentPost = [];
        const comment = await CommentModels.find({ postId }).limit(parseInt(perPage));

        /**
         * Lấy ra id của user comment trong bài viết để lấy thông tin user đấy
         * format định dạng id về kiểu ObjectId
         */

        _.each(comment, (item) => {
          const id = mongoose.Types.ObjectId(item.userId); // eslint-disable-line
          userIdCommentPost.push(id);
        });

        if (userIdCommentPost) {
          /**
          * tìm kiếm user đã comment bài viết với 1 arr id
          */
          const userCommentPost = await UserModels.find({ _id: { $in: userIdCommentPost } }).select({
            username: 1,
            email: 1,
          });

          return res.status(200).json({
            success: true,
            result: comment,
            user: userCommentPost,
            message: 'Get comment ok!',
          });
        }
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
