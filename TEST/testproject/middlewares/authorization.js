const JWT = require('jsonwebtoken');
const { users } = require('../database').models;
const { JWT_SECRET } = process.env;

async function authorization(req, res, next) {
  try {
    if (['/users/sign-up', '/users/sign-in'].includes(req.path)) {
      next();
      return;
    }
  
    const token = req.headers['x-authorization'];
    if (token) {
      const decoded = JWT.verify(token, JWT_SECRET)
      const id = decoded.id
      const user = await users.findOne({_id: id}).select('-password').lean();
      if (user) {
        req.user = user
      }
      next();
    }
    else {
      return res.status(401).send({
        status: "fail",
        message: 'unauthorized',
      });
    }
  } catch (e) {
    return res.status(401).send({
      status: "fail",
      message: 'unauthorized',
    });
  }
}

module.exports = authorization
