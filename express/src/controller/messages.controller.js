// Local Modules
import { MessagesServices } from '../services';
import { SuccessHandlerUtil } from '../utils';

export default class ChatsController {
  static async getAllMessages(req, res, next) {
    try {
      const { chatId } = req.params;
      const { limit, offset } = req.query;
      const chat = await MessagesServices.getAllMessages(chatId, limit, offset);
      SuccessHandlerUtil.handleGet(res, next, chat);
    } catch (error) {
      next(error);
    }
  }
}
