// $(function() {
//   localStorageData = localStorage.getItem('localBody');
//
//   if (localStorageData) {
//     console.log("Local Storage Data Exists");
//     getBodyFromLocalStorage();
//   } else {
//     console.log("Local data not set. Need user input. Data will be set in result function on direction.js");
//     //setBodyDataToLocalStorage();
//   }
// });
//Stores whole user object in local storage one key at a time.
function setBodyDataToLocalStorage() {
  var localBody = $('body').html();
  localStorage.setItem('localBody', localBody);
  console.log('set' + localStorage);
}

function getBodyFromLocalStorage() {
  var storageFlag = true;
  if (storageFlag = true) {
    storageFlag = false;
    var dataToLoad = localStorage.getItem('localBody');
    console.log('get' + localStorage);
    $('body').html('');
    $('body').html(dataToLoad);
  }
}
