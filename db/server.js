// De-comment these lines once routing development begins.
//const express = require('express')
//const app = express()
const {Pool, Client} = require('pg')
//let format = require('pg-format')



const client = new Client({
	host:'temp',
	user: 'temp',
	password: 'temp',
	database: 'temp',
	port:5432
})

client.connect()
  .then(() => console.log('connected'))
  .catch(e => console.error('connection error', err.stack))


client.query('SELECT * FROM users')
  .then(result => console.log(result))
  .catch(e => console.error(e.stack))
  .then(() => client.end())

