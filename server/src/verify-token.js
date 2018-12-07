const jwt = require('jsonwebtoken');
const User = require('./model/user.model');

const extractToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  return false;
};

const verifyToken = (req, res, next) => {
  const token = extractToken(req);
  if (!token) return res.status(403).send({ message: 'No token provided' });

  return jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) res.status(500).send({ message: 'Failed to authenticate' });

    const user = await User.findOne({ _id: decoded._id });
    if (!user) res.status(403).send({ message: 'User does not exist' });
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
