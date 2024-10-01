import envLoader from '../utils/env_loader';

/**
 * @api {function} startServer Start API Server
 * @apiName StartServer
 * @apiGroup Server
 * @apiDescription Starts the API server on the specified port.
 *
 * @apiParam {Object} api Express application instance
 *
 * @apiExample {javascript} Usage:
 *     import express from 'express';
 *     import startServer from './libs/boot';
 *     
 *     const app = express();
 *     startServer(app);
 */
const startServer = (api) => {
  envLoader();
  const port = process.env.PORT || 5000;
  const env = process.env.npm_lifecycle_event || 'dev';
  api.listen(port, () => {
    console.log(`[${env}] API has started listening at port:${port}`);
  });
};

export default startServer
