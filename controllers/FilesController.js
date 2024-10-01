import fs from 'fs';
import path from 'path';
import mime from 'mime-types';
import Queue from 'bull';
import { ObjectId } from 'mongodb';
import dbClient from '../utils/db';
import FilesCollection from '../utils/files';
import AuthTokenHandler from '../utils/tokens';
import UsersCollection from '../utils/users';
import formatFileDocument from '../utils/format';

const VALID_FILE_TYPES = ['folder', 'file', 'image'];
const ROOT_FOLDER_ID = '0';
const MAX_FILES_PER_PAGE = 20;
const fileQueue = new Queue('thumbnail generation');

class FilesController {
  static async postUpload(req, res) {
    const { user } = req;
    const { name, type, parentId = ROOT_FOLDER_ID, isPublic = false, data } = req.body;

    if (!name) return res.status(400).json({ error: 'Missing name' });
    if (!type || !VALID_FILE_TYPES.includes(type)) return res.status(400).json({ error: 'Missing type' });
    if (type !== 'folder' && !data) return res.status(400).json({ error: 'Missing data' });

    try {
      let _parentId = parentId;
      if (parentId !== ROOT_FOLDER_ID) {
        if (!ObjectId.isValid(parentId)) {
          return res.status(400).json({ error: 'Parent not found' });
        }
        _parentId = new ObjectId(parentId);
        const parentFile = await FilesCollection.getFile({ _id: _parentId, userId: user._id });
        if (!parentFile) {
          return res.status(400).json({ error: 'Parent not found' });
        }
        if (parentFile.type !== 'folder') {
          return res.status(400).json({ error: 'Parent is not a folder' });
        }
      }

      const fileDocument = await FilesCollection.createFile({
        name,
        type,
        parentId: _parentId,
        isPublic,
        userId: user._id,
        data,
      });

      if (type === 'image') {
        fileQueue.add({ fileId: fileDocument._id, userId: user._id });
      }

      res.status(201).json(formatFileDocument(fileDocument));
    } catch (err) {
      console.error(err);
      if (err.message === 'Parent not found' || err.message === 'Parent is not a folder') {
        return res.status(400).json({ error: err.message });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getShow(req, res) {
    const { user } = req;
    const { id } = req.params;
    let _id;
    try {
      _id = new ObjectId(id);
    } catch (err) {
      return res.status(404).json({ error: 'Not found' });
    }

    try {
      const fileDocument = await FilesCollection.getFile({ _id, userId: user._id });
      if (!fileDocument) return res.status(404).json({ error: 'Not found' });

      res.status(200).json(formatFileDocument(fileDocument));
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getIndex(req, res) {
    const { user } = req;
    const { parentId, page = 0 } = req.query;
    let _parentId = parentId === undefined ? ROOT_FOLDER_ID : parentId;
    if (_parentId !== ROOT_FOLDER_ID) {
      if (!ObjectId.isValid(_parentId)) {
        return res.status(200).json([]);
      }
      _parentId = new ObjectId(_parentId);
    }
    const _page = parseInt(page, 10);

    try {
      const fileDocuments = await FilesCollection.getFiles(user._id, _parentId, _page, MAX_FILES_PER_PAGE);
      res.status(200).json(fileDocuments.map(formatFileDocument));
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async putPublish(req, res) {
    const { user } = req;
    const { id } = req.params;
    let _id;
    try {
      _id = new ObjectId(id);
    } catch (err) {
      return res.status(404).json({ error: 'Not found' });
    }

    try {
      const fileDocument = await FilesCollection.updateFile({ _id, userId: user._id }, { $set: { isPublic: true } });
      if (!fileDocument) return res.status(404).json({ error: 'Not found' });

      res.status(200).json(formatFileDocument(fileDocument));
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async putUnpublish(req, res) {
    const { user } = req;
    const { id } = req.params;
    let _id;
    try {
      _id = new ObjectId(id);
    } catch (err) {
      return res.status(404).json({ error: 'Not found' });
    }

    try {
      const fileDocument = await FilesCollection.updateFile({ _id, userId: user._id }, { $set: { isPublic: false } });
      if (!fileDocument) return res.status(404).json({ error: 'Not found' });

      res.status(200).json(formatFileDocument(fileDocument));
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getFile(req, res) {
    const { id } = req.params;
    const { size } = req.query;
    const token = req.headers['x-token'];
    let _id;
    try {
      _id = new ObjectId(id);
    } catch (err) {
      return res.status(404).json({ error: 'Not found' });
    }

    try {
      const user = token ? await AuthTokenHandler.getUserByToken(token) : null;

      const fileDocument = await FilesCollection.getFile({ _id });
      if (!fileDocument) {
        return res.status(404).json({ error: 'Not found' });
      }
      if (!fileDocument.isPublic && (!user || fileDocument.userId.toString() !== user._id.toString())) {
        return res.status(404).json({ error: 'Not found' });
      }

      if (fileDocument.type === 'folder') {
        return res.status(400).json({ error: "A folder doesn't have content" });
      }

      let filePath = fileDocument.localPath;
      if (fileDocument.type === 'image' && size) {
        filePath = `${filePath}_${size}`;
      }

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Not found' });
      }

      res.setHeader('Content-Type', mime.contentType(fileDocument.name) || 'text/plain');
      res.sendFile(filePath);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default FilesController;
