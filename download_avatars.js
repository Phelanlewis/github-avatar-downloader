var request = require('request');
var fs = require('fs');

var GITHUB_USER = "Phelanlewis";
var GITHUB_TOKEN = "463959a8da793e4f8e5160911c350e2b0ee6cb09";

//var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

function getRepoContributors(repoOwner, repoName, cb) {

  request.get('https://sytantris.github.io/http-examples')
         .on('error', function (err) {
           throw err;
         })
         .on('response', function (response) {
           console.log('Downloading Image...')
           console.log('Response Status Code: ', response.statusCode);
           console.log('Content Type: ', response.headers['content-type'])
         })
         .pipe(fs.createWriteStream('./avatar.jpg'));
         console.log('Download complete!')
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);

});
