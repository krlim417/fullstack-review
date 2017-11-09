const request = require('request');
const config = require('../config.js');
const db = require('../database/index.js');


let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  var user = JSON.parse(username);
  var url = `https://api.github.com/users/${user}/repos`;

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'krlim417',
      'Authorization': `token ${config.TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  };

  request(options, function(error, response, body) {
    var parsedBody = JSON.parse(body);
    if (parsedBody) {
      db.save(parsedBody);
    }
  });
}

module.exports.getReposByUsername = getReposByUsername;