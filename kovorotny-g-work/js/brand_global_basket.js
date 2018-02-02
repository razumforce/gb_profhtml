"use strict";

// В данном случае не вижу большого смысла в наследновании
// делать 2 отдельных класса (main и header корзины) - не хочется,
// так как получится каждая будет обращаться к серверу за данными по отдельности
// - а это риски рассинхронизации
// проще на мой взгляд реализовать все в одном классе
// - хотя может это и недостаток опыта в ООП :)

function Basket($rootMain, $rootHeader) {

    this.$rootMain = $rootMain;
    this.$rootHeader = $rootHeader;
    this.subtotal = '$0.00';
    this.total = '$0.00';
    this.quantity = 0;

    this.basketItems = [];
    this.collectBasketItems(); // Загружаем товары, которые уже есть на сервере (json файл)
}


Basket.prototype.collectBasketItems = function () {
  $.get({
      url: './serverdata/basket.json',
      dataType: 'json',
      success: function (data) {

          this.subtotal = data.subtotal;
          this.total = data.total;
          this.quantity = data.quantity;

          this.basketItems = [];
          for (var index in data.basket) {
              this.basketItems.push(data.basket[index]);
          }
          console.log(this.basketItems);
          this.render(this.$rootMain, this.$rootHeader);
          this.refresh(this.$rootMain, this.$rootHeader);
      },
      context: this
  });
};


Basket.prototype.render = function () { // Генерация базовой разметки
    if (this.$rootMain.length !== 0) {
      console.log('MAIN SHOP CART PRESENT!');
    }

    if (this.$rootHeader.length !== 0) {
      console.log('HEADER cart present!');
      $('.header__basket-pic').first().on('mouseenter', basketPicEnterHandler);
      $('.header__basket-pic').first().on('mouseleave', basketPicLeaveHandler);
      this.$rootHeader.on('mouseenter', basketPicEnterHandler);
      this.$rootHeader.on('mouseleave', basketPicLeaveHandler);
    }
};


Basket.prototype.refresh = function () {
  if (this.$rootHeader.length !== 0) {
    this.showCount();
    var $rootHeaderContent = $('#header-cart-content');
    $rootHeaderContent.html('');
    for (var i in this.basketItems) {
      this.showHeaderItem(this.basketItems[i], $rootHeaderContent);
    }

    $('#headercart-total').text(this.total);
  }

  if (this.$rootMain.length !== 0) {
    this.$rootMain.html('');
    for (var i in this.basketItems) {
      this.showMainItem(this.basketItems[i], this.$rootMain);
    }

    $('#shopcart-subtotal').text(this.subtotal);
    $('#shopcart-grandtotal').text(this.total);
  }
};


Basket.prototype.add = function (id) {
  console.log('add started!', id);

  //
  // SEND to server by $.post - {"id": id}
  // if result === true - then make below code (collectBasketItems and refresh)
  // if result === false - then err handler
  // ВСЕ ОПЕРАЦИИ ПО ДОБАВЛЕНИЮ ТОВАРА В КОРЗИНУ - НА СТОРОНЕ СЕРВЕРА!!!
  //

  this.collectBasketItems();
  this.refresh();
  console.log(this.basketItems);
};

Basket.prototype.delete = function (id) {
    console.log('delete started!', id);

  //
  // SEND to server by $.post - {"id": id}
  // if result === true - then make below code (collectBasketItems and refresh)
  // if result === false - then err handler
  // ВСЕ ОПЕРАЦИИ ПО УДАЛЕНИЮ ТОВАРА ИЗ КОРЗИНЫ - НА СТОРОНЕ СЕРВЕРА!!!
  //

  this.collectBasketItems();
  this.refresh();
  console.log(this.basketItems);
};


Basket.prototype.showCount = function() {
  $('#cart_qty').text(this.quantity);
}


