import { Router } from 'express';
import { serverHealthCheckController } from '../../controllers/health.controller';

const healthRouter = Router();

healthRouter.get('/', serverHealthCheckController);

export default healthRouter;
