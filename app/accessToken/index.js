/**
 * Json web token (jwt) - check Bearer < access_token>
 * @param {req} req -> client gửi yêu cầu cho server
 * @param {res} res -> server trả lời yêu cầu cho client
 * @param {next} next -> callback argument to the middleware function
 */

export default function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    /**
     * cắt đi dấu cách ở phần Bearer (' space ') <access_token>
     */
    const bearer = bearerHeader.split(' ');
    /**
     * lấy token từ array ra bearer[1]
     */
    const bearerToken = bearer[1];
    req.token = bearerToken;

    /**
     * next middleware
     */

    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'HTTP Token: Access denied.',
    });
  }
}
