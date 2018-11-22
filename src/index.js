// Set biến môi trường
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Chuyển đổi code ES6 sang ES5 -> Tham khảo: https://babeljs.io/docs/usage/babel-register/
require('babel-register');

// Hỗ trợ dùng async/await
require('babel-polyfill');

// connect app
require('../app');
