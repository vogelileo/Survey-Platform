'use strict';
/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('./db/mongoose');
const passport = require('./auth/passport');

const app = express();
const PORT = process.env.PORT || 5000;

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

dotenv.config({
  debug: false,
  path: './env/.env',
});

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

// Security
app.use(helmet());

// Payload limit
app.use(express.json({ limit: '2mb' }));

// Handle CORS (so far allow all origins)
app.use(cors());

//session

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

//Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

//Loggin Requests
app.use(morgan('tiny'));

//Router base APIs
app.use('/api/bubble', require('./routes/api/bubble'));

//Express Server
const server = app.listen(PORT, async () => {
  //Connect to MongoDB
  await mongoose.connect();
  console.log(`Server started on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing app server and connection to MongoDB.');
  server.close();
  mongoose.disconnect();
});

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/

// Export app such that Jest can use it for testing
module.exports = app;
