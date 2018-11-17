/* auth controllers */
// models
import UserModel from '../models/UserModel';

class UserController {
  /**
   * Tạo mới một user
   * @function asyn-await
   * @param {req} ->thông tin yêu cầu của client gửi nên server
   * @param {res} -> trả lời của server -> cho client
   * @param {next} -> callback argument to the middleware function
   * @return {void} -> trả về thông tin user & token mới được khởi tạo thành công
  */

  createUser = async (req, res, next) => {
    const { username, phone, email, password } = req.body;

    const newUser = new UserModel({
      username, phone, email, password,
    });

    try {
      const saveUser = await newUser.save();
      const token = saveUser.getToken();
      res.status(200).json({
        success: true,
        result: { token, user: saveUser },
        message: 'Create user successfully!',
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
   * Cập nhật một user
   * @function asyn-await
   * @param {user_id} -> lấy ra user_id của user đó và update giá trị
   * @param {req} -> thông tin yêu cầu của client gửi nên server
   * @param {res} -> trả lời của server -> cho client
   * @param {next} -> callback argument to the middleware function
   * @return {void} -> trả về thông tin user mới được cập nhật
   */

  updateUser = async (req, res, next) => {
    const { user_id, ...user } = req.body;
    if (!user_id) {
      res.status(403).json({
        success: false,
        result: {},
        message: 'You must enter user_id!',
      });
    }

    /**
      * @param {input -> $set} -> khi update user thì nó không replay lại các document khác (các trường khác)
      * @param {input -> optipons} -> optipons có giá trị new === true có nghĩa là output của UserModel.findByIdAndUpdate
      * luôn đảm bảo là user mới nhất sau khi được update
    */
    const optipons = { new: true };
    try {
      const userUp = await UserModel.findByIdAndUpdate(user_id, { $set: user }, optipons);
      res.status(200).json({
        success: true,
        result: { user: userUp },
        message: 'Update user successfully!',
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
   * hiên thị tất cả các user đã được tạo
   * @function asyn-await
   * @param {req} -> thông tin yêu cầu của client gửi nên server
   * @param {res} -> trả lời của server -> cho client
   * @param {next} -> callback argument to the middleware function
   * @return {void} -> trả về kết quả sau tìm kiếm
   */

  user = async (req, res, next) => {
    // const { username, total } = req.body;
    const { username, total } = req.query;
    const parseTotal = parseInt(total);
    const limit = parseTotal > 0 ? parseTotal : 10;

    /**
     * điều kiện tìm kiếm RegExp('i') cả chữ hoa và chữ thường
     */
    const findUser = {
      username: new RegExp(username, 'i'),
    };

    try {
      const user = await UserModel.find(findUser).limit(limit).sort({ username: 1 }).select({
        username: 1,
        password: 1,
        phone: 1,
      });
      res.status(200).json({
        success: true,
        result: user,
        total: parseTotal,
        message: user.length > 0 ? 'Show all user successfully!' : 'Không tìm thấy kết quả!',
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        result: [],
        message: `Error is: ${err}`,
        total: 0,
      });
      next(err);
    }
  }
}
export default new UserController();
