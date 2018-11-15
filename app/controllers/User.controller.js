/* auth controllers */
// token
import jsonToken from 'jsonwebtoken';

// models
import UserModel from '../models/UserModel';

// configs
import config from '../configs';

class UserController {
  /**
   * Tạo mới một user
   * @param {req} -> thông tin yêu cầu của client gửi nên server
   * @param {res} -> trả lời của server -> cho client
   * @return {void} -> trả về thông tin user & token mới được khởi tạo thành công 
  */
  createUser = (req, res) => {
    const { username, phone, email, password } = req.body;
  
    /**
     * @constant {conditions} -> điểu kiện để thêm mới 1 user ^ đầu and $, i phân biệt chữa hoa chữ thường 
     */
    const conditions = {
      username: new RegExp('^' + username.trim() + '$', 'i')
    }

    /**
     * @function {UserModel.find()} -> Tìm kiếm 1 user vừa được isert đã có trong database hay chưa
     * @return {void} ? nếu lỗi thì trả lại thông báo cho client : lưu user mới vào database
     */
    UserModel.find(conditions).limit(1).exec((err, user) => {
      if (err) {
        return res.status(400).json({
          success: false,
          result: {},
          message: `Error is: ${err}`
        });
      } else {
        if (user.length > 0) {
          return res.json({
            success: false,
            result: {},
            message: 'Sorry! user name already exists.'
          });
        } else {

          /**
           * Tạo một JSON web token để xác thực thông tin các request
           * @public
           * @return {String} trả về một token duy nhất với thời gian live được quy định tại file config thư mục config
           */
          const token = jsonToken.sign({ _id: this._id }, config.security.sessionSecret, {
            expiresIn: config.security.sessionExpiration,
          });

          const newUser = new UserModel({
            username, phone, email, password, token,
          });

          /**
           * @return {void} -> lưu data user mới vào database khi đã thoả mãn điều kiện ở bên trên
           */
          newUser.save(err => {
            if (err) {
              return res.json({
                success: false,
                result: {},
                message: `Error is: ${err}`
              });
            } else {
              return res.status(200).json({
                success: true,
                result: {
                  username, phone, email, password, token
                },
                message: 'Create user successfully!'
              });
            }
          });
        }
      }
    })
    
  }

}
export default new UserController();
