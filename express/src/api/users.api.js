// NPM Modules
import express from 'express';

// Local Modules
import { UsersController } from '../controller';
import AuthMiddleware from '../auth/auth.middlware';
import { UsersValidationMiddleware } from '../middlewares/validation';

const router = express.Router();

router.get('/chats',
  AuthMiddleware.authenticate(),
  UsersValidationMiddleware.validateChatsArgs,
  UsersController.chats);

export default router;
