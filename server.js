// Configuration file to connect to database
const CONFIG = require('./config.json')
// Module to connect to postgre instance
const {Pool, Client} = require('pg')
// Module to allow API routing
const express = require('express');
//let format = require('pg-format')

// Initialize our express module
const app = express();

// Port for our server process
const port = process.env.PORT || 5000;




// client.query('SELECT * FROM users')
//   .then(result => console.log(result))
//   .catch(e => console.error(e.stack))
//   .then(() => client.end())
  


// Test route for the backend
app.get('/api/hello', (req, res) => {
  res.send(
    { express: 'The middleware worked! Hello from express.' });
});

// API call to pull from the users databasae
app.get('/api/profile/:nameParam', (req, res) => {
  console.log("sending the query to the component.")
  // Connect to the database with the client
  console.log(req.params.nameParam);
  let userName = req.params.nameParam;
  // Create a client
  const client = new Client({
    host:CONFIG.dbHost,
    user:CONFIG.dbUser,
    password: CONFIG.dbPassword,
    database: CONFIG.database,
    port:CONFIG.port
  })
  client.connect()
    .then(() => {
      console.log('connected')

    })
    .catch(e => console.log('error happened!'))

  // Prepare our query object
  let dataObject;

  // Send a user row to the component
  client.query('SELECT * FROM users WHERE username=\'' + userName+'\'')
      .then(result => {
        dataObject = result
        res.send(dataObject.rows[0])
      })
      .catch(e => {
        throw e
      })
      .then(() => {
        console.log('the client has disconnected!')
        client.end()
      })

  //res.send(dataObject)
});

app.listen(port, () => console.log(`Listening on port ${port}`));
