// NPM Modules
import { Model } from 'objection';

// Local Modules
import ChatType from '../enum/chat-type.enum';
import chatStatus from '../enum/chat-status.enum';
import PSQLStorage from '../storage/psql.storage';
import MessagesModel from './messages.model';

class ChatsModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'chats'; }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['type', 'members'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        type: { type: 'string', enum: Object.values(ChatType) },
        // for group chat it is creater,for private chat it is first message sender
        group_admin_id: { type: 'integer' },
        members: { type: 'array' },
        lt_msg_id: { type: 'integer' },
        lt_msg_content: { type: 'string', maxLength: 255 },
        lt_msg_file: { type: 'string', maxLength: 255 },
        status: { type: 'string', enum: Object.values(chatStatus) }
      }

    };
  }

  static get jsonAttributes() {
    return [];
  }

  static get relationMappings() {
    return {
      messages: {
        relation: Model.HasManyRelation,
        modelClass: MessagesModel,
        join: {
          from: 'chats.id',
          to: 'messages.chat_id'
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

  // Methods

  static getPrivateChat(user1, user2) {
    const { knex } = PSQLStorage;
    return ChatsModel.query()
      .where('chats.type', '=', 'private')
      .where('chats.members', '<@',
        knex.raw(`ARRAY[${user1}, ${user2}]`))
      .first();
  }

  static createPrivate(trx, from, to) {
    return ChatsModel.query(trx)
      .insert({
        type: 'private',
        members: [`${from}`, `${to}`],
        group_admin_id: from
      });
  }

  static listGroupChatByUserId(user_id) {
    const { knex } = PSQLStorage;
    return ChatsModel.query()
      .select(
        knex.raw('DISTINCT chats.id AS chat_id'),
        'chats.name AS chat_name',
        'chats.type AS chat_type',
        'chats.created_at AS chat_created_at',
        'messages.content AS latest_message'
      )
      .leftJoin('messages', 'messages.id', 'chats.lt_msg_id')
      .innerJoin('users', 'users.id', knex.raw('any(chats.members)'))
      .where('chats.type', '=', 'group')
      .where(user_id, '=', knex.raw('any(chats.members)'));
  }

  static update(trx, id, lt_msg_id, lt_msg_content, lt_msg_file, lt_msg_created_at) {
    return ChatsModel.query(trx)
      .patch({
        lt_msg_id,
        lt_msg_content: lt_msg_content || '',
        lt_msg_file: lt_msg_file || '',
        lt_msg_created_at
      })
      .where('id', '=', id);
  }

  static updateStatus(login_user_id, curr_user_id, status) {
    const { knex } = PSQLStorage;
    return ChatsModel.query()
      .patch({ status })
      .where('chats.members', '<@',
        knex.raw(`ARRAY[${login_user_id}, ${curr_user_id}]`))
      .where(knex.raw('chats.type = ? ', 'private'))
      .returning('*');
  }

  static getPrivateChatAndMsgsByUserIds(login_user_id, curr_user_id, limit = 20, offset = 0) {
    const { knex } = PSQLStorage;

    return ChatsModel.query()
      .select(
        'chats.id AS chat_id',
        'chats.status AS chat_status',
        'chats.created_at AS chat_created_at'
      )
      .withGraphFetched('messages')
      .modifyGraph('messages', (m) => {
        m.orderBy('created_at', 'DESC');
        m.limit(limit);
        m.offset(offset);
      })
      .where('chats.members', '<@',
        knex.raw(`ARRAY[${login_user_id}, ${curr_user_id}]`))
      .where(knex.raw('chats.type = ? ', 'private'))
      .first();
  }

  static getPrivateChatByUserIds(login_user_id, curr_user_id) {
    const { knex } = PSQLStorage;

    return ChatsModel.query()
      .select(
        'chats.id AS chat_id',
        'chats.status AS chat_status',
        'chats.created_at AS chat_created_at'
      )
      .where('chats.members', '<@',
        knex.raw(`ARRAY[${login_user_id}, ${curr_user_id}]`))
      .where(knex.raw('chats.type = ? ', 'private'))
      .first();
  }
}

export default ChatsModel;
