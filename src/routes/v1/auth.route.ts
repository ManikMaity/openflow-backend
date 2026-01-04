import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware';
import { signupSchema } from '../../validations/user.validation';
import { VALIDATION_TARGETS } from '../../types';

const authRouter = Router();

authRouter.post('/signup', validate(signupSchema, VALIDATION_TARGETS.BODY), (req, res) => {
  res.status(201).json({ message: 'User signed up successfully', user: req.body });
});

export default authRouter;
