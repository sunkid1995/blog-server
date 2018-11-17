/* auth controllers */

// Models
import UserModels from '../models/UserModel';

class Auth {
  home = (req, res) => {
    res.send('<h1>Wellcome to web server 1</h1>');
  }

  /**
   * Login vào hệ thống
   * @param {req} -> yêu cầu client gửi nên cho server
   * @param {res} -> trả lời của server cho client
   * @param {next} -> callback argument to the middleware function
   * @return {void} -> trả về thông báo đăng nhập thành công và user & token
   */

   login = async (req, res, next) => {
     const { username, password } = req.body;

     try {
       const user = await UserModels.findOne({ username });
       if (!user || username !== user.username || password !== user.password) {
         return res.status(403).json({
           success: false,
           result: {},
           message: 'Sai thông tin đăng nhập!',
         });
       }
       const token = user.getToken();
       const optipons = { new: true };
       UserModels.findOneAndUpdate({ username }, { $set: { token } }, optipons)
           .select({
             username: 1,
             password: 1,
             token: 1,
           })
           .exec((err, user) => {
             if (err) {
               return res.status(400).json({
                 success: false,
                 result: {},
                 message: 'Login faild !',
               });
             } else {
               return res.status(200).json({
                 success: true,
                 result: { user },
                 message: 'Login successfully !',
               });
             }
           });
     } catch (err) {
       res.status(400).json({
         success: false,
         result: {},
         message: `Error is : ${err}`,
       });
       next(err);
     }
   }
}

export default new Auth();
