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
  
  // TODO this should actually show the user but will change
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

        ///getting first new release to show
        var displayReleases = results.body.albums.items[0].uri;
        // $displayReleases.forEach(function(element) {
          var $anchorReleases = $('<iframe>').attr('src', displayReleases)
          // anchorReleases.text(element.uri)
          $anchorReleases.text(displayReleases)
          $body.append('<iframe src="https://embed.spotify.com/?uri=' + displayReleases + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'); 
         displayReleases + ' ' + displayReleasesOne

        ///getting second new release to show
          var displayReleasesOne = results.body.albums.items[1].uri;
           var $anchorReleasesOne = $('<iframe>').attr('src', displayReleasesOne)
          $anchorReleasesOne.text(displayReleasesOne)
          $body.append('<iframe src="https://embed.spotify.com/?uri=' + displayReleasesOne + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'); 

            var displayReleasesTwo = results.body.albums.items[2].uri;
           var $anchorReleasesTwo = $('<iframe>').attr('src', displayReleasesTwo)
          $anchorReleasesTwo.text(displayReleasesTwo)
          $body.append('<iframe src="https://embed.spotify.com/?uri=' + displayReleasesTwo + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'); 


          //           var $anchorplaylistName = $('<p>');
          // var $anchorplaylists = $('<iframe>').attr('src', playlists)
          // $anchorplaylistName.text(playlistName)
          // $body.append($anchorplaylistName) 
          // console.log(playlists);
          // $body.append('<iframe src="https://embed.spotify.com/?uri=' + uri + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'); 
        // });
    });
  });

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
          console.log(results);
          var playlists = results.body.playlists.items[0].id
          var uri = results.body.playlists.items[0].uri
          var playlistName = results.body.playlists.items[0].name
          console.log(results.body.playlists.items[0].id);
          console.log(playlistName);
          var $anchorplaylistName = $('<p>');
          var $anchorplaylists = $('<iframe>').attr('src', playlists)
          $anchorplaylistName.text(playlistName)
          $body.append($anchorplaylistName) 
          console.log(playlists);
          $body.append('<iframe src="https://embed.spotify.com/?uri=' + uri + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');      
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
