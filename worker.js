/* eslint-disable no-console */
import Queue from 'bull';
import { ObjectId } from 'mongodb';
import imageThumbnail from 'image-thumbnail';
import UsersCollection from './utils/users';
import FilesCollection from './utils/files';
import Mailer from './utils/mailer';

console.log('Worker starting...');
console.log('Initializing queues...');

// Initialize queues for handling jobs
const fileQueue = new Queue('thumbnail generation');
const userQueue = new Queue('send welcome email');

console.log('Queues initialized.');

/**
 * Generate thumbnails for the given file
 * @param {string} filePath - Path to the file
 * @param {number[]} sizes - Array of thumbnail sizes
 */
async function generateThumbnails(filePath, sizes) {
  console.log(`Generating thumbnails for ${filePath} with sizes: ${sizes.join(', ')}`);
  const thumbnailPromises = sizes.map(size => 
    imageThumbnail(filePath, { width: size, responseType: 'buffer' })
  );
  await Promise.all(thumbnailPromises);
  console.log('Thumbnails generated successfully');
}

/**
 * Process thumbnail generation jobs.
 * Handles the creation of multiple-sized thumbnails for uploaded files.
 * This process can run up to 10 concurrent jobs at once.
 */
fileQueue.process(10, async (job) => {
  console.log(`Processing file job #${job.id}`);
  const { fileId, userId } = job.data;

  // Validate job essential properties
  if (!fileId) throw new Error('Missing fileId');
  if (!userId) throw new Error('Missing userId');

  console.log('Processing', job.data.name || '');

  // Convert fileId and userId to ObjectId if necessary
  const _id = ObjectId.isValid(fileId) ? new ObjectId(fileId) : fileId;
  const _userId = ObjectId.isValid(userId) ? new ObjectId(userId) : userId;

  // Fetch the file from the database using fileId and userId
  const file = await FilesCollection.getFile({ _id, userId: _userId });
  if (!file) throw new Error('File not found');

  const { localPath } = file;
  const sizes = [500, 250, 100]; // Define thumbnail sizes

  try {
    // Generate thumbnails of different sizes for the file
    await generateThumbnails(localPath, sizes);
    return `Thumbnails for ${file.name} created successfully.`;
  } catch (err) {
    console.error('Thumbnail generation failed:', err);
    throw err;
  }
});

// Event listener: Log completion of thumbnail generation job
fileQueue.on('completed', (job, result) => {
  console.log(`Thumbnail generation job #${job.id} completed: ${result}`);
});

// Event listener: Log failure of thumbnail generation job
fileQueue.on('failed', (job, err) => {
  console.error(`Thumbnail generation job #${job.id} failed:`, err);
});

/**
 * Process user welcome email jobs.
 * Sends a welcome email to newly registered users.
 * This process can run up to 20 concurrent jobs at once.
 */
userQueue.process(20, async (job) => {
  console.log(`Processing user job #${job.id}`);
  const { userId } = job.data;

  // Validate that userId is present in the job data
  if (!userId) throw new Error('Missing userId');

  // Convert userId to MongoDB ObjectId if necessary
  const _id = ObjectId.isValid(userId) ? new ObjectId(userId) : userId;

  // Fetch the user from the database using userId
  const user = await UsersCollection.getUser({ _id });
  if (!user) throw new Error('User not found');

  console.log(`Sending welcome email to ${user.email}`);

  try {
    // Build the welcome email subject and content
    const mailSubject = 'Welcome to ALX-Files_Manager';
    const mailContent = `
      <div>
        <h3>Hello ${user.name || user.email},</h3>
        <p>Welcome to ALX-Files_Manager, a simple file management API built with Node.js.</p>
        <p>We hope you enjoy your experience with our platform!</p>
      </div>
    `;

    // Send the welcome email using the Mailer utility
    await Mailer.sendMail(Mailer.buildMessage(user.email, mailSubject, mailContent));
    return `Welcome email sent to ${user.email}`;
  } catch (err) {
    console.error('Error sending welcome email:', err);
    throw err;
  }
});

// Event listener: Log completion of welcome email job
userQueue.on('completed', (job, result) => {
  console.log(`Email job #${job.id} completed: ${result}`);
});

// Event listener: Log failure of welcome email job
userQueue.on('failed', (job, err) => {
  console.error(`Email job #${job.id} failed:`, err);
});

console.log('Worker setup complete. Waiting for jobs...');

export { fileQueue, userQueue };
