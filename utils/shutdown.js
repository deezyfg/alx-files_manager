/* eslint-disable no-console */
import dbClient from './db';
import redisClient from './redis';

/**
 * Handles graceful shutdown of server
 * @param {http.Server} server - The HTTP server instance
 * @returns {Promise<void>}
 */
async function shutdown(server) {
  console.log('Shutting down gracefully...');

  // Set a timeout for the shutdown process
  const shutdownTimeout = setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000); // 10 seconds timeout

  try {
    // Close Redis connection
    if (redisClient.isAlive()) {
      console.log('Closing Redis connection...');
      await redisClient.quit();
      console.log('Redis connection closed');
    }

    // Close MongoDB connection
    if (dbClient.isAlive()) {
      console.log('Closing DB connection...');
      await dbClient.close();
      console.log('DB connection closed');
    }

    // Close the HTTP server
    if (server && typeof server.close === 'function') {
      await new Promise((resolve) => {
        server.close(() => {
          console.log('Server closed');
          resolve();
        });
      });
    } else {
      console.log('No server to close or server.close is not a function');
    }

    clearTimeout(shutdownTimeout);
    console.log('Shutdown completed');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
}

export default shutdown;
