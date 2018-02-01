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
  }

  $rootMain.html('');
  for (var i in this.basketItems) {
    this.showMainItem(this.basketItems[i], $rootMain);
  }

  $('#shopcart-subtotal').text(this.subtotal);
  $('#shopcart-grandtotal').text(this.total);

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
    text: 'Color'
  }).appendTo($wrapperDiv);
  $wrapperDiv = $('<div />');
  $('<span />', {
    text: item.color
  }).appendTo($wrapperDiv);
  $wrapperDiv.appendTo($itemDesc);

  $wrapperDiv = $('<div />');
  $('<span />', {
    text: 'Size'
  }).appendTo($wrapperDiv);
  $wrapperDiv = $('<div />');
  $('<span />', {
    text: item.size
  }).appendTo($wrapperDiv);
  $wrapperDiv.appendTo($itemDesc);

  $itemDesc.appendTo($innerDiv);

  var $itemPrice = $('<div />', {
      class: 'shopcart-main__main_price'
  });
  $('<span />', {
    text: item.price
  }).appendTo($itemPrice);

  $itemPrice.appendTo($innerDiv);

  var $itemQty = $('<div />', {
      class: 'shopcart-main__main_qty'
  });
  $('<span />', {
    text: item.quantity
  }).appendTo($itemQty);

  $itemQty.appendTo($innerDiv);

  var $itemShip = $('<div />', {
      class: 'shopcart-main__main_ship'
  });
  $('<span />', {
    text: item.shipping
  }).appendTo($itemShip);

  $itemShip.appendTo($innerDiv);

  var $itemAmount = $('<div />', {
      class: 'shopcart-main__main_subtotal'
  });
  $('<span />', {
    text: item.amount
  }).appendTo($itemAmount);

  $itemAmount.appendTo($innerDiv);

  var $itemDelete = $('<div />', {
      class: 'shopcart-main__main_action'
  });
  $('<i />', {
    class: 'fa fa-times-circle'
  }).appendTo($itemDelete);

  $itemDelete.appendTo($innerDiv);


  $innerDiv.appendTo($mainDiv);
  $mainDiv.appendTo($parent);

}

function showShopcartItem(image, qty, parent) {
  // var item = document.createElement('div');
  // item.classList.add('shopcart-main__item');
  // parent = parent.appendChild(item);

  // item = document.createElement('div');
  // item.classList.add('shopcart-main__main_det');
  // var parent_inner = parent.appendChild(item);

  // item = document.createElement('img');
  // item.src = 'img/shoppingcart/cart' + image;
  // item.alt = 'cart' + image;
  // item.style.height = '115px';
  // item.style.width = '100px';
  // parent_inner.appendChild(item);

  // item = document.createElement('div');
  // item.classList.add('shopcart-main__main_desc');
  // var parent_inner = parent_inner.appendChild(item);

  // item = document.createElement('div');
  // var parent_inner2 = parent_inner.appendChild(item);
  // item = document.createElement('span');
  // item.innerText = 'MANGO PEOPLE T-SHIRT';
  // parent_inner2.appendChild(item);

  // item = document.createElement('div');
  // parent_inner2 = parent_inner.appendChild(item);
  // item = document.createElement('span');
  // item.innerText = 'Color:';
  // parent_inner2.appendChild(item);
  // item = document.createElement('span');
  // item.innerText ='Red';
  // parent_inner2.appendChild(item);

  // item = document.createElement('div');
  // parent_inner2 = parent_inner.appendChild(item);
  // item = document.createElement('span');
  // item.innerText = 'Size';
  // parent_inner2.appendChild(item);
  // item = document.createElement('span');
  // item.innerText = 'XLL';
  // parent_inner2.appendChild(item);

  // item = document.createElement('div');
  // item.classList.add('shopcart-main__main_price');
  // var parent_inner = parent.appendChild(item);
  // item = document.createElement('span');
  // item.innerText = '$' + 150;
  // parent_inner.appendChild(item);

  // item = document.createElement('div');
  // item.classList.add('shopcart-main__main_qty');
  // var parent_inner = parent.appendChild(item);
  // item = document.createElement('span');
  // item.innerText = qty;
  // parent_inner.appendChild(item);

  // item = document.createElement('div');
  // item.classList.add('shopcart-main__main_ship');
  // var parent_inner = parent.appendChild(item);
  // item = document.createElement('span');
  // item.innerText = 'FREE';
  // parent_inner.appendChild(item);

  // item = document.createElement('div');
  // item.classList.add('shopcart-main__main_subtotal');
  // var parent_inner = parent.appendChild(item);
  // item = document.createElement('span');
  // item.innerText = '$' + 150 * qty;
  // parent_inner.appendChild(item);

  // item = document.createElement('div');
  // item.classList.add('shopcart-main__main_action');
  // var parent_inner = parent.appendChild(item);
  // item = document.createElement('i');
  // item.classList.add('fa');
  // item.classList.add('fa-times-circle');
  // item.setAttribute('aria-hidden', 'true');
  // parent_inner.appendChild(item);
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





function showHeaderCart(basket) {
  var parent = document.getElementById('header-cart-content');
  parent.innerHTML = '';
  for (var i in basket) {
    showHeadercartItem(i, basket[i], parent);
  }
  showHeadercartTotal(basket);
}

function showHeadercartTotal(basket) {
  var total = 0;
  for (var i in basket) {
    total += basket[i] * 150; // временное решение, в basket буду хранить также цену товара, и автоматом считать
  }
  document.getElementById('headercart-total').innerText = '$' + total;
}

function showHeadercartItem(image, qty, parent) {
  var item = document.createElement('div');
  item.classList.add('header_cart__content_item');
  parent = parent.appendChild(item);

  item = document.createElement('img');
  item.src = 'img/shoppingcart/cart' + image;
  item.alt = 'cart' + image;
  item.style.height = '85px';
  item.style.width = '72px';
  parent.appendChild(item);

  item = document.createElement('div');
  item.classList.add('header_cart__content-det');
  var parent_inner = parent.appendChild(item);

  item = document.createElement('span');
  item.innerText = 'RENOX ZANE';
  parent_inner.appendChild(item);

  item = document.createElement('span');
  var parent_inner2 = parent_inner.appendChild(item);

  for (var i = 0; i < 3; i++) {
    item = document.createElement('i');
    item.classList.add('fa');
    item.classList.add('fa-star');
    item.setAttribute('aria-hidden', 'true');
    parent_inner2.appendChild(item);
  }
  item = document.createElement('i');
  item.classList.add('fa');
  item.classList.add('fa-star-half-o');
  item.setAttribute('aria-hidden', 'true');
  parent_inner2.appendChild(item);
  item = document.createElement('i');
  item.classList.add('fa');
  item.classList.add('fa-star-o');
  item.setAttribute('aria-hidden', 'true');
  parent_inner2.appendChild(item);

  item = document.createElement('div');
  parent_inner2 = parent_inner.appendChild(item);

  item = document.createElement('span');
  item.innerText = qty;
  parent_inner2.appendChild(item);
  item = document.createElement('span');
  item.innerHTML = '&nbsp;x&nbsp';
  parent_inner2.appendChild(item);
  item = document.createElement('span');
  item.innerText = '$' + 150;
  parent_inner2.appendChild(item);

  item = document.createElement('div');
  item.classList.add('header_cart__content_action');
  parent_inner = parent.appendChild(item);
  item = document.createElement('i');
  item.classList.add('fa');
  item.classList.add('fa-times-circle');
  item.setAttribute('aria-hidden', 'true');
  parent_inner.appendChild(item);
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

