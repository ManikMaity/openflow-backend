import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import { ApiError } from "../utils/error.util";
import { ERROR_CODE_MESSAGES } from "../types";
import { NODE_ENV } from "../config/server.config";
import { logger } from "../config/logger.config";

export const errorCoverter: ErrorRequestHandler = (err, req, res, next) => {
      let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode : number =
      error.statusCode ||  httpStatus.INTERNAL_SERVER_ERROR;
    const message : string = error.message || (httpStatus as Record<number, string>)[statusCode];
    error = new ApiError(statusCode, message, ERROR_CODE_MESSAGES.INTERNAL_SERVER_ERROR, false);
  }
  next(error);
}


export const errorHandler: ErrorRequestHandler = (err : ApiError, req, res, next) => {
  let { statusCode, message, code } = err;
  
  if (NODE_ENV === "production" && !err.isOperational) {
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
      code = ERROR_CODE_MESSAGES.INTERNAL_SERVER_ERROR;
  }

  if (NODE_ENV === 'development') {
    if (err.isOperational) {
      logger.error(`OPERATIONAL ERROR - ${err.message}`);
    }
    else {
      logger.warn("NON-OPERATIONAL ERROR", err);
    }
  }


  const response = {
    success : false,
    message,
    code
  };
  

  res.status(statusCode).json(response);

}