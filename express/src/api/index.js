import express from 'express';

import auth from './auth.api';
import users from './users.api';
import chats from './chats.api';
import messages from './messages.api';

const app = express();

// API
app.use('/auth', auth);
app.use('/users', users);
app.use('/chats', chats);
app.use('/messages', messages);

export default app;
