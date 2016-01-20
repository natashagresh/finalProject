var SpotifyWebApi = require('spotify-web-api-node');
var scope = ['playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-public','playlist-modify-private', 'steaming', 'user-follow-modify', 'user-follow-read', 'user-library-read'];


var spotifyApi = new SpotifyWebApi({
  clientId : '7331fed28d6249b99b300a0be3e8da2e',
  clientSecret : 'ef0163968d5345b38af9fd0d2d97b383',
  redirectUri : 'http://localhost:3000/'
});

var authorizeURL = spotifyApi.createAuthorizeURL(scopes);

// spotifyApi.getArtistAlbums(' ', {limit: 10, offset: 20})
//   .then(function(data) {
//     console.log('Album information', data.body);
//   }, function(err) {
//     console.error(err);
//   });