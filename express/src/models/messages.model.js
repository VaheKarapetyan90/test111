// NPM Modules
import { Model } from 'objection';

// Local Modules
import UsersModel from './users.model';
import MessageStatus from '../enum/message-status.enum';

class MessagesModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'messages'; }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['sender_id', 'chat_id'],
      properties: {
        id: { type: 'integer' },
        content: { type: 'string', maxLength: 255 },
        file: { type: 'string', maxLength: 100 },
        sender_id: { type: 'integer' },
        chat_id: { type: 'integer' },
        status: { type: 'string', enum: Object.values(MessageStatus) }
      }
    };
  }

  static get relationMappings() {
    return {
      sender: {
        relation: Model.BelongsToOneRelation,
        modelClass: UsersModel,
        join: {
          from: 'messages.sender_id',
          to: 'users.id'
        }
      }
    };
  }

  $beforeInsert() {
    const date = new Date();
    this.created_at = date;
  }

  $beforeUpdate() {
    const date = new Date();
    this.updated_at = date;
  }

  static add(trx, payload) {
    return MessagesModel.query(trx).insert(payload);
  }

  static updateStatusByChatId(chat_id, status, sender_id) {
    const updatedQuery = MessagesModel.query()
      .patch({ status })
      .where('chat_id', '=', chat_id)
      .where('sender_id', '<>', sender_id);
    if (status === 'seen') {
      updatedQuery.where('status', '<>', 'seen');
    } else if (status === 'received') {
      updatedQuery.where('status', '=', 'sent');
    }

    return updatedQuery;
  }

  static updateStatusById(id, status) {
    return MessagesModel.query().patch({ status }).where('id', '=', id);
  }

  static getAllMessagesByChatId(chatId, limit, offset) {
    return MessagesModel.query()
      .select('*')
      .where('chat_id', '=', chatId)
      .orderBy('created_at', 'DESC')
      .limit(limit)
      .offset(offset);
  }

  static getMsgById(id) {
    return MessagesModel.query().findById(id).returning('*');
  }
}

export default MessagesModel;
