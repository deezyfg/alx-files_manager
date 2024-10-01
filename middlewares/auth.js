/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { getUserFromXToken, getUserFromAuthorization } from '../utils/auth';

/**
 * @api {middleware} basicAuthenticate Basic Authentication Middleware
 * @apiName BasicAuthenticate
 * @apiGroup Authentication
 * @apiDescription Applies Basic authentication to a route.
 *
 * @apiHeader {String} Authorization Basic Auth token
 *
 * @apiSuccess (Success 200) {Object} req.user User object added to the request
 * @apiError (Error 401) {Object} error Unauthorized
 */
export const basicAuthenticate = async (req, res, next) => {
  const user = await getUserFromAuthorization(req);

  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  req.user = user;
  next();
};

/**
 * @api {middleware} xTokenAuthenticate X-Token Authentication Middleware
 * @apiName XTokenAuthenticate
 * @apiGroup Authentication
 * @apiDescription Applies X-Token authentication to a route.
 *
 * @apiHeader {String} X-Token Authentication token
 *
 * @apiSuccess (Success 200) {Object} req.user User object added to the request
 * @apiError (Error 401) {Object} error Unauthorized
 */
export const xTokenAuthenticate = async (req, res, next) => {
  const user = await getUserFromXToken(req);

  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  req.user = user;
  next();
}
