console.log('connectedspain');

$(document).ready(function(){
  
  var $body = $('body');

   $('#spain').on('click', function(event){
    $.ajax({
      url: '/api/releasesspain',
      type: 'GET',
      dataType: 'json'
    }).done(function(results){
        var releasesTitle = '<h2>New Releases in Spain</h2>';
        $('#headerReleases').html(releasesTitle);

        ///getting first new release to show
        var $displayReleases = results.body.albums.items[0].uri;
        // var $displayReleasesName = results.body.albums.items[0].name;
        // var $anchorReleasesName = $('<p>');
        // $anchorReleasesName.text($displayReleasesName);
        // $('#contents').append($displayReleasesName);
          // var $anchorReleases = $('<iframe>').attr('src', $displayReleases);         
          // $anchorReleases.text($displayReleases);
          $('#contents').append('<iframe src="https://embed.spotify.com/?uri=' + $displayReleases + '&view=coverart" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');

        ///getting second new release to show in USA
        // var $displayReleasesNameOne = results.body.albums.items[1].name;
        // var $anchorReleasesNameOne = $('<p>');
        // $anchorReleasesNameOne.text($displayReleasesNameOne);
        // $('#contents').append($displayReleasesNameOne);
          var displayReleasesOne = results.body.albums.items[1].uri;
          // var $anchorReleasesOne = $('<iframe>').attr('src', displayReleasesOne);
          // $anchorReleasesOne.text(displayReleasesOne);
          $('#contents').append('<iframe src="https://embed.spotify.com/?uri=' + displayReleasesOne + '&view=coverart" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'); 

        // getting third new release to show in USA
        // var $displayReleasesNameTwo = results.body.albums.items[2].name;
        // var $anchorReleasesNameTwo = $('<p>');
        // $anchorReleasesNameTwo.text($displayReleasesNameTwo);
        // $('#contents').append($displayReleasesNameTwo);
          var displayReleasesTwo = results.body.albums.items[2].uri;
          // var $anchorReleasesTwo = $('<iframe>').attr('src', displayReleasesTwo);
          // $anchorReleasesTwo.text(displayReleasesTwo);
          $('#contents').append('<iframe src="https://embed.spotify.com/?uri=' + displayReleasesTwo + '&view=coverart" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'); 

        // getting fourth new release to show in USA
        // var $displayReleasesNameThree = results.body.albums.items[3].name;
        // var $anchorReleasesNameThree = $('<p>');
        // $anchorReleasesNameThree.text($displayReleasesNameThree);
        // $('#contents').append($displayReleasesNameThree);
          var displayReleasesThree = results.body.albums.items[3].uri;
          // var $anchorReleasesThree = $('<iframe>').attr('src', displayReleasesThree);
          // $anchorReleasesThree.text(displayReleasesThree);
          $('#contents').append('<iframe src="https://embed.spotify.com/?uri=' + displayReleasesThree + '&view=coverart" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'); 
          
        // getting fifth new release to show in USA
        // var $displayReleasesNameFour = results.body.albums.items[4].name;
        // var $anchorReleasesNameFour = $('<p>');
        // $anchorReleasesNameFour.text($displayReleasesNameFour);
        // $('#contents').append($displayReleasesNameFour);
          var displayReleasesFour = results.body.albums.items[4].uri;
          // var $anchorReleasesFour = $('<iframe>').attr('src', displayReleasesFour);
          // $anchorReleasesFour.text(displayReleasesFour);
          $('#contents').append('<iframe src="https://embed.spotify.com/?uri=' + displayReleasesFour + '&view=coverart" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');    

        // getting sixth new release to show in USA
        // var $displayReleasesNameFive = results.body.albums.items[5].name;
        // var $anchorReleasesNameFive = $('<p>');
        // $anchorReleasesNameFive.text($displayReleasesNameFive);
        // $('#contents').append($displayReleasesNameFive);
          var displayReleasesFive = results.body.albums.items[5].uri;
          // var $anchorReleasesFive = $('<iframe>').attr('src', displayReleasesFive);
          // $anchorReleasesFive.text(displayReleasesFive);
          $('#contents').append('<iframe src="https://embed.spotify.com/?uri=' + displayReleasesFive + '&view=coverart" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');  

        // getting seventh new release to show in USA
        // var $displayReleasesNameSix = results.body.albums.items[6].name;
        // var $anchorReleasesNameSix = $('<p>');
        // $anchorReleasesNameSix.text($displayReleasesNameSix);
        // $('#contents').append($displayReleasesNameSix);
          var displayReleasesSix = results.body.albums.items[6].uri;
          // var $anchorReleasesSix = $('<iframe>').attr('src', displayReleasesSix);
          // $anchorReleasesSix.text(displayReleasesSix);
          $('#contents').append('<iframe src="https://embed.spotify.com/?uri=' + displayReleasesSix + '&view=coverart" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'); 

        // getting eighth new release to show in USA
        // var $displayReleasesNameSeven = results.body.albums.items[7].name;
        // var $anchorReleasesNameSeven = $('<p>');
        // $anchorReleasesNameSeven.text($displayReleasesNameSeven);
        // $('#contents').append($displayReleasesNameSeven);
          var displayReleasesSeven = results.body.albums.items[7].uri;
          // var $anchorReleasesSeven = $('<iframe>').attr('src', displayReleasesSeven);
          // $anchorReleasesSeven.text(displayReleasesSeven);
          $('#contents').append('<iframe src="https://embed.spotify.com/?uri=' + displayReleasesSeven + '&view=coverart" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'); 
    });
  });

  $('#spain').on('click', function(event){
    $.ajax({
      url:'/api/categoriesspain',
      type: 'GET',
      dataType: 'json'
    }).done(function(results){
      $('#categoriesContainer').on('click', 'p', function() {
        var category = $(this).text();
        console.log('CATEGORY ', category);
        $.ajax({
          url: '/api/getplaylistsspain/' + category,
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
          $('#categoriesContainer').append($anchorplaylistName);
          // var $anchorplaylists = $('<iframe>').attr('src', playlists)         
          // console.log(playlists);
          $('#categoriesContainer').append('<iframe src="https://embed.spotify.com/?uri=' + uri + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'); 
          // Get second playlist to turn up and title name
          var playlistNameOne = results.body.playlists.items[1].name;
          var $anchorplaylistNameOne = $('<p>');
          $anchorplaylistNameOne.text(playlistNameOne);
          $('#categoriesContainer').append($anchorplaylistNameOne);
          var uriOne = results.body.playlists.items[1].uri;
          $('#categoriesContainer').append('<iframe src="https://embed.spotify.com/?uri=' + uriOne + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'); 
          // Get third playlist to turn up and title name
          var playlistNameTwo = results.body.playlists.items[2].name;
          var $anchorplaylistNameTwo = $('<p>');
          $anchorplaylistNameTwo.text(playlistNameTwo);
          $('#categoriesContainer').append($anchorplaylistNameTwo);
          var uriTwo = results.body.playlists.items[2].uri;
          $('#categoriesContainer').append('<iframe src="https://embed.spotify.com/?uri=' + uriTwo + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');
          // Get fourth playlist to turn up and title name
          var playlistNameThree = results.body.playlists.items[3].name;
          var $anchorplaylistNameThree = $('<p>');
          $anchorplaylistNameThree.text(playlistNameThree);
          $('#categoriesContainer').append($anchorplaylistNameThree);
          var uriThree = results.body.playlists.items[3].uri;
          $('#categoriesContainer').append('<iframe src="https://embed.spotify.com/?uri=' + uriThree + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'); 
          // Get fifth playlist to turn up and title name
          var playlistNameFour = results.body.playlists.items[4].name;
          var $anchorplaylistNameFour = $('<p>');
          $anchorplaylistNameFour.text(playlistNameFour);
          $('#categoriesContainer').append($anchorplaylistNameFour);
          var uriFour = results.body.playlists.items[4].uri;
          $('#categoriesContainer').append('<iframe src="https://embed.spotify.com/?uri=' + uriFour + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');
          // Get sixth playlist to turn up and title name
          var playlistNameFive = results.body.playlists.items[5].name;
          var $anchorplaylistNameFive = $('<p>');
          $anchorplaylistNameFive.text(playlistNameFive);
          $('#categoriesContainer').append($anchorplaylistNameFive);
          var uriFive = results.body.playlists.items[5].uri;
          $('#categoriesContainer').append('<iframe src="https://embed.spotify.com/?uri=' + uriFive + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');
        });
      });
      var $categoriesTitle = $('<h2>');
      $categoriesTitle.text('Choose from one of the top Categories in Spain to hear top Playlists');
      $('#categoriesContainer').append($categoriesTitle);


      var displayCategories = results.body.categories.items;
      displayCategories.forEach(function(element) {
        var anchorCategories = $('<p>');
        anchorCategories.text(element.id);
        $('#categoriesContainer').append(anchorCategories);
      });
    });  
  });
});  