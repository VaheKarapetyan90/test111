// NPM Modules
import { Model } from 'objection';

// Local Modules
import SearchBuilder from './builder/search.builder';
import Status from '../enum/status.enum';
import PSQLStorage from '../storage/psql.storage';

class UsersModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'users'; }

  static get QueryBuilder() { return SearchBuilder; }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 10, maxLength: 255 },
        phone: { type: 'string', minLength: 1, maxLength: 255 },
        position: { type: 'string', minLength: 1, maxLength: 255 },
        department: { type: 'string', minLength: 1, maxLength: 255 },
        picture: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 8, maxLength: 255 },
        status: { type: 'string', enum: Object.values(Status) }
      }
    };
  }

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.password;
    return json;
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
  static getOneOrFail(id) {
    return UsersModel.query().findById(id).throwIfNotFound();
  }

  static create(payload) {
    return UsersModel.query().insert(payload);
  }

  static findByEmail(email) {
    return UsersModel.query().findOne({ email });
  }

  static chats(userId, search) {
    const { knex } = PSQLStorage;

    const filter = (qb) => {
      if (search) {
        qb.whereILike('users.name', search);
      }
    };

    const usersAndChats = UsersModel.query()
      .select('users.id AS id',
        'users.name AS user_name',
        'users.position AS user_position',
        'users.department AS user_department',
        'users.picture AS user_picture',
        'chats.id AS chat_id',
        'chats.type AS chat_type',
        'chats.created_at AS chat_created_at',
        'chats.lt_msg_content AS latest_message',
        'chats.lt_msg_file',
        knex.raw('COUNT(messages.id) AS notification'))
      .leftJoin('chats', (chat) => {
        chat.on('chats.members', '<@', knex.raw(`ARRAY[${userId}, users.id]`))
          .andOn(knex.raw('chats.type = ? ', 'private'));
      })
      .leftJoin('messages', (message) => {
        message.on('messages.chat_id', 'chats.id')
          .andOn(knex.raw('messages.sender_id <> ? ', userId))
          .andOn(knex.raw('messages.status <> ? ', 'seen'));
      })
      .where('users.id', '<>', userId);

    if (search) usersAndChats.where(filter);

    usersAndChats.groupBy('users.id',
      'users.name',
      'users.position',
      'users.department',
      'users.picture',
      'chats.id',
      'chats.type',
      'chats.created_at',
      'chats.lt_msg_content',
      'chats.lt_msg_file',
      'chats.lt_msg_created_at')
      .orderBy('chats.lt_msg_created_at', 'ASC');

    return usersAndChats;
  }
}

export default UsersModel;
