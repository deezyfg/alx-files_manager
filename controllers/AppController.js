/* eslint-disable import/no-named-as-default */
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

export default class AppController {
  /**
   * @api {get} /status Get API Status
   * @apiName GetStatus
   * @apiGroup Status
   *
   * @apiSuccess {Boolean} redis Redis connection status
   * @apiSuccess {Boolean} db Database connection status
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "redis": true,
   *       "db": true
   *     }
   */
  static getStatus(req, res) {
    res.status(200).json({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    });
  }

  /**
   * @api {get} /stats Get API Stats
   * @apiName GetStats
   * @apiGroup Stats
   *
   * @apiSuccess {Number} users Number of users in the database
   * @apiSuccess {Number} files Number of files in the database
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "users": 12,
   *       "files": 1231
   *     }
   */
  static getStats(req, res) {
    Promise.all([dbClient.nbUsers(), dbClient.nbFiles()])
      .then(([usersCount, filesCount]) => {
        res.status(200).json({ users: usersCount, files: filesCount });
      });
  }
}
