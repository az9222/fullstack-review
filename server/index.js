const express = require('express');
const port = process.env.port || 1128;
const app = express();
const bodyParser = require('body-parser');
const db = require('../database');
const gh = require('../helpers/github.js');
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//take the username and get the repo info from the github API and save the repo info in db. 
app.post('/repos', (req, res) => {
  if (req.body && req.body.username) {
    //if the username is already in the database, jump to the 2nd else block and simply return out the results
    db.findByName(req.body.username, (err, repos) => {
      //if the database doesn't have the username because we didn't put the username in there yet, we go look for it in the githubApi
      if(repos.length === 0) {
        gh.getReposByUsername(req.body.username, (username, repos) => {
          //when we find the github, we save it
          db.save(username, repos, (err, response) => {
            if(err) {
              return res.status(404).send(err);
            } else {
              return res.status(201).send(repos);
            }
          });
        }); 
        //otherwise, if it's already in the database, no need to query the api and just send back the repos
      } else {
        return res.status(201).send(repos);
      }
    })
  }
});

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

