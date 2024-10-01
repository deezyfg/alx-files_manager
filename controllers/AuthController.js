import { v4 as uuidv4 } from 'uuid';
import UsersCollection from '../utils/users';
import AuthTokenHandler from '../utils/tokens';
import PasswordHandler from '../utils/passwords';

class AuthController {
  /**
   * Controller for GET /connect endpoint for authorizing users
   * using Basic Auth scheme
   * @param {import("express").Request} req - request object
   * @param {import("express").Response} res - response object
   */
  static async getConnect(req, res) {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = await AuthTokenHandler.createAuthToken(user);
    return res.status(200).json({ token });
  }

  /**
   * Controller for GET /disconnect endpoint that logs out user
   * if they were logged in.
   * @param {import("express").Request} req - request object
   * @param {import("express").Response} res - response object
   */
  static async getDisconnect(req, res) {
    const token = req.headers['x-token'];
    if (!token || !await AuthTokenHandler.getUserByToken(token)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    await AuthTokenHandler.deleteAuthToken(token);
    return res.status(204).send();
  }

  /**
   * Controller for GET /users/me endpoint that retrieves information
   * about a logged in user
   * @param {import("express").Request} req - request object
   * @param {import("express").Response} res - response object
   */
  static async getMe(req, res) {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    return res.status(200).json({ id: user._id.toString(), email: user.email });
  }
}

export default AuthController;
