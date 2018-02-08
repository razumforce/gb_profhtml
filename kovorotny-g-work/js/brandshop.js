"use strict";
// brandshop - js - init file

$(document).ready(function() {

// код для HEADER MENU на всех страницах

  var menuHeader = new Menu();
  menuHeader.init();


  var basket = new Basket($('#shopcart-content'), $('#header-cart'));

  $('body').on('click', bodyClick);
  $('body').on('click', '.styled-drop_box', toggleStyledDropBox);
  $('.styled-drop_box').on('click', 'li', selectStyledDropBox);

  // $('.styled-drop_box').on('click', 'i.fa', toggleStyledDropBox);

// код для страницы index.html

  if ($('.featured-items').length !== 0) {
    indexFeaturedLoad();
    $('.featured-catalog').first().on('click', '.product-items__item_add>span', basket, gotoSingleItem);
  }

// код для страницы product.html

  if ($('#product-price-slider').length !== 0) {
    productPriceSliderInit();
    productLeftNavInit();
    productItemsLoad($('#product-pagination').attr('data-page'));
    $('.product-choice').first().on('click', '.product-items__item_add>span', basket, gotoSingleItem);
    $('.product__left-nav').first().on('click', 'span', toggleProductCategory);
  }

// код для страницы single.html

  if ($('.maylike-items').length !== 0) {
    singleItemLoad();
    singleMaylikeLoad();
    $('button.single-item__item-add').first().on('click', basket, addItemToBasket);
    $('.maylike-catalog').first().on('click', '.product-items__item_add>span', basket, gotoSingleItem);
  }

// код для страницы checkout.html

  if ($('.checkout-steps').length !== 0) {
    checkoutStepsInit();
    $('.checkout-steps').first().on('click', '.checkout-steps__title', toggleCheckoutSteps);
  }

// код для страницы shoppingcart.html



// код для КОРЗИН на всех страницах

  if ($('#shopcart-content').length !== 0) {
    $('#shopcart-content').on('click', '.fa-times-circle', basket, deleteItemFromBasket);
  }
  if ($('#header-cart').length !== 0) {
    $('#header-cart').on('click', '.fa-times-circle', basket, deleteItemFromBasket);
    $('.header__basket-pic').first().on('mouseenter', basketPicEnterHandler);
    $('.header__basket-pic').first().on('mouseleave', basketPicLeaveHandler);
    $('#header-cart').on('mouseenter', basketPicEnterHandler);
    $('#header-cart').on('mouseleave', basketPicLeaveHandler);
  }
  

});

function gotoSingleItem(event) {
  event.stopPropagation();
  console.log(event.data);
  console.log($(event.currentTarget).parent().parent().attr('data-id') == '');
  var id = $(event.currentTarget).parent().parent().attr('data-id')

  if (typeof id === 'undefined' || id === '') {
    console.log('no data-id!!!');
  } else {
    Cookies.set('singleid', '10'); // MUST CHANGE to id in working version
    window.location.href = './single.html';
  }
}

function deleteItemFromBasket(event) {
  console.log(event.currentTarget);
  var id = $(event.currentTarget).parent().parent().attr('data-id');
  if (typeof id === 'undefined' || id === '') {
    console.log('no data-id!!!'); // вообще-то ИЗБЫТОЧНО. в корзине по опредению должно быть data-id
  } else {
    event.data.delete(id);
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

// styled-drop-box - functionality

function bodyClick(event) {
  if ($(event.target).hasClass('styled-drop_box') || $(event.target).parent().hasClass('styled-drop_box') ||
      $(event.target).parent().parent().hasClass('styled-drop_box') ||
      $(event.target).parent().parent().parent().hasClass('styled-drop_box')) {

  } else {
    closeAllDropBox();
  }
}

function toggleStyledDropBox(event) {
  var $currentDrop = $(event.currentTarget).children('ul').first();

  if ($currentDrop.css('display') == 'none') {
    closeAllDropBox();
    $currentDrop.css('display', 'block');
  } else {
    $currentDrop.css('display', 'none');
  }
}

function selectStyledDropBox(event) {
  $(event.currentTarget).parent().parent().children('div').first().children('span').first()
    .html($(event.currentTarget).html()); 
}

function closeAllDropBox() {
  $('.styled-drop_box').each(function(i, elem) {
    $(this).children('ul').first().css('display', 'none');
  });
}
