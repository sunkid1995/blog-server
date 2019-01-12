import jwt from 'jsonwebtoken';

// configs
import config from '../configs';

module.exports = (req, res, next) => {
  try {
    /**
     * split space in req.headers.authorization('Bearer token') <access_token> & get token in arr after split - [1]
     */
    const token = req.headers.authorization.split(' ')[1];

    /**
     * decode token return object infomations auth
     */
    const decoded = jwt.verify(token, config.security.sessionSecret);

    /**
     * push object infomations auth to req
     */
    req.authData = decoded;

    /**
     * next middleware
     */

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      data: {},
      error: [
        { message: 'HTTP Token: Access denied!' },
      ],
    });
  }
};

