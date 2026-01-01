import express from 'express';
import cors from 'cors';
import { FRONTEND_URL } from './config/server.config';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import router from './routes/v1';
import { errorCoverter, errorHandler } from './middlewares/error.middleware';
import { ApiError, ERROR_CODES_MAP } from './utils/error.util';
import httpStatus from 'http-status';
import { ERROR_CODE_MESSAGES } from './types';

const app = express();

// Middleware for security
app.use(helmet());
app.use(compression());
app.use(morgan('combined')); // Log HTTP requests

// Middleware for parsing
app.use(express.json({ limit: '1mb' }));
app.use(cors({ origin: FRONTEND_URL, credentials: true }));

// Routes
app.use('/api/v1', router);

// Unhandled routes
app.use((req, res, next) => {
  next(
    new ApiError(
      httpStatus.NOT_FOUND,
      ERROR_CODES_MAP.ROUTE_NOT_FOUND.message,
      ERROR_CODE_MESSAGES.ROUTE_NOT_FOUND,
      true,
    ),
  );
});

// Globbal  Error handling
app.use(errorCoverter);
app.use(errorHandler);

export default app;
