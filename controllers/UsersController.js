/* eslint-disable import/no-named-as-default */
import sha1 from 'sha1';
import Queue from 'bull/lib/queue';
import dbClient from '../utils/db';

const userQueue = new Queue('email sending');

export default class UsersController {
  /**
   * @api {post} /users Create a new user
   * @apiName PostNew
   * @apiGroup User
   *
   * @apiParam {String} email User's email
   * @apiParam {String} password User's password
   *
   * @apiSuccess {String} email User's email
   * @apiSuccess {String} id User's ID
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 201 Created
   *     {
   *       "email": "bob@dylan.com",
   *       "id": "5f1e7cda04a394508232559d"
   *     }
   *
   * @apiError 400 Missing email
   * @apiError 400 Missing password
   * @apiError 400 Already exist
   */
  static async postNew(req, res) {
    const email = req.body ? req.body.email : null;
    const password = req.body ? req.body.password : null;

    if (!email) {
      res.status(400).json({ error: 'Missing email' });
      return;
    }
    if (!password) {
      res.status(400).json({ error: 'Missing password' });
      return;
    }
    const user = await (await dbClient.usersCollection()).findOne({ email });

    if (user) {
      res.status(400).json({ error: 'Already exist' });
      return;
    }
    const insertionInfo = await (await dbClient.usersCollection())
      .insertOne({ email, password: sha1(password) });
    const userId = insertionInfo.insertedId.toString();

    userQueue.add({ userId });
    res.status(201).json({ email, id: userId });
  }

  /**
   * @api {get} /users/me Get user information
   * @apiName GetMe
   * @apiGroup User
   *
   * @apiHeader {String} X-Token Authentication token
   *
   * @apiSuccess {String} email User's email
   * @apiSuccess {String} id User's ID
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "email": "bob@dylan.com",
   *       "id": "5f1e7cda04a394508232559d"
   *     }
   *
   * @apiError 401 Unauthorized
   */
  static async getMe(req, res) {
    const { user } = req;

    res.status(200).json({ email: user.email, id: user._id.toString() });
  }
}
