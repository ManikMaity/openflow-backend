import { NextFunction, Request, Response } from 'express';
import { dbInstance } from '../config/db.config';
import { signupUserService } from '../services/auth.service';
import { ApiError } from '../utils/error.util';
import { ERROR_CODE_MESSAGES } from '../types';
import { ResponseHandler } from '../utils/response.util';

export async function signupController(req: Request, res: Response, next: NextFunction) {
  try {
    const db = dbInstance();
    const response = new ResponseHandler(res);
    const { firstName, lastName, email, password } = req.body;
    const user = await signupUserService({ firstName, lastName, email, password }, { db });
    if (!user) {
      new ApiError(500, 'User signup failed', ERROR_CODE_MESSAGES.INTERNAL_SERVER_ERROR, false);
    }
    response.success(201, 'User signed up successfully', user);
  } catch (error) {
    next(error);
  }
}
