/* eslint-disable import/no-named-as-default */
import { v4 as uuidv4 } from 'uuid';
import redisClient from '../utils/redis';

export default class AuthController {
  /**
   * @api {get} /connect Get authentication token
   * @apiName GetConnect
   * @apiGroup Authentication
   * 
   * @apiHeader {String} Authorization Basic Auth username:password
   * 
   * @apiSuccess {String} token Authentication token
   * 
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "token": "a246721e-74b9-4f2e-80fa-60d3ee3fcbe9"
   *     }
   * 
   * @apiError 401 Unauthorized
   */
  static async getConnect(req, res) {
    const { user } = req;
    const token = uuidv4();

    await redisClient.set(`auth_${token}`, user._id.toString(), 24 * 60 * 60);
    res.status(200).json({ token });
  }

  /**
   * @api {get} /disconnect Disconnect user (logout)
   * @apiName GetDisconnect
   * @apiGroup Authentication
   * 
   * @apiHeader {String} X-Token Authentication token
   * 
   * @apiSuccess (204) {null} No Content
   * 
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 204 No Content
   * 
   * @apiError 401 Unauthorized
   */
  static async getDisconnect(req, res) {
    const token = req.headers['x-token'];

    await redisClient.del(`auth_${token}`);
    res.status(204).send();
  }
}
