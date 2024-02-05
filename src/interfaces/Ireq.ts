import User from '../interfaces/IUser';
import { Request } from 'express-jwt';

export default interface ReqWithUser extends Request {
    user?: User;
  }