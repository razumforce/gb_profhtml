"use strict";

// В данном случае не вижу большого смысла в наследновании
// делать 2 отдельных класса (main и header корзины) - не хочется,
// так как получится каждая будет обращаться к серверу за данными по отдельности
// - а это риски рассинхронизации
// проще на мой взгляд реализовать все в одном классе
// - хотя может это и недостаток опыта в ООП :)

function Basket($rootMain, $rootHeader) {

    this.subtotal = '$0.00';
    this.total = '$0.00';
    this.quantity = 0;

    this.basketItems = [];
    this.collectBasketItems($rootMain, $rootHeader); // Загружаем товары, которые уже есть на сервере (json файл)
}

Basket.prototype.collectBasketItems = function ($rootMain, $rootHeader) {
  $.get({
      url: './serverdata/basket.json',
      dataType: 'json',
      success: function (data) {

          this.subtotal = data.subtotal;
          this.total = data.total;
          this.quantity = data.quantity;

          for (var index in data.basket) {
              this.basketItems.push(data.basket[index]);
          }
          console.log(this.basketItems);
          this.render($rootMain, $rootHeader);
          this.refresh($rootMain, $rootHeader);
      },
      context: this
  });
};

Basket.prototype.render = function ($rootMain, $rootHeader) { // Генерация базовой разметки
    if ($rootMain.length !== 0) {
      console.log('MAIN SHOP CART PRESENT!');
      // showShopcart(basket);
      $rootMain.on('click', handleShopcartArea);
    }

    if ($rootHeader.length !== 0) {
      console.log('HEADER cart present!');
      // showHeaderCart(basket);
      $('.header__basket-pic').first().on('mouseenter', basketPicEnterHandler);
      $('.header__basket-pic').first().on('mouseleave', basketPicLeaveHandler);
      $rootHeader.on('click', handleHeadcartArea);
      $rootHeader.on('mouseenter', basketPicEnterHandler);
      $rootHeader.on('mouseleave', basketPicLeaveHandler);
    }

    // deleteItem = this.delete.bind(this);

    // $('#basket_items').on('click', 'span', function() {
    //   regexp = /^bskitemdel/;
    //   if (regexp.test($(this).attr('id'))) {
    //     var item = $(this).attr('id').split('-')[1];
    //     deleteItem(item);
    //   }
    // });
};

Basket.prototype.refresh = function ($rootMain, $rootHeader) {
  if ($rootHeader.length !== 0) {
    this.showCount();
    var $rootHeaderContent = $('#header-cart-content');
    $rootHeaderContent.html('');
    for (var i in this.basketItems) {
      this.showHeaderItem(this.basketItems[i], $rootHeaderContent);
    }

    $('#headercart-total').text(this.total);
  }

  if ($rootMain.length !== 0) {
    $rootMain.html('');
    for (var i in this.basketItems) {
      this.showMainItem(this.basketItems[i], $rootMain);
    }

    $('#shopcart-subtotal').text(this.subtotal);
    $('#shopcart-grandtotal').text(this.total);
  }
  




  // var $basketItemsDiv = $('#basket_items');
  // $basketItemsDiv.empty();
  // for (var i = 0; i < this.basketItems.length; i++) {
  //   $basketItemsDiv.append('<div><span>' + (i + 1) + '. ' + this.basketItems[i]['id_product'] + ' - ' +
  //                           this.basketItems[i]['price'] + '</span><span id="bskitemdel-' + i + '"> X </span></div>')
  // }

  // var $basketDataDiv = $('#basket_data'); // тут была ошибка, вместо basket_data был basket_wrapper
  // $basketDataDiv.empty();
  // $basketDataDiv.append('<p>Всего товаров: ' + this.countGoods + '</p>');
  // $basketDataDiv.append('<p>Сумма: ' + this.amount + '</p>');

};

Basket.prototype.showCount = function() {
  $('#cart_qty').text(this.quantity);
}

