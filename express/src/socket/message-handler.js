// NPM Modules
import _ from 'lodash';
import fs from 'fs';

// Local Modules
import ClientsManager from './clients-manager';
import Event from './events';
import PSQLStorage from '../storage/psql.storage';
import { LoggerUtil } from '../utils';
import { ChatsModel, MessagesModel } from '../models';
import Validation from './validation/index';

class MessageHandler {
  /**
   * @param {Object} client
   * @description registers given client and inits event handlers
   */
  static postAuthenticate(client) {
    ClientsManager.registerClient(client);

    client.on(
      Event.GetChatAllMessage,
      MessageHandler.handleGetChatAllMessage(client)
    );

    client.on(
      Event.SEND_PRIVATE_MESSAGE,
      MessageHandler.handleSendPrivateMessage(client)
    );

    client.on(
      Event.SEND_PRIVATE_FILE,
      MessageHandler.handleSendPrivateFile(client)
    );

    client.on(
      Event.RECEIVE_PRIVATE_MESSAGE,
      MessageHandler.handleReceivePrivateMessage(client)
    );

    client.on(
      Event.TYPING,
      MessageHandler.handleTyping(client)
    );

    client.on(
      Event.STOP_TYPING,
      MessageHandler.handleStopTyping(client)
    );

    client.on(
      Event.ANSWERCHATREQUEST,
      MessageHandler.handleChatRequest(client)
    );

    client.on(
      Event.DISCONNECT,
      ClientsManager.disconnectClient(client)
    );
  }

  /**
   * @param {object} client
   * @description forward all messages by current user to loged user
   */
  static handleGetChatAllMessage(client) {
    return async (id) => {
      const loginUserId = ClientsManager.getId(client);
      const chat = await ChatsModel.getPrivateChatAndMsgsByUserIds(loginUserId, id);
      client.emit(Event.GetChatAllMessage, chat?.messages);
    };
  }

  /**
   * @param {object} client
   * @description forward the private message to the right recipient
   * (and to other tabs of the sender)
   */
  static handleSendPrivateMessage(client) {
    return async (data) => {
      if (Validation.ValidatePrivateMessageArgs(data)) {
        const { content, to } = data;
        MessageHandler.handle(client, { content }, to, Event.SEND_PRIVATE_MESSAGE);
      } else {
        LoggerUtil.warn('Unkown notification schema!');
      }
    };
  }

  /**
   * @param {object} client
   * @description forward the private file to the right recipient
   * (and to other tabs of the sender)
   */
  static handleSendPrivateFile(client) {
    return async (data, callback) => {
      const { content, to } = data;
      MessageHandler.handle(client, { file: content.name }, to, Event.SEND_PRIVATE_FILE);

      // save the content to the disk
      fs.writeFile(`/app/upload/${data.content.name}`, content.originFileObj, (err) => {
        callback({ message: err ? 'failure' : 'success' });
      });
    };
  }

  /**
   * @param {object} client
   * @description recipient has seen private message
   */
  static handleReceivePrivateMessage(client) {
    return async (data) => {
      try {
        const {
          sender_id, receiver_id, msg_id, status, chat_id
        } = data;

        if (msg_id) {
          await MessagesModel.updateStatusById(msg_id, status);
        } else if (chat_id) {
          await MessagesModel.updateStatusByChatId(chat_id, status, sender_id);
        } else {
          console.log('error');
          return;
        }

        client.to(sender_id).emit(Event.RECEIVE_PRIVATE_MESSAGE, { receiver_id, status });
      } catch (error) {
        console.log(error);
      }
    };
  }

  /**
   * @param {object} client
   * @description handle user typeing
   */
  static handleTyping(client) {
    return (room) => {
      const sender_id = ClientsManager.getId(client);

      client.to(room).emit(Event.TYPING, { sender_id, typing: true });
    };
  }

  /**
   * @param {object} client
   * @description handle user stop typeing
   */
  static handleStopTyping(client) {
    return (room) => {
      const sender_id = ClientsManager.getId(client);

      client.to(room).emit(Event.STOP_TYPING, { sender_id, typing: false });
    };
  }

  /**
   * @param {object} client
   * @description handle send message or file
   */
  static async handle(client, body, to, event) {
    const sender_id = ClientsManager.getId(client);
    const privateChat = await ChatsModel.getPrivateChat(sender_id, to);
    let chat_id = privateChat?.id;

    try {
      const transaction = await PSQLStorage.knex.transaction();
      if (_.isEmpty(privateChat)) {
        const { id } = await ChatsModel.createPrivate(transaction, sender_id, to);
        chat_id = id;
      }
      let status = 'sent';
      if (ClientsManager.hasUser(to)) {
        status = 'received';
      }
      const message = await MessagesModel
        .add(transaction, {
          sender_id, chat_id, status, ...body
        });

      await ChatsModel.update(
        transaction, chat_id, message.id, message.content, message.file, message.created_at
      );
      await transaction.commit();

      client.to(to).to(sender_id)
        .emit(event, {
          msg_id: message.id, created_at: message.created_at, ...body, sender_id
        });

      client.to(to).to(sender_id)
        .emit(Event.SEND_Notification, {
          msg_id: message.id, ...body, sender_id, first: privateChat == null
        });
    } catch (err) {
      LoggerUtil.warn(err);
    }
  }

  /**
   * @param {object} client
   * @description handle user chat resquest
   */
  static handleChatRequest(client) {
    return async (payload) => {
      const { from, status, to } = payload;
      const [chat] = await ChatsModel.updateStatus(from, to, status);

      client.to(to).emit(Event.ANSWERCHATREQUEST, {
        from,
        to,
        chat: {
          chat_id: chat.id,
          chat_status: chat.status,
          chat_created_at: chat.created_at
        }
      });
    };
  }
}

export default MessageHandler;
