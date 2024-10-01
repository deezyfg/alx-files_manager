import envLoader from '../utils/env_loader';

const startServer = (api) => {
  envLoader();
  const port = process.env.PORT || 5000;
  const env = process.env.NODE_ENV || 'development';

  return new Promise((resolve, reject) => {
    const server = api.listen(port, () => {
      console.log(`[${env}] API has started listening at port:${port}`);
      resolve(server);
    });

    server.on('error', (err) => {
      console.error(`Failed to start server: ${err.message}`);
      reject(err);
    });
  });
};

export default startServer;
