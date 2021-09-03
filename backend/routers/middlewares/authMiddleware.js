const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../../config');

module.exports.authMiddleware = (req, res, next) => {
  const header = req.headers['authorization'];

  if (!header) {
    return res.status(401)
        .json({message: 'No Authorization http header found!'});
  }
  const [, token] = header.split(' ');

  if (!token) {
    return res.status(401).json({message: 'No JWT token found!'});
  }
  req.user = jwt.verify(token, JWT_SECRET);
  next();
};
