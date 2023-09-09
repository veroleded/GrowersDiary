import { Router } from 'express';
import strainController from '../controllers/strain-controller';
import authMiddleware from '../middlewares/auth-middleware';

const strainRouter = Router()

strainRouter.get('/all', authMiddleware, strainController.getAll);

export default strainRouter;