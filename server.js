// De-comment these lines once routing development begins.
//const express = require('express')
//const app = express()
const {Pool, Client} = require('pg')
const CONFIG = require('./config.json')
const express = require('express');
//let format = require('pg-format')
const app = express();

const port = process.env.PORT || 5000;

const client = new Client({
	host:CONFIG.dbHost,
	user:CONFIG.dbUser,
	password: CONFIG.dbPassword,
	database: CONFIG.database,
	port:CONFIG.port
})


// client.query('SELECT * FROM users')
//   .then(result => console.log(result))
//   .catch(e => console.error(e.stack))
//   .then(() => client.end())
  



app.get('/api/hello', (req, res) => {
  res.send(
    { express: 'Hello From Express' });
});

app.get('/api/profile', (req, res) => {
  console.log("sending the query to the component.")
  // Connect to the database with the client

  client.connect()
    .then(() => {
      console.log('connected')

    })
    .catch(e => console.log('error happened!'))

  // Prepare our query object
  let dataObject;

  // Send a user row to the component
  client.query('SELECT * FROM users')
      .then(result => {
        dataObject = result
        res.send(dataObject.rows[0])
      })
      .catch(e => {
        throw e
      })
      .then(() => {
        client.end()
      })

  //res.send(dataObject)
});

app.listen(port, () => console.log(`Listening on port ${port}`));
