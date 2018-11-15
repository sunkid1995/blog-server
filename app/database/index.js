import mongoose from 'mongoose';
import config from '../configs';

/**
 * @description Thêm prototype Promise cho mongoose
 */
mongoose.Promise = global.Promise;

/**
 * @description  Kết nối database
 */
mongoose.set('useCreateIndex', true)
mongoose.connect(config.mongo.uri, { useNewUrlParser: true });

/**
 * @description Hiển thị kết nối db
 */
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', () => {
  console.log('Connected database successfully');
});