// NPM modules
import Joi from 'joi';
import { ID, limit, offset } from './type';

const MessageSchema = {

  getAllMessagesSchema: {
    params: Joi.object({ chatId: ID.required() }),
    query: Joi.object({
      limit,
      offset
    })
  }
};

export default MessageSchema;
