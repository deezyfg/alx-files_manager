import { MongoClient } from 'mongodb';

/**
 * Class for managing database operations
 */
class DBClient {
  /**
   * Creates a new DBClient instance
   */
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const uri = `mongodb://${host}:${port}/${database}`;

    this.client = new MongoClient(uri, { useUnifiedTopology: true });
    this.db = null;
    this.connectionPromise = this.client.connect()
      .then(() => {
        this.db = this.client.db(database);
        console.log('Connected to MongoDB');
      })
      .catch(err => console.error('Failed to connect to MongoDB:', err));
  }

  /**
   * Checks if the connection to the database is alive
   * @returns {boolean} True if the connection is alive, false otherwise
   */
  isAlive() {
    return !!this.client && !!this.client.topology && this.client.topology.isConnected();
  }

  /**
   * Gets the number of users in the database
   * @returns {Promise<number>} The number of users
   */
  async nbUsers() {
    await this.connectionPromise;
    return this.db.collection('users').countDocuments();
  }

  /**
   * Gets the number of files in the database
   * @returns {Promise<number>} The number of files
   */
  async nbFiles() {
    await this.connectionPromise;
    return this.db.collection('files').countDocuments();
  }

  /**
   * Gets the users collection
   * @returns {Promise<Collection>} The users collection
   */
  async usersCollection() {
    await this.connectionPromise;
    return this.db.collection('users');
  }

  /**
   * Gets the files collection
   * @returns {Promise<Collection>} The files collection
   */
  async filesCollection() {
    await this.connectionPromise;
    return this.db.collection('files');
  }
}

const dbClient = new DBClient();
export default dbClient;
