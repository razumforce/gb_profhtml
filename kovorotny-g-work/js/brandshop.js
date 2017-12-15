"use strict";
// brandshop - js

window.onload = init;

function init() {
  var basket = JSON.parse(localStorage.getItem('brandshop'));
  showBasketCount(basket);

  var featuredArea = document.getElementsByClassName('featured-catalog');
  if (featuredArea[0] != undefined) featuredArea[0].onclick = addFeaturedToBasket;
  
  var productArea = document.getElementsByClassName('product-choice');
  if (productArea[0] != undefined) productArea[0].onclick = addProductToBasket;

  var shopcartArea = document.getElementsByClassName('shopcart-main');
  if (shopcartArea[0] != undefined) {
    showShopcart(basket);
    shopcartArea[0].onclick = handleShopcartArea;
  }
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
    console.log(elementData);
    var basket = JSON.parse(localStorage.getItem('brandshop')) || {};
    if (isNaN(basket[elementData])) basket[elementData] = 0;
    basket[elementData]++;
    showBasketCount(basket);
    localStorage.setItem('brandshop', JSON.stringify(basket));
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
    console.log(elementData);
    var basket = JSON.parse(localStorage.getItem('brandshop')) || {};
    if (isNaN(basket[elementData])) basket[elementData] = 0;
    basket[elementData]++;
    showBasketCount(basket);
    localStorage.setItem('brandshop', JSON.stringify(basket));
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

function handleShopcartArea(event) {
  if (event.target.id === 'shopcart-clear-button') {
    localStorage.removeItem('brandshop');
    var basket = JSON.parse(localStorage.getItem('brandshop'));
    showBasketCount(basket);
    showShopcartTotal(basket);
    var cart = document.getElementById('shopcart-content');
    cart.innerHTML = '';
  }
  if (event.target.classList.contains('fa-times-circle')) {
    var basket = JSON.parse(localStorage.getItem('brandshop'));
    var parent = event.target.parentElement;
    var itemToRemove = parent.parentElement;
    var cartItem = itemToRemove.firstElementChild.firstElementChild.src.split('/').reverse()[0].replace('cart', '');
    delete basket[cartItem];
    parent = document.getElementById('shopcart-content');
    parent.removeChild(itemToRemove);

    showBasketCount(basket);
    showShopcartTotal(basket);
    localStorage.setItem('brandshop', JSON.stringify(basket));
  }
}


