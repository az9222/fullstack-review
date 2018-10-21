const express = require('express');
const port = process.env.port || 1128;
const app = express();
const bodyParser = require('body-parser');
const db = '../database/index.js';
const getReposByUsername = '../helpers/github.js';
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//take the username and get the repo info from the github API and sae the repo info in db. i dont need the repos, only passing a request on the username
app.post('/repos', (req, res) => {
  if (req.body && req.body.username) {
    console.log("hi");
    getReposByUsername(req.body.username, db.save); //promise/callback
    return res.status(201).send();
  } else {
    return res.status(404);
  }
});

// This route should send back the top 25 repos
app.get('/repos', (req, res) => {
  getReposByUsername(req.body.username, (error, results) => {
    if (error) {
      res.status(404).send(error);
    } else {
      res.status(201).send(results);
    }
  });
});

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

