import { ObjectId } from 'mongodb';
import AuthTokenHandler from '../utils/tokens';
import UsersCollection from '../utils/users';
import Password from '../utils/passwords';

/**
 * Applies Basic authentication to a route.
 * @param {import('express').Request} req - Request object
 * @param {import('express').Response} res - Response object
 * @param {import('express').NextFunction} next - Next function
 */
export const basicAuthenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [email, password] = credentials.split(':');

  try {
    const user = await UsersCollection.getUser({ email });
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const isPasswordValid = Password.isPasswordValid(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Applies X-Token authentication to a route.
 * @param {import('express').Request} req - Request object
 * @param {import('express').Response} res - Response object
 * @param {import('express').NextFunction} next - Next function
 */
export const xTokenAuthenticate = async (req, res, next) => {
  const { method, path } = req;
  
  // Exclude GET /files/:id/data from authentication
  if (method === 'GET' && path.toLowerCase().match(/\/files\/.*\/data\/?/)) return next();

  const token = req.headers['x-token'];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    let userId = await AuthTokenHandler.getUserByToken(token);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Casting to ObjectId if it is a valid string otherwise it throws an error
    userId = ObjectId.isValid(userId) ? new ObjectId(userId) : userId;
    const user = await UsersCollection.getUser({ _id: userId });
    
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('X-Token authentication error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
