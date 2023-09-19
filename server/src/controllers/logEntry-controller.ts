import { Response, NextFunction } from 'express';

import { RequestUser } from '../interfaces/additional-request';
import logEntryService from '../service/logEntry-service';
import UserDto from '../dtos/user-dto';

class LogEntryController {
  async getAll(req: RequestUser, res: Response, next: NextFunction) {
    try {
      const { growLogId } = req.params;
      const logEntriesData = await logEntryService.getAll(Number(growLogId));

      return res.json(logEntriesData);
    } catch (e) {
      next(e);
    }
  }

  async create(req: RequestUser, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const buffer = (req.files as Express.Multer.File[])[0].buffer;
      const logEntriesData = await logEntryService.createOne(payload, buffer);

      return res.json(logEntriesData);
    } catch (e) {
      next(e);
    }
  }

  async getOne(req: RequestUser, res: Response, next: NextFunction) {
    try {
      const ownerId = (req.user as UserDto).id;
      const { id } = req.params;
      const logEntryData = await logEntryService.getOne(Number(id), ownerId);

      return res.json(logEntryData);
    } catch (e) {
      next(e);
    }
  }

  async UpdateOne(req: RequestUser, res: Response, next: NextFunction) {
    try {
      const ownerId = (req.user as UserDto).id;
      const { id } = req.params;
      const payload = req.body;
      const buffer = (req.files as Express.Multer.File[])[0].buffer;

      const logEntryData = await logEntryService.updateOne(payload, buffer, Number(id), ownerId);

      return res.json(logEntryData);
    } catch (e) {
      next(e);
    }
  }

  async deleteOne(req: RequestUser, res: Response, next: NextFunction) {
    try {
      const ownerId = (req.user as UserDto).id;
      const { id } = req.params;

      await logEntryService.deleteOne(Number(id), ownerId);

      return res.status(200).send();
    } catch (e) {
      next(e);
    }
  }
}

export default new LogEntryController();
