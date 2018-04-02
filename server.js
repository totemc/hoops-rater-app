const CONFIG = require('./config.json') // Configuration file to connect to database
const AUTH_CONFIG = require('./auth-config.json')
const {Pool, Client} = require('pg') // Module to connect to postgre instance
const express = require('express'); // Module to allow API routing
var cors = require('cors');
const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: AUTH_CONFIG.issuer,
  assertClaims: {
    aud: 'api://default',
  },
});

// Initialize our express module
const app = express();

// Auth token
function authenticationRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    return res.status(401).end();
  }

  const accessToken = match[1];

  return oktaJwtVerifier.verifyAccessToken(accessToken)
    .then((jwt) => {
      req.jwt = jwt;
      next();
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
}



// Port for our server process
const port = process.env.PORT || 5000;

// Create a one-time-use client when called
function createClient(){
  return client = new Client({
    host:CONFIG.dbHost,
    user:CONFIG.dbUser,
    password: CONFIG.dbPassword,
    database: CONFIG.database,
    port:CONFIG.port
  })
};

// Query the userName from the database when called
function queryUser(client, userName, res){
  // Sending result must be done from within this call since it's async
  let dataObject;
  client.query('SELECT * FROM users WHERE username=\'' + userName+'\'')
      .then(result => {
        // Send our result to the component
        dataObject = result.rows;

        // If the database doesn't return a row, send an error.
        if(dataObject[0] == undefined){
          res.status(404).send({
            message : "User does not exist."
          })
        }

        // Otherwise, send our row
        res.send(dataObject[0]);
      })
      .catch(e => {
        // Throw any errors
        throw e;
      })
      .then(() => {
        // Disconnect the client from the database
        client.end()
        console.log('the client has disconnected!');
      })
}

// API call to pull from the users databasae
app.get('/api/profile/:nameParam', (req, res) => {
  let userName = req.params.nameParam; // Save the username parameter from the url
  let client = createClient(); // Create a client

  // Connect our client to the database
  client.connect()
    .catch(e => console.log('Error occured when trying to connect client to server.'))

  // Send a user row to the component
  queryUser(client, userName, res);
});

// Test route for the backend
app.get('/api/hello', (req, res) => {
  res.send(
    { express: 'The middleware worked! Hello from express.' });
});

// A call to fetch data if a user is logged in, starter code
app.get('/api/messages', authenticationRequired, (req, res) => {
  res.send({
    messages: [
      {
        date:  new Date(),
        text: 'I am a robot.'
      },
      {
        date:  new Date(new Date().getTime() - 1000 * 60 * 60),
        text: 'Hello, world!'
      }
    ]
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
