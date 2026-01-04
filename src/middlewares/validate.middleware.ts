import { ZodError, ZodSchema } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { VALIDATION_TARGETS } from '../types';
import { ValidationError } from '../utils/error.util';

export function validate(schema: ZodSchema, target: VALIDATION_TARGETS = VALIDATION_TARGETS.BODY) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const data = req[target];
      const parsedData = schema.parse(data);
      req[target] = parsedData;
      next();
    } catch (error) {
      let message = 'Invalid request data';

      if (error instanceof ZodError) {
        message = error.issues[0]?.message;
      }

      next(new ValidationError(message));
    }
  };
}
