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
app.use(session({secret:process.env.sessiontoken}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/bower_components'));
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

// app.get('/api/usa', function(req, res){
//   console.log('connected');
//   res.render('authorize');
// })

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

// U.S.A

 // Retrieve new releases in U.S.A
  app.get('/api/releases', function(req,res){
    spotifyApi.getNewReleases({ limit : 10, offset: 0, country: 'US' }).then(function(results) {
      res.json(results);
    }, function(error) {
       console.log("Something went wrong!", error);
       res.end();
    });     
  });


// Get a List of Categories in U.S.A
app.get('/api/categories', function(req, res){
  spotifyApi.getCategories({
      limit : 10,
      offset: 0,
      country: 'US',
  }).then(function(results) {
    res.json(results);
  }, function(error) {
    console.log("Something went wrong!", error);
  });
});

// Get a list of Playlists from Categories in U.S.A
app.get('/api/getplaylists/:category', function(req, res) {
  console.log('HITTING ROUTE');
  spotifyApi.getPlaylistsForCategory(req.params.category, {
    country: 'US',
    limit: 6
  }).then(function(data) {
    console.log('PLAYLISTS FROM CATEGORY ', data.body.playlists.items[0].tracks);
    res.json(data);
    res.end();
  }, function(error) {
    console.log('ERRRRRORRR ', error);
  });
});  

///Great Britain

// Retrieve new releases in Great Britain
  app.get('/api/releasesuk', function(req,res){
    spotifyApi.getNewReleases({ limit : 10, offset: 0, country: 'GB' }).then(function(results) {
      res.json(results);
    }, function(error) {
       console.log("Something went wrong!", error);
       res.end();
    });    
  });


// Get a List of Categories in Great Britain
app.get('/api/categoriesuk', function(req, res){
  spotifyApi.getCategories({
      limit : 10,
      offset: 0,
      country: 'GB',
  }).then(function(results) {
    res.json(results);
  }, function(error) {
    console.log("Something went wrong!", error);
  });
});

// Get a list of Playlists from Categories in Great Britain.
app.get('/api/getplaylistsuk/:category', function(req, res) {
  console.log('HITTING ROUTE');
  spotifyApi.getPlaylistsForCategory(req.params.category, {
    country: 'GB',
    limit: 6
  }).then(function(data) {
    console.log('PLAYLISTS FROM CATEGORY ', data.body.playlists.items[0].tracks);
    res.json(data);
    res.end();
  }, function(error) {
    console.log('ERRRRRORRR ', error);
  });
}); 

 // SWEDEN

 // Retrieve new releases in Sweden
  app.get('/api/releasessweden', function(req,res){
    spotifyApi.getNewReleases({ limit : 10, offset: 0, country: 'SE' }).then(function(results) {
      res.json(results);
    }, function(error) {
       console.log("Something went wrong!", error);
       res.end();
    });    
  });


// Get a List of Categories in Great Britain
app.get('/api/categoriessweden', function(req, res){
  spotifyApi.getCategories({
      limit : 10,
      offset: 0,
      country: 'SE',
  }).then(function(results) {
    res.json(results);
  }, function(error) {
    console.log("Something went wrong!", error);
  });
});

// Get a list of Playlists from Categories in Great Britain.
app.get('/api/getplaylistssweden/:category', function(req, res) {
  console.log('HITTING ROUTE');
  spotifyApi.getPlaylistsForCategory(req.params.category, {
    country: 'SE',
    limit: 6
  }).then(function(data) {
    console.log('PLAYLISTS FROM CATEGORY ', data.body.playlists.items[0].tracks);
    res.json(data);
    res.end();
  }, function(error) {
    console.log('ERRRRRORRR ', error);
  });
}); 

//FRANCE

 // Retrieve new releases in France
  app.get('/api/releasesfrance', function(req,res){
    spotifyApi.getNewReleases({ limit : 10, offset: 0, country: 'FR' }).then(function(results) {
      res.json(results);
    }, function(error) {
       console.log("Something went wrong!", error);
       res.end();
    });    
  });


// Get a List of Categories in France
app.get('/api/categoriesfrance', function(req, res){
  spotifyApi.getCategories({
      limit : 10,
      offset: 0,
      country: 'FR',
  }).then(function(results) {
    res.json(results);
  }, function(error) {
    console.log("Something went wrong!", error);
  });
});

// Get a list of Playlists from Categories in France.
app.get('/api/getplaylistsfrance/:category', function(req, res) {
  console.log('HITTING ROUTE');
  spotifyApi.getPlaylistsForCategory(req.params.category, {
    country: 'FR',
    limit: 6
  }).then(function(data) {
    console.log('PLAYLISTS FROM CATEGORY ', data.body.playlists.items[0].tracks);
    res.json(data);
    res.end();
  }, function(error) {
    console.log('ERRRRRORRR ', error);
  });
}); 

//GERMANY

 // Retrieve new releases in Germany
  app.get('/api/releasesgermany', function(req,res){
    spotifyApi.getNewReleases({ limit : 10, offset: 0, country: 'DE' }).then(function(results) {
      res.json(results);
    }, function(error) {
       console.log("Something went wrong!", error);
       res.end();
    });    
  });


// Get a List of Categories in Germany
app.get('/api/categoriesgermany', function(req, res){
  spotifyApi.getCategories({
      limit : 10,
      offset: 0,
      country: 'DE',
  }).then(function(results) {
    res.json(results);
  }, function(error) {
    console.log("Something went wrong!", error);
  });
});

// Get a list of Playlists from Categories in Germany.
app.get('/api/getplaylistsgermany/:category', function(req, res) {
  console.log('HITTING ROUTE');
  spotifyApi.getPlaylistsForCategory(req.params.category, {
    country: 'DE',
    limit: 6
  }).then(function(data) {
    console.log('PLAYLISTS FROM CATEGORY ', data.body.playlists.items[0].tracks);
    res.json(data);
    res.end();
  }, function(error) {
    console.log('ERRRRRORRR ', error);
  });
});

//BRAZIL

// Retrieve new releases in Brazil
 app.get('/api/releasesbrazil', function(req,res){
    spotifyApi.getNewReleases({ limit : 10, offset: 0, country: 'BR' }).then(function(results) {
      res.json(results);
    }, function(error) {
       console.log("Something went wrong!", error);
       res.end();
    });    
  });


// Get a List of Categories in Brazil
app.get('/api/categoriesbrazil', function(req, res){
  spotifyApi.getCategories({
      country: 'BR'
  }).then(function(results) {
    res.json(results);
  }, function(error) {
    console.log("Something went wrong!", error);
  });
});

// Get a list of Playlists from Categories in Brazil.
app.get('/api/getplaylistsbrazil/:category', function(req, res) {
  console.log('HITTING ROUTE');
  spotifyApi.getPlaylistsForCategory(req.params.category, {
    country: 'BR'
  }).then(function(data) {
    console.log('PLAYLISTS FROM CATEGORY ', data.body.playlists.items[0].tracks);
    res.json(data);
    res.end();
  }, function(error) {
    console.log('ERRRRRORRR ', error);
  });
});



app.listen(process.env.PORT || 3000);

