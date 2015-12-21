$(function(){
  var shopping = {};
  var $input = $('#shoppingInput');
  var $shoppingList = $('#shoppingList');
  var shoppingList = '';
  shopping.addItem = function (){
    var newItem = $input.val();
    console.log(newItem);
    if(newItem.length!==0){
      var item = '<p>'+newItem+'<img src="assets/imgs/icon_close.png" width="16px"></p>';
      $shoppingList.append(item);
      $input.val('');
    }
  };
  shopping.removeItem = function (e){
    if (e.target !== e.currentTarget)
  }
  $('#add').on('click', function(e){
    e.preventDefault();
    shopping.addItem();
  });//end of add button event listener
  $('section').on('click',function(e){
    e.preventDefault();

  });
});//end of jquery ready function


