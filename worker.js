/* eslint-disable import/no-named-as-default */
/* eslint-disable no-console */
import { writeFile } from 'fs';
import { promisify } from 'util';
import Queue from 'bull/lib/queue';
import imgThumbnail from 'image-thumbnail';
import mongoDBCore from 'mongodb/lib/core';
import dbClient from './utils/db';
import Mailer from './utils/mailer';

console.log('Worker starting...');
console.log('Initializing queues...');

const writeFileAsync = promisify(writeFile);
const fileQueue = new Queue('thumbnail generation');
const userQueue = new Queue('email sending');

console.log('Queues initialized.');

/**
 * @api {function} generateThumbnail Generate Thumbnail
 * @apiName GenerateThumbnail
 * @apiGroup Worker
 * @apiDescription Generates the thumbnail of an image with a given width size.
 *
 * @apiParam {String} filePath The location of the original file.
 * @apiParam {number} size The width of the thumbnail.
 *
 * @apiSuccess {Promise<void>} Result The thumbnail generation process.
 */
const generateThumbnail = async (filePath, size) => {
  const buffer = await imgThumbnail(filePath, { width: size });
  console.log(`Generating file: ${filePath}, size: ${size}`);
  return writeFileAsync(`${filePath}_${size}`, buffer);
};

/**
 * @api {bull} fileQueue Thumbnail Generation Queue
 * @apiName FileQueue
 * @apiGroup Worker
 * @apiDescription Processes jobs for generating thumbnails of uploaded images.
 *
 * @apiParam {String} fileId The ID of the file to process.
 * @apiParam {String} userId The ID of the user who owns the file.
 */
fileQueue.process(async (job, done) => {
  const fileId = job.data.fileId || null;
  const userId = job.data.userId || null;

  if (!fileId) {
    throw new Error('Missing fileId');
  }
  if (!userId) {
    throw new Error('Missing userId');
  }
  console.log('Processing', job.data.name || '');
  const file = await (await dbClient.filesCollection())
    .findOne({
      _id: new mongoDBCore.BSON.ObjectId(fileId),
      userId: new mongoDBCore.BSON.ObjectId(userId),
    });
  if (!file) {
    throw new Error('File not found');
  }
  const sizes = [500, 250, 100];
  Promise.all(sizes.map((size) => generateThumbnail(file.localPath, size)))
    .then(() => {
      done();
    });
});

/**
 * @api {bull} userQueue Email Sending Queue
 * @apiName UserQueue
 * @apiGroup Worker
 * @apiDescription Processes jobs for sending welcome emails to new users.
 *
 * @apiParam {String} userId The ID of the user to send the email to.
 */
userQueue.process(async (job, done) => {
  console.log(`Processing user job #${job.id}`);
  const userId = job.data.userId || null;

  if (!userId) {
    throw new Error('Missing userId');
  }
  const user = await (await dbClient.usersCollection())
    .findOne({ _id: new mongoDBCore.BSON.ObjectId(userId) });
  if (!user) {
    throw new Error('User not found');
  }
  console.log(`Sending welcome email to ${user.email}`);
  try {
    const mailSubject = 'Welcome to ALX-Files_Manager by deezyfg';
    const mailContent = [
      '<div>',
      '<h3>Hello {{user.name}},</h3>',
      'Welcome to <a href="https://github.com/deezyfg/alx-files_manager">',
      'ALX-Files_Manager</a>, ',
      'a simple file management API built with Node.js by ',
      '<a href="https://github.com/deezyfg">Peter Opoku-Mensah</a>. ',
      'We hope you enjoy your experience with our platform!',
      '</div>',
    ].join('');
    await Mailer.sendMail(Mailer.buildMessage(user.email, mailSubject, mailContent));
    console.log(`Welcome email sent to ${user.email}`);
    done();
  } catch (err) {
    console.error(`Error sending welcome email to ${user.email}:`, err);
    done(err);
  }
});

console.log('Worker setup complete. Waiting for jobs...');
