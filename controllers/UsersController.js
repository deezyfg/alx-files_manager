import Queue from 'bull';
import UsersCollection from '../utils/users';

// User welcome email queue
const userQueue = new Queue('email sending');

class UsersController {
  /**
   * Controller for endpoint POST /users for creating new users
   * @param {import('express').Request} req - request object
   * @param {import('express').Response} res - response object
   */
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    try {
      const existingUser = await UsersCollection.getUser({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Already exist' });
      }

      const userId = await UsersCollection.createUser(email, password);
      await userQueue.add({ userId });

      return res.status(201).json({ id: userId.toString(), email });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Controller for endpoint GET /users/me for retrieving the current user's information
   * @param {import('express').Request} req - request object
   * @param {import('express').Response} res - response object
   */
  static async getMe(req, res) {
    const { user } = req;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    return res.status(200).json({ email: user.email, id: user._id.toString() });
  }
}

export default UsersController;
