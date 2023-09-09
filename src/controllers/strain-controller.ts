import { Request, Response, NextFunction } from 'express';

import strainService from '../service/strain-service';

class StrainController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const strainsData = await strainService.getAll();

      return res.json(strainsData);
    } catch (e) {
      next(e);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, type, feminization } = req.body;
      const strainData = await strainService.add({ name, description, type, feminization });
      return res.json(strainData);
    } catch(e) {
      next(e);
    }
  }
}

export default new StrainController();
