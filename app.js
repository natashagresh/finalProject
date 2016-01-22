var SpotifyWebApi = require('spotify-web-api-node');
var express = require('express');
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var scopes = ['playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-public','playlist-modify-private', 'streaming', 'user-follow-modify', 'user-follow-read', 'user-library-read'];


// Configuration
app.use(cookieParser());
app.use(session({secret:process.env.sessiontoken}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/bower_components'));
app.set('view engine', 'ejs')

// Setting Credentials for Spotify API
var spotifyApi = new SpotifyWebApi({
  clientId : process.env.clientId,
  clientSecret : process.env.clientSecret,
  redirectUri : 'http://127.0.0.1:3000/authorizespotify'
});

// The Authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(scopes);

app.get('/', function(req, res) {
  
  // if (req.query.code) {
  //   var code = req.query.code;
  //   console.log('CODE ', typeof(code));
  //   spotifyApi.authorizationCodeGrant(code, function(err, results){
  //     console.log('RESULTS ', results);
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log("Access Token: "+ results.body['access_token']);
  //     console.log("Refresh Token: "+ results.body['refresh_token']);
  //     console.log("Expires: "+ results.body['expires_in']);

  //     spotifyApi.setAccessToken(results.body['access_token']);
  //     spotifyApi.setRefreshToken(results.body['refresh_token']);

  //     spotifyApi.getMe(function(err, results) {
  //       if(err) {
  //         console.log(err);
  //       }
  //       console.log(results);

  //       res.render('index');
  //     })
  //   });
  // } else {
    res.render('index');
  // }
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

        res.render('authorize');
      })
    }); 
  }
})

app.get('/api/oauth', function(req, res) {
  console.log('REQ.QUERY ', req.query);
  console.log('AUTHORIZE URL ', authorizeURL);
  res.json(authorizeURL);
});

// Retrieve information about user
  app.get('/api/playlists', function(req, res){
    spotifyApi.getUser('ncgresh').then(function(results) {
    console.log('RESULTS ', results);
    res.json(results)
    }, function(error) {
      console.log('GET ME ERROR ', error);
      res.end();
    });
  })

 // Retrieve new releases
  app.get('/api/releases', function(req,res){
    spotifyApi.getNewReleases({ limit : 5, offset: 0, country: 'SE' }).then(function(results) {
      res.json(results)
    }, function(error) {
       console.log("Something went wrong!", error);
       res.end();
    })     
  });

// Get a List of Categories
app.get('/api/categories', function(req, res){
  spotifyApi.getCategories({
      limit : 5,
      offset: 0,
      country: 'SE',
      locale: 'sv_SE'
  }).then(function(results) {
    res.json(results)
  }, function(error) {
    console.log("Something went wrong!", error);
  });
});

app.get('/api/getplaylists/:category', function(req, res) {
  console.log('HITTING ROUTE');
  spotifyApi.getPlaylistsForCategory(req.params.category, {

  }).then(function(data) {
    console.log('PLAYLISTS FROM CATEGORY ', data);
    res.json(data);
    res.end();
  }, function(error) {
    console.log('ERRRRRORRR ', error);
  })
})  

app.listen(process.env.PORT || 3000);

