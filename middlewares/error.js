/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';

/**
 * @api {error} APIError API Error
 * @apiName APIError
 * @apiGroup Errors
 * @apiDescription Represents an error in this API.
 *
 * @apiParam {Number} code HTTP status code
 * @apiParam {String} message Error message
 */
export class APIError extends Error {
  constructor(code, message) {
    super();
    this.code = code || 500;
    this.message = message;
  }
}

/**
 * @api {middleware} errorResponse Error Response Middleware
 * @apiName ErrorResponse
 * @apiGroup Errors
 * @apiDescription Handles error responses for the API.
 *
 * @apiParam {Error} err The error object.
 * @apiParam {Request} req The Express request object.
 * @apiParam {Response} res The Express response object.
 * @apiParam {NextFunction} next The Express next function.
 *
 * @apiError (Error 4xx-5xx) {Object} error Error object with message
 */
export const errorResponse = (err, req, res, next) => {
  const defaultMsg = `Failed to process ${req.url}`;

  if (err instanceof APIError) {
    res.status(err.code).json({ error: err.message || defaultMsg });
    return;
  }
  res.status(500).json({
    error: err ? err.message || err.toString() : defaultMsg,
  });
}
