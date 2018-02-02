"use strict";
// brandshop - js - init file

$(document).ready(function() {

  var basket = new Basket($('#shopcart-content'), $('#header-cart'));

  if ($('#product-price-slider').length !== 0) {
    productPriceSliderInit();
    productItemsLoad($('#product-pagination').attr('data-page'));
  }

  if ($('.featured-items').length !== 0) {
    indexFeaturedLoad();
  }

  if ($('.maylike-items').length !== 0) {
    singleItemLoad();
    singleMaylikeLoad();
  }


  // var basket = JSON.parse(localStorage.getItem('brandshop'));
  // showBasketCount(basket);

  if ($('#shopcart-content').length !== 0) {
    $('#shopcart-content').on('click', '.fa-times-circle', basket, deleteItemFromBasket);
  }

  if ($('#header-cart').length !== 0) {
    $('#header-cart').on('click', '.fa-times-circle', basket, deleteItemFromBasket);
  }


  if ($('.featured-catalog').length !== 0) {
    $('.featured-catalog').first().on('click', '.featured-items__item_add', basket, addItemToBasket);
  }
  if ($('.featured-catalog').length !== 0) {
    $('.featured-catalog').first().on('click', '.featured-items__item', basket, addItemToBasket);
  }
 
  if ($('.product-choice').length !== 0) {
    $('.product-choice').first().on('click', '.product-items__item_add', basket, addItemToBasket);
  }
  if ($('.product-choice').length !== 0) {
    $('.product-choice').first().on('click', '.product-items__item', basket, addItemToBasket);
  }

  if ($('.maylike-catalog').length !== 0) {
    $('.maylike-catalog').first().on('click', '.maylike-items__item_add', basket, addItemToBasket);
  }
  if ($('.maylike-catalog').length !== 0) {
    $('.maylike-catalog').first().on('click', '.maylike-items__item', basket, addItemToBasket);
  }   

});

function addItemToBasket(event) {
  event.stopPropagation();
  console.log(event.data);
  console.log($(event.currentTarget).parent().attr('data-id') == '');
  var id = $(event.currentTarget).parent().attr('data-id')

  if (typeof id === 'undefined' || id === '') {
    console.log('no data-id!!!');
  } else {
    event.data.add(id);
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