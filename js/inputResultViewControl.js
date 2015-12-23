$(function() {
  var localBody = $('body').html();
  localStorageData = localStorage.getItem('localBody');

  if (localStorageData) {
    console.log("Local Storage Data Exists");
    getUserObjFromStore();
  } else {
    console.log("Local data not set. Need user input. Data will be set in result function on direction.js");
  }

  //Stores whole user object in local storage one key at a time.
  function setUserObjToLocalStorage() {
    localStorage.setItem('localBody', localBody);
    console.log('set' + localStorage);
  }


  function getUserObjFromStore() {
    localStorage.getItem('localBody');
    console.log('get' + localStorage);
  }
});
