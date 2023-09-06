import { Request, Response, NextFunction } from 'express';
import userService from '../service/user-service';

class UserController {
  async registration(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const userData = await userService.registration(name.trim(), email.trim().toLowerCase(), password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true }); // 30 day
      return res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(409).json(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {}
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {}
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {}
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const { link } = req.params;
      await userService.activate(link);
      return res.redirect(process.env.CLIENT_URL as string);
    } catch (e) {
      console.log(e);

    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(['123', '456']);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new UserController();
