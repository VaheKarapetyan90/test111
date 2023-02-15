// NPM Modules
import knex from 'knex';
import knexConfigs from '../knex.configs';

// Local Modules
import { LoggerUtil } from '../src/utils';

// function alter(pg) {
//   return pg.schema.alterTable('chats', (table) => {
//     table.integer('latest_message')
//       .unsigned()
//       .references('id')
//       .inTable('messages')
//       .index();
//   });
// }

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
    })
    .createTable('chat_members', (table) => {
      table.increments('id').primary();
      table.integer('chat_id')
        .unsigned()
        .references('id')
        .inTable('chats')
        .index();
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .index();
      table.unique(['chat_id', 'user_id']);
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
    });
}

async function init() {
  try {
    const options = process.env.NODE_ENV === 'production'
      ? knexConfigs.production
      : knexConfigs.development;
    const pg = knex(options);
    await up(pg);
    // await alter(pg);
    console.log('Successfully created all tables ... ');
  } catch (error) {
    LoggerUtil.error(error.message);
  }
}

init();
