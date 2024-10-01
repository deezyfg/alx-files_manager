import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

/**
 * Adds middlewares to the given express application.
 * @param {express.Express} api The express application.
 */
const injectMiddlewares = (api) => {
  // Parse JSON bodies
  api.use(express.json({ limit: '200mb' }));
  
  // Parse URL-encoded bodies
  api.use(express.urlencoded({ extended: true, limit: '200mb' }));
  
  // Enable CORS
  api.use(cors());
  
  // Add security headers
  api.use(helmet());
  
  // HTTP request logger
  if (process.env.NODE_ENV !== 'test') {
    api.use(morgan('dev'));
  }
};

export default injectMiddlewares;
