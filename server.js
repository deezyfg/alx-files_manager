import express from 'express';
import startServer from './libs/boot';
import router from './routes';
import injectMiddlewares from './libs/middlewares';
import errorHandler from './middlewares/error';
import unmatchedRouteHandler from './middlewares/unmatched';
import shutdown from './utils/shutdown';

const app = express();

// Inject middlewares
injectMiddlewares(app);

// Inject routes
app.use(router);

// Handle unmatched routes
app.use(unmatchedRouteHandler);

// Error handling
app.use(errorHandler);

// Start the server
let server;
startServer(app)
  .then((s) => {
    server = s;
  })
  .catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });

// Graceful shutdown
const shutdownHandler = () => shutdown(server);
process.on('SIGINT', shutdownHandler);
process.on('SIGTERM', shutdownHandler);
process.on('SIGQUIT', shutdownHandler);

export default app;
