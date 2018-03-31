const CONFIG = require('./config.json') // Configuration file to connect to database
const {Pool, Client} = require('pg') // Module to connect to postgre instance
const express = require('express'); // Module to allow API routing

// Initialize our express module
const app = express();

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

app.listen(port, () => console.log(`Listening on port ${port}`));
