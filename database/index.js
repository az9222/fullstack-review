const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.once('open', () => {
  console.log('connnection has been made');
  }).on('error', (error) => {console.log('Connection error', error)});
 
let RepoSchema = mongoose.Schema({
  name: String,
  repos: Array, 
});

//creating a model so that whenever we make a new instance of a github, we add it in the repos collection (model) based off of RepoSchema.
let UsersRepoModel = mongoose.model('UsersReposModel', RepoSchema);

//using validateBeforeSave. This function will save the relevant data from the GitHub API in the mongo database.
let save = (name, repos, callback) => {
  console.log(name, repos)
  var repo = new UsersRepoModel({name, repos});
  repo.save((err, repo) => { 
    callback(err, repo);
  });
}

//find the repo by the name in the model
let findByName = (username, callback) => {
  UsersRepoModel.find({name: username}, (err, repos) => {
    callback(err, repos); 
  }).limit(25); //gets 25 of the repos
}

module.exports.save = save;
module.exports.findByName = findByName;