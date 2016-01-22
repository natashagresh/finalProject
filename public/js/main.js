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
      // var anchor = $('button').attr('href', results)
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
        $.ajax({
          url: '/api/getplaylists/' + category,
          type: "GET",
          dataType: 'json'
        }).done(function(results){
          //PROCEDURE TO APPEND PLAYLISTS TO DOM
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
