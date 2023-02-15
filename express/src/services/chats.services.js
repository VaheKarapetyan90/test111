// Local Modules
import { ChatsModel, MessagesModel } from '../models';
import Event from '../socket/events';

export default class ChatsServices {
  static async getByUserIds(login_user_id, curr_user_id, client) {
    try {
      const chat = await ChatsModel.getPrivateChatByUserIds(login_user_id, curr_user_id);
      if (chat?.chat_id) {
        const updatedMsgCount = await MessagesModel
          .updateStatusByChatId(chat.chat_id, 'seen', login_user_id);

        if (updatedMsgCount > 0) {
          client.to(curr_user_id).emit(Event.RECEIVE_PRIVATE_MESSAGE, {
            receiver_id: login_user_id,
            status: 'seen'
          });
        }
      }
      return chat;
    } catch (error) {
      return error;
    }
  }
}
