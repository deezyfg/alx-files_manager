import express from 'express';

/**
 * @api {function} injectMiddlewares Inject Middlewares
 * @apiName InjectMiddlewares
 * @apiGroup Middleware
 * @apiDescription Adds middlewares to the given express application.
 *
 * @apiParam {express.Express} api The express application.
 *
 * @apiExample {javascript} Usage:
 *     import express from 'express';
 *     import injectMiddlewares from './libs/middlewares';
 *     
 *     const app = express();
 *     injectMiddlewares(app);
 */
const injectMiddlewares = (api) => {
  api.use(express.json({ limit: '200mb' }));
};

export default injectMiddlewares
