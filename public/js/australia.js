console.log('connectedaustralia');

$(document).ready(function(){
  
  var template = Handlebars.compile($('#spotify-iframe').html());
  var $body = $('body');
  var countryData;
  var newReleases = $('#new-releases');
  newReleases.hide();
  var categoriesTitle = $('#categories-title');
  categoriesTitle.hide();
  var playlistsTitle = $('#playlists-title');
  playlistsTitle.hide();
   $('.country').on('click', function(event){
      // specific country

      countryData =  $(event.currentTarget).data();
      $.ajax({
        url: "/api/releases/" + countryData.country_code,
        type: "GET",
        dataType: "JSON"
      }).done(function(response){
        
        console.log(response);

        newReleases.slideDown("slow");
        categoriesTitle.slideDown("slow");

        
        var items = response.body.albums.items;
        
        // clear out old data 
        $('#allContents').html('');
        // render the data
        items.forEach(function(item){
          var html = template(item);
          $('#allContents').append(html);
        })

      })
     
      $.ajax({
        url: "/api/categories/" + countryData.country_code,
        type: "GET",
        dataType: "JSON"
      }).done(function(response){
          console.log(response);
          var categories = response.body.categories.items;
          var template = Handlebars.compile($('#spotify-categories').html());
          $('#allCategories').html('');
          categories.forEach(function(category){
           var htmlCategories = template(category);
            $('#allCategories').append(htmlCategories);
          });
        });
    });


  $("#allCategories").on("click", ".category", function(event){
    var category = $(event.currentTarget).text()
    console.log(category);
    console.log(countryData.country_code);
    $.ajax({
      url: "/api/getplaylists/" + countryData.country_code + "/" + category,
      type: "GET",
      dataType: 'JSON'
    }).done(function(response){
        console.log(response);  

        playlistsTitle.slideDown("slow");
      var playlists = response.body.playlists.items;
      $('#allPlaylists').html('');
      playlists.forEach(function(playlist){
        var htmlPlaylists = template(playlist)
        $('#allPlaylists').append(htmlPlaylists)
      })
    })
  })
 });