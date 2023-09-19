import { NextFunction, Request, Response } from 'express';
import AuthError from '../exceptions/api-errors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware = (error: unknown, req: Request, res: Response, _next: NextFunction) => {
  console.log(error);
  if (error instanceof AuthError) {
    return res.status(error.status).json({ message: error.message, errors: error.errors });
  }
  return res.status(500).json({ message: 'Unexpected error', error });
};

export default errorMiddleware;
