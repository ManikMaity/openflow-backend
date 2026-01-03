import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import { ApiError, ERROR_CODES_MAP } from '../utils/error.util';
import { ERROR_CODE_MESSAGES } from '../types';
import { NODE_ENV } from '../config/server.config';
import { logger } from '../config/logger.config';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (NODE_ENV === 'development') {
    logger.error(err?.message);
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json(err.toJSON());
  }
  const errorData = ERROR_CODES_MAP.INTERNAL_SERVER_ERROR;
  const statusCode = err.statusCode || errorData?.status || httpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || errorData?.message || 'Internal server error';

  const error = new ApiError(statusCode, message, ERROR_CODE_MESSAGES.INTERNAL_SERVER_ERROR, false);
  return res.status(error.statusCode).json(error.toJSON());
};
