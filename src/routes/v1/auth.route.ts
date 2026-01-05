import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware';
import { signupSchema } from '../../validations/user.validation';
import { VALIDATION_TARGETS } from '../../types';
import { signupController } from '../../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/signup', validate(signupSchema, VALIDATION_TARGETS.BODY), signupController);

export default authRouter;
