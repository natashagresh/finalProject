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

// Follow a playlist (privately) in USA
app.post('/api/followplaylist', function(req,res) {
  spotifyApi.followPlaylist(req.params.playlist, {
    'public' : false
  }).then(function(data) {
     console.log('Playlist successfully followed privately!');
  }, function(err) {
    console.log('Something went wrong!', err);
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


// Get a List of Categories in Sweden
app.get('/api/categoriessweden', function(req, res){
  spotifyApi.getCategories({
      offset: 0,
      country: 'SE',
  }).then(function(results) {
    res.json(results);
  }, function(error) {
    console.log("Something went wrong!", error);
  });
});

// Get a list of Playlists from Categories in Sweden
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

// AUSTRALIA

// Retrieve new releases in Australia
 app.get('/api/releasesaustralia', function(req,res){
    spotifyApi.getNewReleases({ limit : 10, offset: 0, country: 'AU' }).then(function(results) {
      res.json(results);
    }, function(error) {
       console.log("Something went wrong!", error);
       res.end();
    });    
  });


// Get a List of Categories in Australia
app.get('/api/categoriesaustralia', function(req, res){
  spotifyApi.getCategories({
      country: 'AU'
  }).then(function(results) {
    res.json(results);
  }, function(error) {
    console.log("Something went wrong!", error);
  });
});

// Get a list of Playlists from Categories in Australia.
app.get('/api/getplaylistsaustralia/:category', function(req, res) {
  console.log('HITTING ROUTE');
  spotifyApi.getPlaylistsForCategory(req.params.category, {
    country: 'AU'
  }).then(function(data) {
    console.log('PLAYLISTS FROM CATEGORY ', data.body.playlists.items[0].tracks);
    res.json(data);
    res.end();
  }, function(error) {
    console.log('ERRRRRORRR ', error);
  });
});

// MEXICO

// Retrieve new releases in Mexico
 app.get('/api/releasesmexico', function(req,res){
    spotifyApi.getNewReleases({ limit : 10, offset: 0, country: 'MX' }).then(function(results) {
      res.json(results);
    }, function(error) {
       console.log("Something went wrong!", error);
       res.end();
    });    
  });


// Get a List of Categories in Mexico
app.get('/api/categoriesmexico', function(req, res){
  spotifyApi.getCategories({
      country: 'MX'
  }).then(function(results) {
    res.json(results);
  }, function(error) {
    console.log("Something went wrong!", error);
  });
});

// Get a list of Playlists from Categories in Mexico.
app.get('/api/getplaylistsmexico/:category', function(req, res) {
  console.log('HITTING ROUTE');
  spotifyApi.getPlaylistsForCategory(req.params.category, {
    country: 'MX'
  }).then(function(data) {
    console.log('PLAYLISTS FROM CATEGORY ', data.body.playlists.items[0].tracks);
    res.json(data);
    res.end();
  }, function(error) {
    console.log('ERRRRRORRR ', error);
  });
});

//SINGAPORE
// Retrieve new releases in Sinagpore
 app.get('/api/releasessingapore', function(req,res){
    spotifyApi.getNewReleases({ limit : 10, offset: 0, country: 'SG' }).then(function(results) {
      res.json(results);
    }, function(error) {
       console.log("Something went wrong!", error);
       res.end();
    });    
  });


// Get a List of Categories in Singapore
app.get('/api/categoriessingapore', function(req, res){
  spotifyApi.getCategories({
      country: 'SG'
  }).then(function(results) {
    res.json(results);
  }, function(error) {
    console.log("Something went wrong!", error);
  });
});

// Get a list of Playlists from Categories in Singapore
app.get('/api/getplaylistssingapore/:category', function(req, res) {
  console.log('HITTING ROUTE');
  spotifyApi.getPlaylistsForCategory(req.params.category, {
    country: 'SG'
  }).then(function(data) {
    console.log('PLAYLISTS FROM CATEGORY ', data.body.playlists.items[0].tracks);
    res.json(data);
    res.end();
  }, function(error) {
    console.log('ERRRRRORRR ', error);
  });
});

//COLOMBIA
// Retrieve new releases in Colombia
 app.get('/api/releasescolombia', function(req,res){
    spotifyApi.getNewReleases({ limit : 10, offset: 0, country: 'CO' }).then(function(results) {
      res.json(results);
    }, function(error) {
       console.log("Something went wrong!", error);
       res.end();
    });    
  });


// Get a List of Categories in Colombia
app.get('/api/categoriescolombia', function(req, res){
  spotifyApi.getCategories({
      country: 'CO'
  }).then(function(results) {
    res.json(results);
  }, function(error) {
    console.log("Something went wrong!", error);
  });
});

// Get a list of Playlists from Categories in Colombia
app.get('/api/getplaylistscolombia/:category', function(req, res) {
  console.log('HITTING ROUTE');
  spotifyApi.getPlaylistsForCategory(req.params.category, {
    country: 'CO'
  }).then(function(data) {
    console.log('PLAYLISTS FROM CATEGORY ', data.body.playlists.items[0].tracks);
    res.json(data);
    res.end();
  }, function(error) {
    console.log('ERRRRRORRR ', error);
  });
});

//SPAIN
// Retrieve new releases in Spain
 app.get('/api/releasesspain', function(req,res){
    spotifyApi.getNewReleases({ limit : 10, offset: 0, country: 'ES' }).then(function(results) {
      res.json(results);
    }, function(error) {
       console.log("Something went wrong!", error);
       res.end();
    });    
  });


// Get a List of Categories in Spain
app.get('/api/categoriesspain', function(req, res){
  spotifyApi.getCategories({
      country: 'ES'
  }).then(function(results) {
    res.json(results);
  }, function(error) {
    console.log("Something went wrong!", error);
  });
});

// Get a list of Playlists from Categories in Spain
app.get('/api/getplaylistsspain/:category', function(req, res) {
  console.log('HITTING ROUTE');
  spotifyApi.getPlaylistsForCategory(req.params.category, {
    country: 'ES'
  }).then(function(data) {
    console.log('PLAYLISTS FROM CATEGORY ', data.body.playlists.items[0].tracks);
    res.json(data);
    res.end();
  }, function(error) {
    console.log('ERRRRRORRR ', error);
  });
});

// TURKEY
// Retrieve new releases in Turkey
 app.get('/api/releasesturkey', function(req,res){
    spotifyApi.getNewReleases({ limit : 10, offset: 0, country: 'TR' }).then(function(results) {
      res.json(results);
    }, function(error) {
       console.log("Something went wrong!", error);
       res.end();
    });    
  });


// Get a List of Categories in Turkey
app.get('/api/categoriesturkey', function(req, res){
  spotifyApi.getCategories({
      country: 'TR'
  }).then(function(results) {
    res.json(results);
  }, function(error) {
    console.log("Something went wrong!", error);
  });
});

// Get a list of Playlists from Categories in Turkey
app.get('/api/getplayliststurkey/:category', function(req, res) {
  console.log('HITTING ROUTE');
  spotifyApi.getPlaylistsForCategory(req.params.category, {
    country: 'TR'
  }).then(function(data) {
    console.log('PLAYLISTS FROM CATEGORY ', data.body.playlists.items[0].tracks);
    res.json(data);
    res.end();
  }, function(error) {
    console.log('ERRRRRORRR ', error);
  });
});


app.listen(process.env.PORT || 3000);

