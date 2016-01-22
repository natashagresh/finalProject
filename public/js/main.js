console.log('connected');

$(document).ready(function(){
  var $body = $('body');

  $('#authorize').on('click', function(event){
    $.ajax({
      url: "/api/oauth",
      type: "GET",
      dataType: "json",
      crossDomain: true,
   }).done(function(results) {
      var authorizeLink = results
      var anchor = $('<a>').attr('href', results)
      anchor.text('Confirm Authorization')
      $body.append(anchor)
      console.log(results);
      $('#authorize').remove();
    });
  })
  
  $('#playlists').on('click', function(event){
    $.ajax({
      url: '/api/playlists',
      type: 'GET',
      dataType: 'json'
    }).done(function(results){
    console.log(results)
    });
  })

  $('#releases').on('click', function(event){
    $.ajax({
      url: '/api/releases',
      type: 'GET',
      dataType: 'json'
    }).done(function(results){
      console.log(results)
    })
  })

  $('#categories').on('click', function(event){
    $.ajax({
      url:'/api/categories',
      type: 'GET',
      dataType: 'json'
    }).done(function(results){
      var $categoriesContainer = $('<div></div>');
      $body.append($categoriesContainer);
      $categoriesContainer.on('click', 'p', function() {
        var category = $(this).text();
        console.log('CATEGORY ', category);
        console.log(results)
        $.ajax({
          url: '/api/getplaylists/' + category,
          type: "GET",
          dataType: 'json'
        }).done(function(results){
          // var playlists = results.body.playlists.items[0].href
          var playlists = results.body.playlists.items[0].id
          // var playlistsImage = results.body.playlists.items[0].images[0].url
          var playlistName = results.body.playlists.items[0].name
          console.log(results.body.playlists.items[0].id);
          // console.log(playlistsImage);
          console.log(playlistName);
          var $anchorplaylistName = $('<p>');
          var $anchorplaylists = $('<iframe>').attr('src', playlists)
          // var $anchorplaylistsImage = $('<img>').attr('src')
          // var $anchorplaylistsImage = playlistsImage
          $anchorplaylistName.text(playlistName)
          $body.append($anchorplaylistName)
          // $body.append('<img src='+$anchorplaylistsImage+'/>')
          // $anchorplaylists.text(playlists)
          // $body.append($anchorplaylists)  
          $body.append('<iframe src=https://embed.spotify.com/?uri=spotify:track:'+playlists+'width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');      
          // });
          //PROCEDURE TO APPEND PLAYLISTS TO DOM
// <iframe src="https://embed.spotify.com/?uri=spotify:track:6LBZwjKY0VZLoe79qeGcCF" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>

        });
      });
      var displayCategories = results.body.categories.items;
      displayCategories.forEach(function(element) {
        var anchorCategories = $('<p>')
        anchorCategories.text(element.id);
        $categoriesContainer.append(anchorCategories)
      });
    })
  })

})
