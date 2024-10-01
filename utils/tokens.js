import { v4 as uuidv4 } from 'uuid';
import redisClient from './redis';

// Auth token handler class
class AuthTokenHandler {
  /**
   * Creates a new auth token for given user
   * @param {object} user - User object
   * @param {number} duration - Duration of token in seconds (default: 86400)
   * @returns {string} - Generated token
   */
  static async createAuthToken(user, duration = 24 * 60 * 60) {
    const token = uuidv4();
    await redisClient.set(`auth_${token}`, user._id.toString(), duration);
    return token;
  }

  /**
   * Retrieves user ID associated with given token
   * @param {string} token - Token to search for
   * @returns {string | null} - User ID or null if not found
   */
  static async getUserByToken(token) {
    return await redisClient.get(`auth_${token}`);
  }

  /**
   * Deletes token from Redis
   * @param {string} token - Token to delete
   * @returns {number} - Number of tokens deleted
   */
  static async deleteAuthToken(token) {
    return await redisClient.del(`auth_${token}`);
  }
}

export default AuthTokenHandler;