Basket.prototype.showMainItem = function(item, $parent) {
  var $mainDiv = $('<div />', {
      class: 'shopcart-main__item'
  });
  
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






Basket.prototype.add = function (product, quantity, price) {
    // console.log(product, quantity, price);
    var basketItems = {
      "id_product": product,
      "price": price
    };

    for (var i = 1; i <= quantity; i++) {
        this.basketItems.push(basketItems);
        this.countGoods++;
        this.amount += +price;
    }

    this.refresh();
    console.log(this.basketItems);
};

Basket.prototype.delete = function (item) {
    itemToDelete = this.basketItems[item];

    this.countGoods--;
    this.amount -= itemToDelete['price'];

    this.basketItems.splice(item, 1);
    this.refresh();

};











function addFeaturedToBasket(event) {
  if (event.target.classList.contains('featured-items__item_picshadow') ||
      event.target.classList.contains('featured-items__item_imgshadow')) {
    var elementData = '';
    if (event.target.classList.contains('featured-items__item_imgshadow')) {
      elementData = event.target.parentElement.getAttribute('data-id');
    } else {
      elementData = event.target.getAttribute('data-id');
    }
    var basket = JSON.parse(localStorage.getItem('brandshop')) || {};
    if (isNaN(basket[elementData])) basket[elementData] = 0;
    basket[elementData]++;
    localStorage.setItem('brandshop', JSON.stringify(basket));
    showBasketCount(basket);
    showHeaderCart(basket);
    showHeadercartTotal(basket);
  }
}

function addProductToBasket(event) {
  if (event.target.classList.contains('product-items__item_picshadow') ||
      event.target.classList.contains('product-items__item_imgshadow')) {
    var elementData = '';
    if (event.target.classList.contains('product-items__item_imgshadow')) {
      elementData = event.target.parentElement.getAttribute('data-id');
    } else {
      elementData = event.target.getAttribute('data-id');
    }
    var basket = JSON.parse(localStorage.getItem('brandshop')) || {};
    if (isNaN(basket[elementData])) basket[elementData] = 0;
    basket[elementData]++;
    localStorage.setItem('brandshop', JSON.stringify(basket));
    showBasketCount(basket);
    showHeaderCart(basket);
    showHeadercartTotal(basket);
  }
}

function addMayLikeToBasket(event) {
  console.log(event.target.classList);
  if (event.target.classList.contains('maylike-items__item') ||
      event.target.classList.contains('maylike-items__item_pic') ||
      event.target.classList.contains('maylike-items__item_pic-img')) {
    var elementData = '';
    if (event.target.classList.contains('maylike-items__item')) {
      elementData = event.target.getAttribute('data-id');;
    } else if (event.target.classList.contains('maylike-items__item_pic')) {
      elementData = event.target.parentElement.getAttribute('data-id');
    } else {
      elementData = event.target.parentElement.parentElement.getAttribute('data-id');
    }
    console.log(elementData);
    var basket = JSON.parse(localStorage.getItem('brandshop')) || {};
    if (isNaN(basket[elementData])) basket[elementData] = 0;
    basket[elementData]++;
    localStorage.setItem('brandshop', JSON.stringify(basket));
    showBasketCount(basket);
    showHeaderCart(basket);
    showHeadercartTotal(basket);
  }
}







function handleShopcartArea(event) {
  if (event.target.id === 'shopcart-clear-button') {
    localStorage.removeItem('brandshop');
    var basket = JSON.parse(localStorage.getItem('brandshop'));
    showBasketCount(basket);
    showShopcartTotal(basket);
    var cart = document.getElementById('shopcart-content');
    cart.innerHTML = '';
    var headercart = document.getElementById('header-cart-content');
    headercart.innerHTML = '';
  }
  if (event.target.classList.contains('fa-times-circle')) {
    var basket = JSON.parse(localStorage.getItem('brandshop'));
    var parent = event.target.parentElement;
    var itemToRemove = parent.parentElement;
    var cartItem = itemToRemove.firstElementChild.firstElementChild.src.split('/').reverse()[0].replace('cart', '');
    delete basket[cartItem];
    localStorage.setItem('brandshop', JSON.stringify(basket));
    showBasketCount(basket);
    showShopcart(basket);
    showShopcartTotal(basket);
    showHeaderCart(basket);
    showHeadercartTotal(basket);
  }
}

function handleHeadcartArea() {
  if (event.target.id === 'headcart-checkout') {
    console.log('checkout');
    window.location.href = 'checkout.html';
  }
  if (event.target.id === 'headcart-gotocart') {
    console.log('gotocart');
    window.location.href = 'shoppingcart.html';
  }
  if (event.target.classList.contains('fa-times-circle')) {
    var basket = JSON.parse(localStorage.getItem('brandshop'));
    var parent = event.target.parentElement;
    var itemToRemove = parent.parentElement;
    var cartItem = itemToRemove.firstElementChild.src.split('/').reverse()[0].replace('cart', '');
    delete basket[cartItem];
    localStorage.setItem('brandshop', JSON.stringify(basket));
    showBasketCount(basket);
    showHeaderCart(basket);
    showHeadercartTotal(basket);
    // parent = document.getElementById('shopcart-content');
    // parent.removeChild(itemToRemove);
    var shopcartArea = document.getElementsByClassName('shopcart-main');
    if (typeof shopcartArea[0] != undefined) {
      showShopcart(basket);
      showShopcartTotal(basket);
    }
  }
}

function basketPicEnterHandler() {
  var headerCart = document.getElementById('header-cart');
  headerCart.style.display = 'block';
}

function basketPicLeaveHandler() {
  var headerCart = document.getElementById('header-cart');
  headerCart.style.display = 'none';
}

