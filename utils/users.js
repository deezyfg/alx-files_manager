import { ObjectId } from 'mongodb';
import dbClient from './db';
import Password from './passwords';

/**
 * Utility class for users database operations
 */
class UsersCollection {
  /**
   * Creates new user document in database
   * @param {string} email - User's email
   * @param {string} password - User's password (will be hashed)
   * @returns {Promise<ObjectId>} - User ID
   */
  static async createUser(email, password) {
    const collection = await dbClient.usersCollection();
    const newUser = { email, password: Password.encryptPassword(password) };
    const result = await collection.insertOne(newUser);
    return result.insertedId;
  }

  /**
   * Retrieves user document from database based on query parameters
   * @param {object} query - Query parameters for finding the user
   * @returns {Promise<object | null>} - User document or null if not found
   */
  static async getUser(query) {
    const collection = await dbClient.usersCollection();
    return collection.findOne(query);
  }

  /**
   * Retrieves user document from database by ID
   * @param {string} id - User ID
   * @returns {Promise<object | null>} - User document or null if not found
   */
  static async getUserById(id) {
    const collection = await dbClient.usersCollection();
    return collection.findOne({ _id: new ObjectId(id) });
  }
}

export default UsersCollection;
