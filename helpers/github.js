const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    method: 'GET',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  //callback is going to be what db.save(name, repos)
  request(options, (error, response, body) => {
    if (error) {
      callback(null, null); //null name and null repos in save
    } else {
      callback(username, JSON.parse(body));
    }
  });
}
//request is another way to do a http request similar to AJAX calls, and fetch 
//however ajax and fetch are more for client usage. we are calling request in the server. We need to parse the body so we can interact with it.

module.exports.getReposByUsername = getReposByUsername;