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
      $('.welcome-container').append(anchor);
      console.log(results);
      $('#authorize').remove();
    });
  });

  $('.learn').on('click', function(event){
       $('.ui.modal')
      .modal('show');
  });

  $('.ui.dropdown')
  .dropdown({
  })
;
 
  $('#video2').on('click', function(event){
      console.log("clicked on video")
      $('.fullscreen.modal')
        .modal('show');
  })



});



