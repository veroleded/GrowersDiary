import { Router } from 'express';
import strainController from '../controllers/strain-controller';
import authMiddleware from '../middlewares/auth-middleware';

const strainRouter = Router();

strainRouter.get('', authMiddleware, strainController.getAll);
strainRouter.post('', authMiddleware, strainController.addOne);
strainRouter.get('/:id', authMiddleware, strainController.getOne);
strainRouter.put('/:id', authMiddleware, strainController.updateOne);
strainRouter.delete('/:id', authMiddleware, strainController.deleteOne);

export default strainRouter;
