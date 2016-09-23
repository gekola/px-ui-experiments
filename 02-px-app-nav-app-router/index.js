const express = require('express');
const session = require('express-session');
const auth = require('./routes/auth');

const app = express();
app.use(session({secret: 'ABCDEF12345'}));
app.use('/', auth);

module.exports = app;
