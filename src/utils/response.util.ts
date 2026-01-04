import { Response } from 'express';
import { ERROR_CODE_MESSAGES } from '../types';
import { ERROR_CODES_MAP } from './error.util';

export class ResponseHandler {
  constructor(private readonly res: Response) {}

  success<T>(data: T, statusCode = 200, message?: string) {
    return this.res.status(statusCode).json({
      success: true,
      data,
      message: message || 'Request successful',
    });
  }

  error(
    message: string,
    statusCode = ERROR_CODES_MAP.INTERNAL_SERVER_ERROR.status,
    code = ERROR_CODE_MESSAGES.INTERNAL_SERVER_ERROR,
  ) {
    return this.res.status(statusCode).json({
      success: false,
      message,
      code,
    });
  }

  paginated<T>(
    params: {
      data: T[];
      page: number;
      limit: number;
      total: number;
    },
    statusCode = 200,
    message?: string,
  ) {
    const { data, page, limit, total } = params;

    return this.res.status(statusCode).json({
      success: true,
      data,
      message: message || 'Request successful',
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    });
  }
}
