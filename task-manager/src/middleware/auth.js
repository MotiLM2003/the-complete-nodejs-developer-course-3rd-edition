const jwt = require('jsonwebtoken');
const User = require('../models/user');
const secret = 'coolworldman';
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decode = jwt.verify(token, secret);
    const user = await User.findOne({ _id: decode._id, 'tokens.token': token });
    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
    // console.log(user);
  } catch (error) {
    return res.status(401).send({ 'error': 'not authorized' });
  }
};

module.exports = auth;
