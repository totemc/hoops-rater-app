// De-comment these lines once routing development begins.
//const express = require('express')
//const app = express()
/*const {Pool, Client} = require('pg')
const CONFIG = require('./config.json')
//let format = require('pg-format')

const client = new Client({
	host:CONFIG.dbHost,
	user:CONFIG.dbUser,
	password: CONFIG.dbPassword,
	database: CONFIG.database,
	port:CONFIG.port
})
*/
/*client.connect()
  .then(() => console.log('connected'))
  .catch(e => console.error('connection error', err.stack))


client.query('SELECT * FROM users')
  .then(result => console.log(result))
  .catch(e => console.error(e.stack))
  .then(() => client.end())
  */

const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));