const okta = require('@okta/okta-sdk-nodejs');
const config = require('./auth-config.json');

// Required for server, creating users with Okta
const client = new okta.Client({
    orgUrl: config.url,
    token:config.token
});

module.exports = client;
