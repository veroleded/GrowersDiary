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

  async addOne(req: Request, res: Response, next: NextFunction) {
    try {
      const strainData = await strainService.addOne({ ...req.body });
      
      return res.json(strainData);
    } catch (e) {
      next(e);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const strainData = await strainService.getOne(Number(id));
      res.json(strainData);
    } catch (e) {
      next(e);
    }
  }

  async updateOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const strainData = await strainService.updateOne({ ...req.body }, Number(id));
      res.json(strainData);
    } catch (e) {
      next(e);
    }
  }

  async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await strainService.deleteOne(Number(id));
      res.send();
    } catch (e) {
      next(e);
    }
  }
}

export default new StrainController();
