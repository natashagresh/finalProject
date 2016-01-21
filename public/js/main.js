console.log('connected');

$(document).ready(function(){
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
      $('body').append(anchor)
      console.log(results);
      $('#authorize').remove();
    });
     $('#authorize').remove(); 
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

})
