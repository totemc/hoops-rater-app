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

// Query the courtName when called
function queryCourtName(client, courtName, res){
    let courtObject;

    client.query('SELECT * FROM court WHERE court_name=\'' + courtName + '\'')
        .then(result => {
        // Send our results to the component
        courtObject = result.rows;
        
        // If the database doesn't return a row, send and error.
        if(courtObject[0] == undefined){
            res.status(404).send({
                message: "Court does not exist."
            })
        }
        res.send(courtObject);
    })
    .catch(e => {
        // Throws any errows
        throw e;
    })
    .then(() => {
        client.end()
        console.log('the client has disconnected!');
    })
}

function queryAdvSearch(client, attributeMap, res) {
  let dataObject;

  // Zipcode attribute, should always exist for adv search
  let zipcode = attributeList['court_zip']
  if (zipcode == undefined) {
    zipcode = 'court_zip'
  }
  console.log(zipcode);

  // Sets outdoorStatus to outdoor_status attribute. If undefined, sets to name of attribute 'outdoor_status'
  // This is because in SQL, 'WHERE outdoor_status = outdoor_status' query includes all outdoor_status values, therefore making it nullified
  let outdoorStatus = attributeList['outdoor_status']
  if (outdoorStatus == undefined) {
    outdoorStatus = 'outdoor_status'
  }
  console.log(outdoorStatus);

  // For minimum stars attribute
  let min_rating = attributeList['stars']
  if (min_rating == undefined) {
    mib_rating = 'ROUND(AVG(stars), 1)'
  }
  console.log(rating);

  // For open_time attribute
  let openTime = attributeList['open_time']
  if (openTime == undefined) {
    openTime = 'open_time'
  }
  console.log(openTime);

  // For close_time attribute
  let closeTime = attributeList['close_time']
  if (closeTime == undefined) {
    closeTime = 'close_time'
  }
  console.log(closeTime);

  // For membership_status attribute
  let membershipStatus = attributeList['membership_status']
  if (membershipStatus == undefined) {
    membershipStatus = 'membership_status'
  }
  console.log(membershipStatus);

  // For busiest_time attribute
  let busiestTimes = attributeList['busiest_times']
  if (busiestTimes == undefined) {
    busiestTimes = 'busiest_times'
  }
  console.log(busiestTimes);


  client.query( 
    'SELECT * FROM \
    ( \
      SELECT * FROM court \
      WHERE court_zip = \'' + zipcode + '\' \
      AND outdoor_status = \'' + outdoorStatus + '\' \
      AND open_time = \'' + openTime + '\' \
      AND close_time = \'' + closeTime + '\' \
      AND membership_status = \'' + membershipStatus + '\' \
      AND busiest_times = \'' + busiestTimes + '\' \
    ) as courtTb \
    INNER JOIN \
    ( \
      SELECT court.court_id, ROUND(AVG(stars), 1) \
      FROM court \
        JOIN  \
        rating ON court_id = r_court_id \
      GROUP BY court_id \
      HAVING ROUND(AVG(stars), 1) >= \'' + min_rating + '\' \
    ) as avgStarsTb \
    ON courtTb.court_id = avgStarsTb.court_id'
  )
      .then(result => {

        dataObject = result.rows
        console.log(result.rows)

        // If the database doesn't return a row, send an error.
        if(dataObject[0] == undefined){
          res.status(404).send({
            message : "No results from adv search found."
          })
        }
        res.send(dataObject);

      })
      .catch(e => {
        throw e
      })
      .then(() => {
        client.end()
      })
}

// API call to pull advance search parameters from the database
app.get('/api/advsearch/court/:courtAttributes',(req, res) => {
    let allAttributes = req.params.courtAttributes;
    console.log(allAttributes);
    let attributeList = allAttributes.split("+");
    let attributeMap = {};
    for (let i = 0; i < attributeList.length; i++){
        let tempList = attributeList[i].split('=');
        let key = tempList[0];
        let value = tempList[1];
        attributeMap[key] = value;
    }
    console.log(attributeMap)
    let client = createClient();
    
    client.connect()
      .catch(e => console.log('Error occured when trying to connect client to server.'))

    console.log("In advsearch call");
    
    queryAdvSearch(client, attributeList, res);

});

// API call to pull from the court from the database
app.get('/api/search/court/:nameParam', (req, res) => {
    let courtName = req.params.nameParam;
    let client = createClient();
    
    client.connect()
        .catch(e => console.log('Error occured when trying to connect client to server.'))

    queryCourtName(client, courtName, res);
});

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

// API call to pull court information from the database
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
      })
      .catch(e => {
        throw e
      })

  // Query average of court's ratings, appends to dataObject[0]
  // BUG FIXME: Non-existant courts, or courts with no ratings returns...
  // TypeError: Cannot set property 'avg_stars' of undefined
  client.query('SELECT ROUND(AVG(stars), 1) AS avg_stars FROM rating, court \
                WHERE court_id = r_court_id \
                AND court_id = \'' + courtId +'\'')
      .then(result => {

        if (result.rows[0] == undefined || result.rows[0].avg_stars == null) {
          console.log("No star ratings."); 
          result.rows[0].avg_stars = 0.0
        }

        // Appends query results for avg stars to dataObject
        dataObject[0].avg_stars = result.rows[0].avg_stars

      })
      .catch(e => {
        throw e
      })

  // Query court's comments
  client.query('SELECT * FROM comments WHERE comment_court_id=\'' + courtId +'\'')
      .then(result => {

        // Location where to begin to store visited query on Object
        objIndexStart = dataObject.length

        for (i = 0; i < result.rows.length; i++) {
          dataObject[i+objIndexStart] = result.rows[i]
        }

      })
      .catch(e => {
        throw e
      })

  // Query visited status of users for a court. 
  client.query('SELECT * FROM visited WHERE visited_court_id=\'' + courtId +'\'')
      .then(result => {

        // Location where to begin to store visited query on Object
        objIndexStart = dataObject.length

        for (i = 0; i < result.rows.length; i++) {
          dataObject[i+objIndexStart] = result.rows[i]
        }
        
        console.log(dataObject);
        res.send(dataObject)

      })
      .catch(e => {
        throw e
      })
      .then(() => {
        client.end()
      })
  
})

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
