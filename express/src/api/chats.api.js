// NPM Modules
import express from 'express';

// Local Modules
import { ChatsValidationMiddleware } from '../middlewares/validation';
import { ChatsController } from '../controller';
import AuthMiddleware from '../auth/auth.middlware';

const router = express.Router();

router.get('/:user_id',
  AuthMiddleware.authenticate(),
  ChatsValidationMiddleware.validateGetByUserIdArgs,
  ChatsController.getByUserIds);

export default router;
