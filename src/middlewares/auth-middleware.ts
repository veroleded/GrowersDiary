import { Response, NextFunction } from 'express';

import AuthError from '../exceptions/api-errors';
import tokenService from '../service/token-service';
import { RequestUser } from '../interfaces/additional-request';
import UserDto from '../dtos/user-dto';

const authMiddleware = (req: RequestUser, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(AuthError.UnautharizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(AuthError.UnautharizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);

    if (!userData) {
      return next(AuthError.UnautharizedError());
    }

    req.user = userData as UserDto;

    next();
  } catch (e) {
    return next(AuthError.UnautharizedError());
  }
};

export default authMiddleware;
