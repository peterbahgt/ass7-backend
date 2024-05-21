
import jwt from 'jsonwebtoken';
import userModel from './../DB/models/user.model.js';

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return next(new Error('Please log in', { cause: 401 }));
    }
    const payload = jwt.verify(authorization, 'enass');
    if (!payload?._id) {
      return next(new Error('Invalid payload', { cause: 404 }));
    }
    const user = await userModel.findOne({ _id: payload._id });
   
    if (!user) {
      return next(new Error('User not found', { cause: 404 }));
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return next(error);
  }
};

export default auth;
