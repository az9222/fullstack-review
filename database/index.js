const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

//when we open the database, we check once to see if it's working. however, we repeatedly check if there is an error. If there is an error, we log it to the console.
var db = mongoose.connection;
db.once('open', () => {
  console.log('connnection has been made');
  }).on('error', (error) => {console.log('Connection error', error)});
 
let RepoSchema = mongoose.Schema({
  name: String,
  repos: Array, 
});

//creating a model so that whenever we make a new instance of a github schema, we add it in the repos collection (model).
let UsersRepoModel = mongoose.model('UsersReposModel', RepoSchema);

//using validateBeforeSave. This function will save the relevant data from the GitHub API in the mongo database.
let save = (name, repos, callback) => {
  var repo = new UsersRepoModel({name, repos});
  repo.save((err, repo) => { 
    callback(err, repo);
  });
}

//find the repo by the name in the model. We will use this function later in the server to see if the username is already in the database. If so, we will take it out and no need to fetch the info from the api and put it back in the database.
let findByName = (username, callback) => {
  UsersRepoModel.find({name: username}, (err, repos) => {
    callback(err, repos); 
  }).limit(25); //gets 25 of the repos
}

module.exports.save = save;
module.exports.findByName = findByName;