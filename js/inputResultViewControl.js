$(function(){
  localStorageData = localStorage.getItem('avgMpg');
  if (localStorageData){
    console.log("Local Storage Data Exists");
    user.avgMpg         =  localStorage.getItem('avgMpg');
    user.maxMpg         =  localStorage.getItem('maxMpg');
    user.minMpg         =  localStorage.getItem('minMpg');
    user.gasQuantityAvg =  localStorage.getItem('gasQuantityAvg');;
    user.gasQuantityMax =  localStorage.getItem('gasQuantityMax');
    user.gasQuantityMin =  localStorage.getItem('gasQuantityMin');
    user.costReg        =  localStorage.getItem('costReg');
    user.costMid        =  localStorage.getItem('costMid');
    user.costPrem       =  localStorage.getItem('costPrem');
    console.log(user);
  }
  else {
    console.log("Local data not set. Need user input");
  }
});
