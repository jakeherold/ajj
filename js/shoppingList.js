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
  $('#add').on('click', function(event){
    event.preventDefault();
    shopping.addItem();
  });//end of add button event listener
  $('section').on('click','img',function(event){
    event.stopPropagation();
    var $this = $(this);
    var $removeItem = $this.closest('p');
    $removeItem.remove();
  });
});//end of jquery ready function


