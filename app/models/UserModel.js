import mongoose from 'mongoose';
// token
// import jsonToken from 'jsonwebtoken';

// // configs
// import config from '../configs';


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username không được để trống!'],
  },

  phone: {
    type: Number,
    required: [true, 'Phone không được để trống!'],
  },

  email: {
    type: String,
    required: [true, 'Email không được để trống!'],
    unique: true,
    lowercase: true,
    validate: {
      validator(email) {
        const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
        return emailRegex.test(email);
      },
      message: '{VALUE} không phải là một địa chỉ email hợp lệ',
    },
  },

  password: {
    type: String,
    required: [true],
    minlength: [6, 'Password phải nhiều hơn 6 kí tự!'],
  },

}, { timestamps: true });

// userSchema.path('username').validate(function(value, done) {
//   userModels.findOne({ username: value }, function(err, user) {
//     if (err) return done(false);
//     if (user) return done(false);

//     done(true);
//   });
// }, 'User name này đã tồn tại!');


// userSchema.methods = {
//   /**
//    * (JWT) Tạo một JSON web token để xác thực thông tin các request
//    * @method
//    * @return {String} trả về một token duy nhất với thời gian live được quy định tại file config
//    */
//   getToken() {
//     return jsonToken.sign({ _id: this._id }, config.security.sessionSecret, { expiresIn: config.security.sessionExpiration });
//   },
// };

const userModels = mongoose.model('Users', userSchema);
export default userModels;
