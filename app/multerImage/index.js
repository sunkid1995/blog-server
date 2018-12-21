import multer from 'multer';

// Cấu hình cho multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads/');
  },

  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  /**
   * từ chối 1 file
   * nếu mà file.mimetype === image/jpeg hoặc image/png thì chấp nhận để lưu
   * còn không phải thì từ chối
   */
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') callback(null, true);
  else callback(null, false);
};

// Xử dụng multer để xử lý form-data
// Tham khảo https://github.com/expressjs/multer

const upload = multer({
  storage, fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

export default upload;
