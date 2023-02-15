import { UsersSchema } from './schemes';
import ValidatorUtil from './util/validator.util';

class UsersValidation {
  static validateSignupArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, UsersSchema.signupSchema, next);
  }

  static validateChatsArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, UsersSchema.chatsSchema, next);
  }
}

export default UsersValidation;
