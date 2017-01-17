var request = require('request');
var fs = require('fs');

var GITHUB_USER = "Phelanlewis";
var GITHUB_TOKEN = "463959a8da793e4f8e5160911c350e2b0ee6cb09";

function getRepoContributors(repoOwner, repoName, cb) {

var requestURL = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

var requestOptions = {
   url: requestURL,
   headers: {
     'User-Agent': 'Github Avatar Project'
   },
   bearer: GITHUB_TOKEN
 }

 request(requestOptions, function (error, response, body) {
 if (!error && response.statusCode == 200) {
   console.log(body) 
 }
})
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);

});
