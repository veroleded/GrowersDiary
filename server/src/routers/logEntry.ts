import { Router } from 'express';

import authMiddleware from '../middlewares/auth-middleware';
import logEntryController from '../controllers/logEntry-controller';

const logEntryRouter = Router();

logEntryRouter.get('/:growLogId', authMiddleware, logEntryController.getAll);
logEntryRouter.post('', authMiddleware, logEntryController.create);
logEntryRouter.get('/:id', authMiddleware, logEntryController.getOne);
logEntryRouter.put('/:id', authMiddleware, logEntryController.UpdateOne);

export default logEntryRouter;
