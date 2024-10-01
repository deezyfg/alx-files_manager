// eslint-disable-next-line no-unused-vars
import { Express } from 'express';
import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UsersController';
import FilesController from '../controllers/FilesController';
import { basicAuthenticate, xTokenAuthenticate } from '../middlewares/auth';
import { APIError, errorResponse } from '../middlewares/error';

/**
 * Injects routes with their handlers to the given Express application.
 * @param {Express} api
 */
const injectRoutes = (api) => {
  /**
   * @api {get} /status Get API status
   * @apiName GetStatus
   * @apiGroup App
   */
  api.get('/status', AppController.getStatus);

  /**
   * @api {get} /stats Get API stats
   * @apiName GetStats
   * @apiGroup App
   */
  api.get('/stats', AppController.getStats);

  /**
   * @api {get} /connect Authenticate user
   * @apiName GetConnect
   * @apiGroup Auth
   */
  api.get('/connect', basicAuthenticate, AuthController.getConnect);

  /**
   * @api {get} /disconnect Disconnect user
   * @apiName GetDisconnect
   * @apiGroup Auth
   */
  api.get('/disconnect', xTokenAuthenticate, AuthController.getDisconnect);

  /**
   * @api {post} /users Create a new user
   * @apiName PostNew
   * @apiGroup Users
   */
  api.post('/users', UsersController.postNew);

  /**
   * @api {get} /users/me Get current user
   * @apiName GetMe
   * @apiGroup Users
   */
  api.get('/users/me', xTokenAuthenticate, UsersController.getMe);

  /**
   * @api {post} /files Upload a file
   * @apiName PostUpload
   * @apiGroup Files
   */
  api.post('/files', xTokenAuthenticate, FilesController.postUpload);

  /**
   * @api {get} /files/:id Get file information
   * @apiName GetShow
   * @apiGroup Files
   */
  api.get('/files/:id', xTokenAuthenticate, FilesController.getShow);

  /**
   * @api {get} /files Get user files
   * @apiName GetIndex
   * @apiGroup Files
   */
  api.get('/files', xTokenAuthenticate, FilesController.getIndex);

  /**
   * @api {put} /files/:id/publish Publish a file
   * @apiName PutPublish
   * @apiGroup Files
   */
  api.put('/files/:id/publish', xTokenAuthenticate, FilesController.putPublish);

  /**
   * @api {put} /files/:id/unpublish Unpublish a file
   * @apiName PutUnpublish
   * @apiGroup Files
   */
  api.put('/files/:id/unpublish', xTokenAuthenticate, FilesController.putUnpublish);

  /**
   * @api {get} /files/:id/data Get file content
   * @apiName GetFile
   * @apiGroup Files
   */
  api.get('/files/:id/data', FilesController.getFile);

  api.all('*', (req, res, next) => {
    errorResponse(new APIError(404, `Cannot ${req.method} ${req.url}`), req, res, next);
  });
  api.use(errorResponse);
};

export default injectRoutes
