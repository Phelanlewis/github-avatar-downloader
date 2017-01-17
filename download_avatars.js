require('dotenv').config();
var request = require('request');
var fs = require('fs');

var db = require('db')
db.connect({
  host: process.env.DB_HOST,
  username: process.env.GITHUB_USER,
  password: process.env.GITHUB_TOKEN
})

if (process.argv.length <= 2) {
  console.log("You need Repo and Username to continue");
} else {
  var repoName = process.argv[2];
  var username = process.argv[3];
}

var mkdirSync = function () {
  try {
    fs.mkdirSync("avatars");
  } catch(e) {
    if (e.code != 'EEXIST') throw e;
  }
}();

function getRepoContributors(repoOwner, repoName, cb) {

    var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

    var requestOptions = {
       url: requestURL,
       headers: {
         'User-Agent': 'Github Avatar Project'
       },
       bearer: GITHUB_TOKEN
     }

     request(requestOptions, function (error, response, body) {
       if (!error && response.statusCode == 200) {
         var parsed = JSON.parse(body);
         parsed.forEach(function(value, index){
           var login = value.login;
           var url = value.avatar_url;
           downloadImageByURL(url, login);
         });
       }
     });


}

function downloadImageByURL(url, filePath) {
  request.get(url)
     .on('error', function (err) {
       throw err;
     })
   .on('response', function (response) {
       console.log('Response Status Code: ', response.statusCode);
       })
   .pipe(fs.createWriteStream('./avatars/'+ filePath + '.jpg'));
 }

getRepoContributors(repoName, username, function(err, result) {
   console.log("Errors:", err);
   console.log("Result:", result);
 });
