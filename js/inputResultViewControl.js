
//Stores whole user object in local storage one key at a time.
function setBodyDataToLocalStorage() {
  var localBody = $('#gasCan').html();
  localStorage.setItem('localBody', localBody);
  console.log('set' + localStorage);
}

function getBodyFromLocalStorage() {
    var dataToLoad = localStorage.getItem('localBody');
    console.log('get' + localStorage);
    $('#gasCan').html('');
    $('#gasCan').html(dataToLoad);
}
