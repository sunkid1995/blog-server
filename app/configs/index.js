import _ from 'lodash';

// Các setting mặc định dùng cho tất cả các môi trường
const defaultConfig = {
  env: process.env.NODE_ENV,

  get envs() {
    return {
      development: process.env.NODE_ENV === 'development',
      production: process.env.NODE_ENV === 'production'
    }
  },

  PORT: process.env.PORT || 8080,
  apiPrefix: '',
}

// Setting cho các môi trường cụ thể
const envConfig = {
  development: { // Môi trường dev
    mongo: {
      uri: process.env.MONGO_URI || 'mongodb://localhost/blogdb',
    }
  },

  production: { // Môi trường product
    mongo: {
      uri: process.env.MONGO_URI || 'mongodb://localhost/27017/blogdb',
    }
  }
}

export default _.merge(defaultConfig, envConfig[process.env.NODE_ENV] || {});