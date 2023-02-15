// NPM Modules
import express from 'express';

// Local Modules
import { MessagesValidationMiddleware } from '../middlewares/validation';
import { MessagesController } from '../controller';
import AuthMiddleware from '../auth/auth.middlware';

const router = express.Router();

router.get('/:chatId',
  AuthMiddleware.authenticate(),
  MessagesValidationMiddleware.validateGetAllMessagesArgs,
  MessagesController.getAllMessages);
export default router;
