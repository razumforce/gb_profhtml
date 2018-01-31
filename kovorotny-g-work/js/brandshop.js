"use strict";
// brandshop - js

window.onload = init;

var slides = {
  link: ['./img/top-slider1.png',
         './img/top-slider1.png']
};

var slideCount = 0;

function init() {

    $( "#product-price-slider" ).slider({
      range: true,
      min: 52,
      max: 450,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#product-price1" ).val( "$" + ui.values[0]);
        $( "#product-price2" ).val( "$" + ui.values[1]);
      }
    });
    $( "#product-price1" ).val( "$" + $( "#product-price-slider" ).slider( "values", 0 ));
    $( "#product-price2" ).val( "$" + $( "#product-price-slider" ).slider( "values", 1 ));


  var sliderInt = setInterval(slideHeader, 5000);

  var basket = JSON.parse(localStorage.getItem('brandshop'));
  showBasketCount(basket);

  var basketPic = document.getElementsByClassName('header__basket-pic');
  if (typeof basketPic[0] != 'undefined') {
    showHeaderCart(basket);
    basketPic[0].addEventListener('mouseenter', basketPicEnterHandler);
    basketPic[0].addEventListener('mouseleave', basketPicLeaveHandler);
    var headerCart = document.getElementById('header-cart');
    headerCart.addEventListener('click', handleHeadcartArea);
    headerCart.addEventListener('mouseenter', basketPicEnterHandler);
    headerCart.addEventListener('mouseleave', basketPicLeaveHandler);
  }

  var featuredArea = document.getElementsByClassName('featured-catalog');
  if (typeof featuredArea[0] != 'undefined') {
    featuredArea[0].addEventListener('click', addFeaturedToBasket);
  }
  
  var productArea = document.getElementsByClassName('product-choice');
  if (typeof productArea[0] != 'undefined') {
    productArea[0].addEventListener('click', addProductToBasket);
  }

  var maylikeArea = document.getElementsByClassName('maylike-catalog');
  if (typeof maylikeArea[0] != 'undefined') {
    maylikeArea[0].addEventListener('click', addMayLikeToBasket);
  }

  var shopcartArea = document.getElementsByClassName('shopcart-main');
  if (typeof shopcartArea[0] != 'undefined') {
    showShopcart(basket);
    shopcartArea[0].addEventListener('click', handleShopcartArea);
  }
}

// function slideEffect() {
//   $(".main-slider").effect('slide', {}, 2000, slideHeader);
// }

function slideHeader() {
  if (slideCount < slides.link.length - 1) {
    slideCount++;
  } else {
    slideCount = 0;
  }
  $(".main-slider").css('background-image', 'url(' + slides.link[slideCount] + ')');
  console.log(slideCount, slides.link[slideCount]);
  $(".main-slider").effect('slide', 1500)
}

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

function showBasketCount(basket) {
  var count = 0;
  for (var i in basket) {
    count += basket[i];
  }
  var cart = document.getElementById('cart_qty');
  cart.innerText = count;
}

function showShopcart(basket) {
  var parent = document.getElementById('shopcart-content');
  parent.innerHTML = '';
  for (var i in basket) {
    showShopcartItem(i, basket[i], parent);
  }
  showShopcartTotal(basket);
}

function showShopcartTotal(basket) {
  var total = 0;
  for (var i in basket) {
    total += basket[i] * 150; // временное решение, в basket буду хранить также цену товара, и автоматом считать
  }
  document.getElementById('shopcart-subtotal').innerText = '$' + total;
  document.getElementById('shopcart-grandtotal').innerText = '$' + total;
}

function showShopcartItem(image, qty, parent) {
  var item = document.createElement('div');
  item.classList.add('shopcart-main__item');
  parent = parent.appendChild(item);

  item = document.createElement('div');
  item.classList.add('shopcart-main__main_det');
  var parent_inner = parent.appendChild(item);

  item = document.createElement('img');
  item.src = 'img/shoppingcart/cart' + image;
  item.alt = 'cart' + image;
  parent_inner.appendChild(item);

  item = document.createElement('div');
  item.classList.add('shopcart-main__main_desc');
  var parent_inner = parent_inner.appendChild(item);

  item = document.createElement('div');
  var parent_inner2 = parent_inner.appendChild(item);
  item = document.createElement('span');
  item.innerText = 'MANGO PEOPLE T-SHIRT';
  parent_inner2.appendChild(item);

  item = document.createElement('div');
  parent_inner2 = parent_inner.appendChild(item);
  item = document.createElement('span');
  item.innerText = 'Color:';
  parent_inner2.appendChild(item);
  item = document.createElement('span');
  item.innerText ='Red';
  parent_inner2.appendChild(item);

  item = document.createElement('div');
  parent_inner2 = parent_inner.appendChild(item);
  item = document.createElement('span');
  item.innerText = 'Size';
  parent_inner2.appendChild(item);
  item = document.createElement('span');
  item.innerText = 'XLL';
  parent_inner2.appendChild(item);

  item = document.createElement('div');
  item.classList.add('shopcart-main__main_price');
  var parent_inner = parent.appendChild(item);
  item = document.createElement('span');
  item.innerText = '$' + 150;
  parent_inner.appendChild(item);

  item = document.createElement('div');
  item.classList.add('shopcart-main__main_qty');
  var parent_inner = parent.appendChild(item);
  item = document.createElement('span');
  item.innerText = qty;
  parent_inner.appendChild(item);

  item = document.createElement('div');
  item.classList.add('shopcart-main__main_ship');
  var parent_inner = parent.appendChild(item);
  item = document.createElement('span');
  item.innerText = 'FREE';
  parent_inner.appendChild(item);

  item = document.createElement('div');
  item.classList.add('shopcart-main__main_subtotal');
  var parent_inner = parent.appendChild(item);
  item = document.createElement('span');
  item.innerText = '$' + 150 * qty;
  parent_inner.appendChild(item);

  item = document.createElement('div');
  item.classList.add('shopcart-main__main_action');
  var parent_inner = parent.appendChild(item);
  item = document.createElement('i');
  item.classList.add('fa');
  item.classList.add('fa-times-circle');
  item.setAttribute('aria-hidden', 'true');
  parent_inner.appendChild(item);
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

