import { ChatsSchema } from './schemes';
import ValidatorUtil from './util/validator.util';

class ChatsValidation {
  static validateGetByUserIdArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, ChatsSchema.getByUserIdSchema, next);
  }
}

export default ChatsValidation;
