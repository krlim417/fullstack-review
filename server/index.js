const express = require('express');
let app = express();
const github = require('../helpers/github.js');
const db = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    github.getReposByUsername(body);
    res.end('Initiating data fetch...');
  });
});

app.get('/repos', function (req, res) {
  var repoData;
  db.get(function(repo) {
    repoData = repo;
    res.status(200).send(repoData);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

