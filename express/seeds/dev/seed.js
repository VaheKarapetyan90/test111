import bCrypt from 'bcryptjs';
// NPM Modules
import knex from 'knex';
import knexConfigs from '../../knex.configs';
import config from '../../src/config/variables.config';

const { USER_PASSORD } = config;

async function seed(pg) {
  // Deletes ALL existing entries
  await pg('messages').truncate();
  // Deletes ALL existing entries with cascade.
  await pg.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
  await pg.raw('TRUNCATE TABLE chats RESTART IDENTITY CASCADE');

  // Inserts seed entries

  await pg('users').insert([
    {
      name: 'Admin',
      email: 'admin@gmail.com',
      phone: '+374999999',
      position: 'backend developer',
      department: 'sensei',
      password: bCrypt.hashSync(USER_PASSORD, bCrypt.genSaltSync(10), null),
      picture:'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'active'
    },
    {
      name: 'Nick',
      email: 'nick@gmail.com',
      phone: '+100555333',
      position: 'backend developer',
      department: 'google',
      password: bCrypt.hashSync(USER_PASSORD, bCrypt.genSaltSync(10), null),
      picture: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'active'
    },
    {
      name: 'Jesi',
      email: 'jesi@gmail.com',
      phone: '+374777999',
      position: 'frontend developer',
      department: 'facebook',
      password: bCrypt.hashSync(USER_PASSORD, bCrypt.genSaltSync(10), null),
      picture: 'https://img.freepik.com/premium-photo/lonely-girl-waiting-love-park_123211-535.jpg?w=740',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'active'
    },
    {
      name: 'Jenifer',
      email: 'jenifer@gmail.com',
      phone: '+374993333',
      position: 'frontend developer',
      department: 'hollywood',
      password: bCrypt.hashSync(USER_PASSORD, bCrypt.genSaltSync(10), null),
      picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'active'
    },
    {
      name: 'Erik',
      email: 'erik@gmail.com',
      phone: '+374993343',
      position: 'frontend developer',
      department: 'hollywood',
      password: bCrypt.hashSync(USER_PASSORD, bCrypt.genSaltSync(10), null),
      picture: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'active'
    },
    {
      name: 'Akash',
      email: 'akash@gmail.com',
      phone: '+374993343',
      position: 'QA',
      department: 'sensei',
      password: bCrypt.hashSync(USER_PASSORD, bCrypt.genSaltSync(10), null),
      picture: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'active'
    },
    {
      name: 'Nitish',
      email: 'nitish@gmail.com',
      phone: '+374993343',
      position: 'UI/UX',
      department: 'sensei',
      password: bCrypt.hashSync(USER_PASSORD, bCrypt.genSaltSync(10), null),
      picture: 'https://images.unsplash.com/photo-1621592484082-2d05b1290d7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'active'
    }
  ]);
}

async function init() {
  try {
    const options = process.env.NODE_ENV === 'production'
      ? knexConfigs.production
      : knexConfigs.development;
    const pg = knex(options);
    await seed(pg);
    console.log('Successfully inserted all data ... ');
  } catch (error) {
    console.error(error.message);
  }
}

init();
