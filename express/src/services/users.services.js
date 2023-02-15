// Local Modules
import { ChatsModel, UsersModel } from '../models';

export default class UsersServices {
  static chats(userId, search) {
    return Promise.all([
      ChatsModel.listGroupChatByUserId(userId),
      UsersModel.chats(userId, search)
    ]);
  }
}
