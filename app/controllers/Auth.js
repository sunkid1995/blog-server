/* auth controllers */
import _ from 'lodash';

// Models
import UserModels from '../models/UserModel';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// configs
import config from '../configs';

class Auth {
  home = async (req, res) => {
    const { authData } = req;
    try {
      const user = await UserModels.findById({ _id: authData._id });
      return res.status(203).json({
        success: true,
        data: user,
        error: [],
      });
    } catch (err) {
      return res.status(401).json({
        success: true,
        data: {},
        error: [
          { message: `${err}` },
        ],
      });
    }
  }

  /**
   * đăng kí
   * @param {req} -> yêu cầu client gửi nên cho server
   * @param {res} -> trả lời của server cho client
   * @param {next} -> callback argument to the middleware function
   * @return {void} -> trả về thông báo đăng nhập thành công và user & token
   */

   signup = (req, res, next) => {
     const { username, phone, email, password } = req.body;
     UserModels.find({ username })
         .exec()
         .then((user) => {
           if (user.length >= 1) {
             return res.status(403).json({
               success: false,
               data: {},
               error: [
                 { message: 'Username đã tồn tại!' },
               ],
             });
           } else {
             bcrypt.hash(password, 10, (err, hashPassword) => {
               if (err) {
                 return res.status(500).json({
                   success: false,
                   data: {},
                   error: [
                     { message: `${err}` },
                   ],
                 });
               } else {
                 const user = new UserModels({
                   username, phone, email, password: hashPassword,
                 });
                 user
                     .save().then((result) => {
                       return res.status(203).json({
                         success: true,
                         data: result,
                         error: [],
                       });
                     }).catch((err) => {
                       return res.status(404).json({
                         success: false,
                         data: {},
                         error: [
                           { message: `${err}` },
                         ],
                       });
                     });
               }
             });
           }
         }).catch((err) => {
           res.status(401).json({
             success: false,
             data: {},
             error: [
               { message: `${err}` },
             ],
           });
         });
   }

   /**
   * đăng nhập
   * @param {req} -> yêu cầu client gửi nên cho server
   * @param {res} -> trả lời của server cho client
   * @param {next} -> callback argument to the middleware function
   * @return {void} -> trả về thông báo đăng nhập thành công và user & token
   */

   signin = async (req, res, next) => {
     const { username, password } = req.body;

     try {
       const user = await UserModels.findOne({ username });
       if (_.isEmpty(user)) {
         return res.status(401).json({
           success: false,
           data: {},
           error: [
             { message: `Username ${username} không tồn tại tồn tại!` },
           ],
         });
       }

       const checkedPassWord = await bcrypt.compare(password, user.password);

       if (checkedPassWord) {
         const isUser = {
           username: user.username,
           _id: user._id,
         };

         const token = jwt.sign(isUser, config.security.sessionSecret, { expiresIn: '1h' });

         const newUser = await UserModels.findOneAndUpdate({ _id: user._id }, { $set: { 'token': token } });

         return res.status(200).json({
           success: true,
           data: newUser,
           error: [],
         });
       }

       return res.status(422).json({
         success: false,
         data: {},
         error: [
           { message: 'Tài khoản hoặc mật khẩu không chính xác!' },
         ],
       });
     } catch (err) {
       return res.status(401).json({
         success: false,
         data: {},
         error: [
           { message: `${err}` },
         ],
       });
     }
   }
}

export default new Auth();
