import mongoose from 'mongoose';
import config from '../configs';

// Thêm prototype Promise cho mongoose
mongoose.Promise = global.Promise;

// Kết nối database
mongoose.connect(config.mongo.uri, { useNewUrlParser: true });

// Hiển thị kết nối db
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', () => {
  console.log('Connected database successfully');
});