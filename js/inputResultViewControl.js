$(function(){
  function hideResults(){
    $('.mpgOutput').addClass('hidden');
    $('section.mapForm').children(':not(form)').filter(':not(#submit)').addClass('hidden');
    $('#map').addClass('hidden');
  }
hideResults();
})//end of ready function
