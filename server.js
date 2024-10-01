/**
 * Main server file
 * This file sets up the Express server, injects middlewares and routes,
 * and starts the server.
 */

import express from 'express';
import startServer from './libs/boot';
import injectRoutes from './routes';
import injectMiddlewares from './libs/middlewares';

const server = express();

injectMiddlewares(server);
injectRoutes(server);
startServer(server);

export default server
