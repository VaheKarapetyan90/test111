// NPM modules
import Joi from 'joi';
import { ID } from './type';

const ChatsSchema = {
  getByUserIdSchema: {
    params: Joi.object({
      user_id: ID.required()
    })
  }

};

export default ChatsSchema;
