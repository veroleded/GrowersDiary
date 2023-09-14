import { Router } from 'express';

import authMiddleware from '../middlewares/auth-middleware';
import growLogController from '../controllers/growLog-controller';

const growLogRouter = Router();

growLogRouter.get('', authMiddleware, growLogController.getAllOwnerGrowLogs);
growLogRouter.post('', authMiddleware, growLogController.createGrowLog);
growLogRouter.get('/:id', authMiddleware, growLogController.getOne);
growLogRouter.put('/:id', authMiddleware, growLogController.updateOne);
growLogRouter.delete('/:id', authMiddleware, growLogController.deleteOne);

export default growLogRouter;