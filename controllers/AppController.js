import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  /**
   * Controller for endpoint GET /status that retrieves
   * mongodb client and redis client connection status
   * @param {import("express").Request} _req - request object
   * @param {import("express").Response} res - response object
   */
  static getStatus(_req, res) {
    res.status(200).json({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    });
  }

  /**
   * Controller for endpoint GET /stats that retrieves
   * count of users and files
   * @param {import("express").Request} _req - Request object
   * @param {import("express").Response} res - Response object
   * @param {import("express").NextFunction} next - Next function
   */
  static async getStats(_req, res, next) {
    try {
      const [users, files] = await Promise.all([
        dbClient.nbUsers(),
        dbClient.nbFiles()
      ]);
      res.status(200).json({ users, files });
    } catch (err) {
      next(err);
    }
  }
}

export default AppController;
