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

  // Send a user row to the component
  client.query('SELECT * FROM users WHERE username = \'' + userName +'\'')
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
        console.log(dataObject[0]);
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


app.get('/api/court/:id', (req, res) => {
  console.log("sending the queries to the component.")
  console.log(req.params.id);

  let courtId = req.params.id;  // Save court_id parameter
  let client = createClient();  // Create a client

  // Connect our client to the database
  client.connect()
    .then(() => {
      console.log('connected')
    })
    .catch(e => console.log('error happened!'))

  // Prepare our query object
  let dataObject; 

  // Query court's details
  client.query('SELECT * FROM court, amenities, floor_quality, hoop_quality \
                WHERE court_id = amen_court_id \
                AND court_id = floor_court_id \
                AND court_id = hoop_court_id \
                AND court_id = \'' + courtId + '\'')
      .then(result => {
        dataObject = result.rows
        //console.log(dataObject[0]); 
      })
      .catch(e => {
        throw e
      })

  // Query average of court's ratings, appends to dataObject[0]
  client.query('SELECT ROUND(AVG(stars), 1) AS avg_stars FROM rating, court \
                WHERE court_id = r_court_id \
                AND r_court_id = \'' + courtId +'\'')
      .then(result => {
        //console.log(result.rows[0]); // Query result= { avg_star : '4.5' } dictionary
        //console.log(result.rows[0].avg_stars); // 4.5 , value of avg_star

        // Appends query results for avg stars to dataObject
        dataObject[0].avg_stars = result.rows[0].avg_stars 

        //console.log(dataObject[0]); // dataObject now contains new query in dict

        // Sends query object
        //res.send(dataObject[0])
      })
      .catch(e => {
        throw e
      })

  // Query court's comments
  client.query('SELECT * FROM comments WHERE comment_court_id=\'' + courtId +'\'')
      .then(result => {

        for (i = 0; i < result.rows.length; i++) {
          dataObject[i+1] = result.rows[i]
        }
        res.send(dataObject)
        console.log(dataObject);

      })
      .catch(e => {
        throw e
      })
      .then(() => {
        client.end()
      })

/*
  // For visited: Gets bool of visited status for current user
  client.query('SELECT * FROM visited WHERE visited_court_id=\'' + courtId +'\'')
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
*/
  
  
  //res.send(dataObject)
})


app.listen(port, () => console.log(`Listening on port ${port}`));
