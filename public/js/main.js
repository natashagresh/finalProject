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
      var authorizeLink = results;
      var anchor = $('<a>').attr('href', results);
      anchor.text('Confirm Authorization');
      $body.append(anchor);
      console.log(results);
      $('#authorize').remove();
    });
  });
  
  // TODO this should actually show the user but will change
  // DELETE
  $('#playlists').on('click', function(event){
    $.ajax({
      url: '/api/playlists',
      type: 'GET',
      dataType: 'json'
    }).done(function(results){
        console.log(results);
    });
  });

  $('#releases').on('click', function(event){
    $.ajax({
      url: '/api/releases',
      type: 'GET',
      dataType: 'json'
    }).done(function(results){
        console.log(results);

        ///getting first new release to show
        var displayReleases = results.body.albums.items[0].uri;
        // $displayReleases.forEach(function(element) {
          var $anchorReleases = $('<iframe>').attr('src', displayReleases);
          // anchorReleases.text(element.uri)
          $anchorReleases.text(displayReleases);
          $body.append('<iframe src="https://embed.spotify.com/?uri=' + displayReleases + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'); 

        ///getting second new release to show in USA
        var displayReleasesOne = results.body.albums.items[1].uri;
          var $anchorReleasesOne = $('<iframe>').attr('src', displayReleasesOne);
          $anchorReleasesOne.text(displayReleasesOne);
          $body.append('<iframe src="https://embed.spotify.com/?uri=' + displayReleasesOne + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'); 

        // getting third new release to show in USA
        var displayReleasesTwo = results.body.albums.items[2].uri;
          var $anchorReleasesTwo = $('<iframe>').attr('src', displayReleasesTwo);
          $anchorReleasesTwo.text(displayReleasesTwo);
          $body.append('<iframe src="https://embed.spotify.com/?uri=' + displayReleasesTwo + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'); 

        // getting fourth new release to show in USA
        var displayReleasesThree = results.body.albums.items[3].uri;
          var $anchorReleasesThree = $('<iframe>').attr('src', displayReleasesThree);
          $anchorReleasesThree.text(displayReleasesThree);
          $body.append('<iframe src="https://embed.spotify.com/?uri=' + displayReleasesThree + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'); 
          
        // getting fifth new release to show in USA
        var displayReleasesFour = results.body.albums.items[4].uri;
          var $anchorReleasesFour = $('<iframe>').attr('src', displayReleasesFour);
          $anchorReleasesFour.text(displayReleasesFour);
          $body.append('<iframe src="https://embed.spotify.com/?uri=' + displayReleasesFour + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');    

        // getting sixth new release to show in USA
        var displayReleasesFive = results.body.albums.items[5].uri;
          var $anchorReleasesFive = $('<iframe>').attr('src', displayReleasesFive);
          $anchorReleasesFive.text(displayReleasesFive);
          $body.append('<iframe src="https://embed.spotify.com/?uri=' + displayReleasesFive + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');       
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
        // console.log(results)
        $.ajax({
          url: '/api/getplaylists/' + category,
          type: "GET",
          dataType: 'json'
        }).done(function(results){
          console.log(results);
          // var playlists = results.body.playlists.items[0].id
          var uri = results.body.playlists.items[0].uri;
          var playlistName = results.body.playlists.items[0].name;
          // console.log(results.body.playlists.items[0].id);
          // console.log(playlistName);
          var $anchorplaylistName = $('<p>');
          $anchorplaylistName.text(playlistName);
          $body.append($anchorplaylistName);
          // var $anchorplaylists = $('<iframe>').attr('src', playlists)         
          // console.log(playlists);
          $body.append('<iframe src="https://embed.spotify.com/?uri=' + uri + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'); 
          // Get second playlist to turn up
          var uriOne = results.body.playlists.items[1].uri;
          $body.append('<iframe src="https://embed.spotify.com/?uri=' + uriOne + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'); 
          // Get third playlist to turn up
          var uriTwo = results.body.playlists.items[2].uri;
          $body.append('<iframe src="https://embed.spotify.com/?uri=' + uriTwo + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');
          // Get fourth playlist to turn up
          var uriThree = results.body.playlists.items[3].uri;
          $body.append('<iframe src="https://embed.spotify.com/?uri=' + uriThree + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'); 

        });
      });
      var displayCategories = results.body.categories.items;
      displayCategories.forEach(function(element) {
        var anchorCategories = $('<p>');
        anchorCategories.text(element.id);
        $categoriesContainer.append(anchorCategories);
      });
    });
  });


});