Basket.prototype.showMainItem = function(item, $parent) {
  var $mainDiv = $('<div />', {
      class: 'shopcart-main__item'
  });

  $mainDiv.attr('data-id', item.id);
  
  var $innerDiv = $('<div />', {
      class: 'shopcart-main__main_det'
  });

  var $itemImg = $('<img>', {
      src: item.pic,
      alt: item.pic.split('/').pop(),
      height: '115px',
      width: '100px'
  });

  $itemImg.appendTo($innerDiv);

  var $itemDesc = $('<div />', {
      class: 'shopcart-main__main_desc'
  });

  var $wrapperDiv = $('<div />');
  $('<span />', {
    text: item.name
  }).appendTo($wrapperDiv);
  $wrapperDiv.appendTo($itemDesc);

  $wrapperDiv = $('<div />');
  $('<span />', {
    text: 'Color: '
  }).appendTo($wrapperDiv);
  $('<span />', {
    text: item.color
  }).appendTo($wrapperDiv);
  $wrapperDiv.appendTo($itemDesc);

  $wrapperDiv = $('<div />');
  $('<span />', {
    text: 'Size: '
  }).appendTo($wrapperDiv);
  $('<span />', {
    text: item.size
  }).appendTo($wrapperDiv);
  $wrapperDiv.appendTo($itemDesc);

  $itemDesc.appendTo($innerDiv);

  $innerDiv.appendTo($mainDiv);

  var $itemPrice = $('<div />', {
      class: 'shopcart-main__main_price'
  });
  $('<span />', {
    text: item.price
  }).appendTo($itemPrice);

  $itemPrice.appendTo($mainDiv);

  var $itemQty = $('<div />', {
      class: 'shopcart-main__main_qty'
  });
  $('<span />', {
    text: item.quantity
  }).appendTo($itemQty);

  $itemQty.appendTo($mainDiv);

  var $itemShip = $('<div />', {
      class: 'shopcart-main__main_ship'
  });
  $('<span />', {
    text: item.shipping
  }).appendTo($itemShip);

  $itemShip.appendTo($mainDiv);

  var $itemAmount = $('<div />', {
      class: 'shopcart-main__main_subtotal'
  });
  $('<span />', {
    text: item.amount
  }).appendTo($itemAmount);

  $itemAmount.appendTo($mainDiv);

  var $itemDelete = $('<div />', {
      class: 'shopcart-main__main_action'
  });
  $('<i />', {
    class: 'fa fa-times-circle'
  }).appendTo($itemDelete);

  $itemDelete.appendTo($mainDiv);

  $mainDiv.appendTo($parent);
}

Basket.prototype.showHeaderItem = function(item, $parent) {
  var $mainDiv = $('<div />', {
      class: 'header_cart__content_item'
  });

  $mainDiv.attr('data-id', item.id);

  var $itemImg = $('<img>', {
      src: item.pic,
      alt: item.pic.split('/').pop(),
      height: '85px',
      width: '72px'
  });

  $itemImg.appendTo($mainDiv);

  var $itemDesc = $('<div />', {
      class: 'header_cart__content-det'
  });

  $('<span />', {
    text: item.name
  }).appendTo($itemDesc);

  var $wrapperSpan = $('<span />');
  for (var i = 0; i < parseInt(item.rating); i++ ) {
    $('<i />', {
      class: 'fa fa-star'
    }).appendTo($wrapperSpan);
  }
  if (item.rating - parseInt(item.rating) == 0.5) {
    $('<i />', {
      class: 'fa fa-star-half-o'
    }).appendTo($wrapperSpan);
  }
  for (var i = 0; i < parseInt(5 - item.rating); i++ ) {
    $('<i />', {
      class: 'fa fa-star-o'
    }).appendTo($wrapperSpan);
  }
  $wrapperSpan.appendTo($itemDesc);

  var $wrapperDiv = $('<div />');
  $('<span />', {
    text: item.quantity
  }).appendTo($wrapperDiv);
  $('<span />', {
    html: '&nbsp;x&nbsp;'
  }).appendTo($wrapperDiv);
  $('<span />', {
    text: item.price
  }).appendTo($wrapperDiv);
  $wrapperDiv.appendTo($itemDesc);

  $itemDesc.appendTo($mainDiv);
  
  var $itemDelete = $('<div />', {
      class: 'header_cart__content_action'
  });
  $('<i />', {
    class: 'fa fa-times-circle'
  }).appendTo($itemDelete);

  $itemDelete.appendTo($mainDiv);

  $mainDiv.appendTo($parent);
}



function basketPicEnterHandler() {
  var headerCart = document.getElementById('header-cart');
  headerCart.style.display = 'block';
}

function basketPicLeaveHandler() {
  var headerCart = document.getElementById('header-cart');
  headerCart.style.display = 'none';
}

