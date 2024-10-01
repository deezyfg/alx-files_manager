import { Request, Response } from 'express';

/**
 * Custom handler for unmatched routes
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 */
function unmatchedRouteHandler(req, res) {
  if (req.method.toLowerCase() === 'options') {
    // Handle OPTIONS requests
    res.status(200).end();
  } else {
    // Handle all other unmatched routes
    res.status(404).json({ error: `Cannot ${req.method} ${req.url}` });
  }
}

export default unmatchedRouteHandler;
