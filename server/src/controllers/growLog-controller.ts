import { Response, NextFunction } from 'express';

import { RequestUser } from '../interfaces/additional-request';
import growLogService from '../service/growLog-service';
import UserDto from '../dtos/user-dto';

class GrowLogController {
  async getAllOwnerGrowLogs(req: RequestUser, res: Response, next: NextFunction) {
    try {
      const { id } = req.user as UserDto;
      const growLogsData = await growLogService.getAllOwnerGrowLogs(id);

      return res.json(growLogsData);
    } catch (e) {
      next(e);
    }
  }

  async createGrowLog(req: RequestUser, res: Response, next: NextFunction) {
    try {
      const { id } = req.user as UserDto;
      const payload = req.body;
      payload.ownerId = id;
      const growLogsData = await growLogService.createGrowLog(payload);

      return res.json(growLogsData);
    } catch (e) {
      next(e);
    }
  }

  async getOne(req: RequestUser, res: Response, next: NextFunction) {
    try {
      const userId = (req.user as UserDto).id;
      const { id } = req.params;
      const growLogData = await growLogService.getOne(userId, Number(id));

      return res.json(growLogData);
    } catch (e) {
      next(e);
    }
  }

  async updateOne(req: RequestUser, res: Response, next: NextFunction) {
    try {
      const userId = (req.user as UserDto).id;
      const { id } = req.params;
      const growLogData = await growLogService.updateOne({ ...req.body }, Number(id), userId);

      return res.json(growLogData);
    } catch (e) {
      next(e);
    }
  }

  async deleteOne(req: RequestUser, res: Response, next: NextFunction) {
    try {
      const userId = (req.user as UserDto).id;
      const { id } = req.params;
      await growLogService.deleteOne(userId, Number(id));

      return res.status(200).send();
    } catch (e) {
      next(e);
    }
  }
}

export default new GrowLogController();
