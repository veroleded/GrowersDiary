import { Request, Response, NextFunction } from 'express';
import userService from '../services/user-service';
import { validationResult } from 'express-validator';
import AuthError from '../exceptions/api-errors';

// вынести дублирующийся код в отдельные функции

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const validationErrors = validationResult(req); 
      if (!validationErrors.isEmpty()) {
        return next(AuthError.BadRequest('Validation error', validationErrors.array()))
      }

      const { name, email, password } = req.body;
      const userData = await userService.registration(name, email.trim().toLowerCase(), password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }); // 30 day
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validationErrors = validationResult(req); 
      if (!validationErrors.isEmpty()) {
        return next(AuthError.BadRequest('Validation error', validationErrors.array()))
      }
      
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }); // 30 day
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.status(200).send();
    } catch (err) {
      next(err);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      console.log
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.status(200).json(userData);

    } catch (err) {
      next(err);
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const { link } = req.params;
      await userService.activate(link);
      return res.redirect(process.env.CLIENT_URL as string);
    } catch (err) {
      next(err);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);

    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
