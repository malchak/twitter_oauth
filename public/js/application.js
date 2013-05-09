$(document).ready(function() {
 $('.send-tweet').on('submit', function(e){
  e.preventDefault();
  var data = $(this).serialize();
  var spinner = ('<span id="spinner"><img src="/ajax-loader.gif"></span>');
  $('form').after(spinner);
  $.post('/tweet', data)
    .done(function(job_id){
      $('#spinner').remove();
      poll(job_id);
    });
  });
});


function poll(job_id) {
  $.get('/status/'+job_id)
    .done(function(response){
      if (response === true) {
        console.log(response);
      } else {
       setTimeout(poll(job_id), 5000);
      }
    });
 }
