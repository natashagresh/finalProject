var SpotifyWebApi = require('spotify-web-api-node');
var spotify = require('spotify');
var express = require('express');
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var scopes = ['playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-public','playlist-modify-private', 'streaming', 'user-follow-modify', 'user-follow-read', 'user-library-read'];


// Configuration
app.use(cookieParser());
app.use(session({secret:process.env.sessiontoken, resave:true, saveUninitialized:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/node_modules'));
app.set('view engine', 'ejs');

// Setting Credentials for Spotify API
var spotifyApi = new SpotifyWebApi({
  clientId : process.env.clientId,
  clientSecret : process.env.clientSecret,
  redirectUri : 'http://127.0.0.1:3000/authorizespotify'
});

// The Authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(scopes);

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/authorizespotify', function(req, res){
    if (req.query.code) {
    var code = req.query.code;
    spotifyApi.authorizationCodeGrant(code, function(err, results){
      if (err) {
        console.log(err);
      }
      console.log("Access Token: "+ results.body['access_token']);
      console.log("Refresh Token: "+ results.body['refresh_token']);
      console.log("Expires: "+ results.body['expires_in']);

      spotifyApi.setAccessToken(results.body['access_token']);
      spotifyApi.setRefreshToken(results.body['refresh_token']);

      spotifyApi.getMe(function(err, results) {
        if(err) {
          console.log(err);
        }

        res.render('mainpage');
      });
    }); 
  }
});

app.get('/api/oauth', function(req, res) {
  console.log('REQ.QUERY ', req.query);
  console.log('AUTHORIZE URL ', authorizeURL);
  res.json(authorizeURL);
});

// Retrieve information about user
  app.get('/api/playlists', function(req, res){
    spotifyApi.getUser('ncgresh').then(function(results) {
    console.log('RESULTS ', results);
    res.json(results);
    }, function(error) {
      console.log('GET ME ERROR ', error);
      res.end();
    });
  });

 // Retrieve new releases
  app.get('/api/releases/:country_code', function(req,res){
    var countryCode = req.params.country_code;
    spotifyApi.getNewReleases({ limit : 10, offset: 0, country: countryCode }).then(function(results) {
      res.json(results);
    }, function(error) {
       console.log("Something went wrong!", error);
       res.end();
    });    
  });


// Get a List of Categories
app.get('/api/categories/:country_code', function(req, res){
  var countryCode = req.params.country_code;
  console.log(req.params);
  spotifyApi.getCategories({
      offset: 0,
      country: countryCode,
  }).then(function(results) {
    res.json(results);
  }, function(error) {
    console.log("Something went wrong!", error);
  });
});

// Get a list of Playlists from Categories
app.get('/api/getplaylists/:country_code/:category', function(req, res) {
  console.log('HITTING ROUTE');
  var countryCode = req.params.country_code;
  spotifyApi.getPlaylistsForCategory(req.params.category, {
    country: countryCode,
    limit: 6
  }).then(function(data) {
    console.log('PLAYLISTS FROM CATEGORY ', data.body.playlists.items[0].tracks);
    res.json(data);
    res.end();
  }, function(error) {
    console.log('ERRRRRORRR ', error);
  });
}); 


app.listen(process.env.PORT || 3000);

