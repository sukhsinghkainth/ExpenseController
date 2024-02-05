import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../../../interfaces/IUser';
import config from '../../../config/config';
import { log } from 'console';

interface ReqWithUser extends Request {
  user?: User;
}

const isAuth = (req: ReqWithUser, res: Response, next: NextFunction) => {    
  const token = req.cookies.token ||req.header('Authorization')?.replace('Bearer ', '') || req.body.token;
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_KEY as string) as User;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

export = isAuth;