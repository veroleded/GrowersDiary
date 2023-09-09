import { Router } from 'express';
import { body } from 'express-validator';

import userController from '../controllers/user-controller';
import authMiddleware from '../middlewares/auth-middleware';

const authRouter = Router();

authRouter.post(
  '/registration',
  body('name').isLength({ min: 2, max: 22 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6, max: 32 }),
  userController.registration,
);
authRouter.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 6, max: 32 }),
  userController.login,
);
authRouter.post('/logout', userController.logout);
authRouter.get('/activate/:link', userController.activate);
authRouter.get('/refresh', userController.refresh);
authRouter.get('/users', authMiddleware, userController.getUsers);

export default authRouter;