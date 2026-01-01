import { ERROR_CODE_MESSAGES } from '../types';

export const ERROR_CODES_MAP = {
  [ERROR_CODE_MESSAGES.USER_NOT_FOUND]: { status: 404, message: 'User not found' },
  [ERROR_CODE_MESSAGES.USER_NOT_AUTHORIZED]: { status: 401, message: 'User not authorized' },
  [ERROR_CODE_MESSAGES.USER_NOT_AUTHENTICATED]: { status: 401, message: 'User not authenticated' },
  [ERROR_CODE_MESSAGES.INTERNAL_SERVER_ERROR]: { status: 500, message: 'Internal server error' },
  [ERROR_CODE_MESSAGES.VALIDATION_ERROR]: { status: 400, message: 'Validation error' },
  [ERROR_CODE_MESSAGES.ROUTE_NOT_FOUND]: { status: 404, message: 'Route not found' },
} as const;

export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;
  code?: string;

  constructor(statusCode: number, message: string, code?: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      status: this.statusCode < 500 ? 'fail' : 'error',
      message: this.message,
      code: this.code,
    };
  }
}
