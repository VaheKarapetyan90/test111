// Local Modules
import { ChatsServices } from '../services';
import { SuccessHandlerUtil } from '../utils';
import ClientsManager from '../socket/clients-manager';

export default class ChatsController {
  static async getByUserIds(req, res, next) {
    try {
      const { user_id } = req.params;
      const { user } = res.locals.auth;
      const io = req.app.get('io');

      const chat = await ChatsServices.getByUserIds(user.id, user_id, io);
      const userStatus = ClientsManager.getUser(user_id);
      SuccessHandlerUtil.handleAdd(res, next, { user_id, userStatus, chat: chat || {} });
    } catch (error) {
      next(error);
    }
  }
}
