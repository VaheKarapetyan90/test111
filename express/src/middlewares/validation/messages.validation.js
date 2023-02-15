import { MessagesSchema } from './schemes';
import ValidatorUtil from './util/validator.util';

class MessagesValidation {
  static validateGetAllMessagesArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, MessagesSchema.getAllMessagesSchema, next);
  }
}

export default MessagesValidation;
