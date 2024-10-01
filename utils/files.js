import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'mongodb';
import dbClient from './db';

const FOLDER_PATH = process.env.FOLDER_PATH || '/tmp/files_manager';
const ROOT_FOLDER_ID = '0';

class FilesCollection {
  static async createFile(fileData) {
    const { name, type, parentId, isPublic, userId, data } = fileData;

    const newFile = {
      userId: new ObjectId(userId),
      name,
      type,
      isPublic,
      parentId: parentId === ROOT_FOLDER_ID ? ROOT_FOLDER_ID : new ObjectId(parentId),
    };

    if (parentId !== ROOT_FOLDER_ID) {
      const parentFile = await this.getFile({ _id: new ObjectId(parentId), userId: new ObjectId(userId) });
      if (!parentFile) throw new Error('Parent not found');
      if (parentFile.type !== 'folder') throw new Error('Parent is not a folder');
    }

    if (type !== 'folder') {
      const localPath = `${FOLDER_PATH}/${uuidv4()}`;
      await fs.promises.mkdir(path.dirname(localPath), { recursive: true });
      await fs.promises.writeFile(localPath, Buffer.from(data, 'base64'));
      newFile.localPath = localPath;
    }

    const collection = await dbClient.filesCollection();
    const result = await collection.insertOne(newFile);
    return { _id: result.insertedId, ...newFile };
  }

  static async getFile(query) {
    const collection = await dbClient.filesCollection();
    return collection.findOne(query);
  }

  static async getFiles(userId, parentId, page, pageSize) {
    const collection = await dbClient.filesCollection();
    const query = { userId: new ObjectId(userId) };
    if (parentId !== ROOT_FOLDER_ID) {
      query.parentId = new ObjectId(parentId);
    } else {
      query.parentId = ROOT_FOLDER_ID;
    }
    return collection.find(query)
      .skip(page * pageSize)
      .limit(pageSize)
      .toArray();
  }

  static async updateFile(query, update) {
    const collection = await dbClient.filesCollection();
    const result = await collection.findOneAndUpdate(query, update, { returnDocument: 'after' });
    return result.value;
  }
}

export default FilesCollection;
