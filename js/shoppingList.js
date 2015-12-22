$(function(){
  var shopping = {};
  var $input = $('#shoppingInput');
  var $shoppingList = $('#shoppingList');
  var shoppingList = '';
  shopping.addItem = function(){
    var newItem = $input.val();
    if(newItem.length!==0){
      var item = '<p>'+newItem+'<img src="assets/imgs/icon_close.png" width="16px"></p>';
      $shoppingList.append(item);
      $input.val('');
    }
  };
  shopping.loadList = function(){
    var list = localStorage.getItem('shoppingList');
    if(list){
      $('#shoppingList').append(list);
    }
  }
  $input.on('keydown', function(event){
    if (event.keyCode ==13){
      shopping.addItem();
    }
  });
  $shoppingList.on('click','img',function(event){
    event.stopPropagation();
    var $this = $(this);
    var $removeItem = $this.closest('p');
    $removeItem.remove();
  });
  $shoppingList.bind('DOMSubtreeModified', function(){
    var list = $(this).html();
    console.log(list);
    localStorage.setItem('shoppingList',list);
  });
  shopping.loadList();
});//end of jquery ready function
