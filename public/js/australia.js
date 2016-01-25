console.log('connectedaustralia');

$(document).ready(function(){
  
  var template = Handlebars.compile($('#spotify-iframe').html());
  var $body = $('body');

   $('.country').on('click', function(event){
      // specific country
      var countryData =  $(event.currentTarget).data();
      $.ajax({
        url: "/api/releases/" + countryData.country_code,
        type: "GET",
        dataType: "JSON"
      }).done(function(response){
        
        console.log(response);
        
        var items = response.body.albums.items;
        
        // clear out old data 
        $('#allContents').html('');
        // render the data
        items.forEach(function(item){
          var html = template(item);
          $('#allContents').append(html);
        })

      })
    });

  var templateOne = Handlebars.compile($('#spotify-categories').html());
  console.log('hello')
    $('.country').on('click', function(event){
      var countryCategories = $(event.currentTarget).data();
      $.ajax({
        url: "/api/categories/" + countryCategories.country_code,
        type: "GET",
        dataType: "JSON"
      }).done(function(response){
        console.log(response);
          var categories = response.body.categories.items;

          $('#allCategories').html('');

          categories.forEach(function(category){
          var htmlCategories = template(category);
          $('#allCategories').append(htmlCategories);
          })
        })
      })



 });