import { Request, Response, NextFunction } from 'express';

/**
 * Represents an error in this API.
 */
export class APIError extends Error {
  constructor(code, message) {
    super();
    this.code = code || 500;
    this.message = message;
  }
}

/**
 * Custom error handler
 * @param {Error} err - Error object
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 * @returns - Error response
 */
export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const defaultMsg = `Failed to process ${req.url}`;

  if (err instanceof APIError) {
    return res.status(err.code).json({ error: err.message || defaultMsg });
  }

  // For unhandled errors, return a 500 status code
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || 'Oops! Something went wrong!';

  return res.status(statusCode).json({ error: errorMessage });
};

export default errorHandler;
