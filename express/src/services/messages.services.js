// Local Modules
import { MessagesModel } from '../models';

export default class MessagesServices {
  static getAllMessages(chatId, limit, offset) {
    return MessagesModel.getAllMessagesByChatId(chatId, limit, offset);
  }
}
