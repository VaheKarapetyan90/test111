// NPM Modules
import knex from 'knex';
import knexConfigs from '../knex.configs';

// Local Modules
import { LoggerUtil } from '../src/utils';

function up(pg) {
  return pg.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').unique().notNullable();
      table.string('phone');
      table.string('position');
      table.string('department');
      table.string('password').notNullable();
      table.string('picture').notNullable()
        .defaultTo(
          'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
        );
      table.dateTime('created_at');
      table.dateTime('updated_at');
      table.enum('status', ['active', 'passive']).defaultTo('active');
    })
    .createTable('chats', (table) => {
      table.increments('id').primary();
      table.string('name', 255);
      table.enum('type', ['private', 'group']).notNullable().defaultTo('private');
      table.dateTime('created_at');
      table.dateTime('updated_at');
      table.integer('group_admin_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .index();
      table.enum('status', ['accepted', 'declined', 'not-selected'])
        .notNullable().defaultTo('not-selected');
      table.integer('lt_msg_id')
        .unsigned();
      table.string('lt_msg_content', 255);
      table.string('lt_msg_file', 255);
      table.dateTime('lt_msg_created_at');
      table.specificType('members', 'integer[]');
    })

    .createTable('messages', (table) => {
      table.increments('id').primary();
      table.string('content');
      table.string('file');
      table.integer('sender_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .index();
      table.integer('chat_id')
        .unsigned()
        .references('id')
        .inTable('chats')
        .index();
      table.dateTime('created_at');
      table.dateTime('updated_at');
      table.enum('status', ['sent', 'received', 'seen'])
        .notNullable().defaultTo('sent');
    });
}

async function init() {
  try {
    const options = process.env.NODE_ENV === 'production'
      ? knexConfigs.production
      : knexConfigs.development;
    const pg = knex(options);
    await up(pg);
    console.log('Successfully created all tables ... ');
  } catch (error) {
    LoggerUtil.error(error.message);
  }
}

init();
