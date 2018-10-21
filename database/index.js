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
let save = (name, repos) => {
  var repo = new UsersRepoModel({name, repos});
  repo.save((err) => { //callback/promise
    if (err) {
      return handleError(err);
    }
  });
}

module.exports.save = save;
module.exports.RepoSchema = RepoSchema;