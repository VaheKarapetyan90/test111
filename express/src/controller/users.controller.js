// Local Modules
import { UsersServices } from '../services';
import { SuccessHandlerUtil } from '../utils';
import ClientsManager from '../socket/clients-manager';

export default class UsersController {
  static async chats(req, res, next) {
    try {
      const { user } = res.locals.auth;
      const { search } = req.query;
      const [groupChats, usersAndChats] = await UsersServices.chats(user.id, search);
      const activeUserIds = [...ClientsManager.getIds()];

      SuccessHandlerUtil.handleList(res, next, { groupChats, usersAndChats, activeUserIds });
    } catch (error) {
      next(error);
    }
  }
}
