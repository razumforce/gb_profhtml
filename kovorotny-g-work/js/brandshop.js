"use strict";
// brandshop - js - init file

$(document).ready(function() {

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

  
  

  if ($('.featured-catalog').length !== 0) {
    $('.featured-catalog').first().on('click', addFeaturedToBasket);
  }
  
  if ($('.product-choice').length !== 0) {
    $('.product-choice').first().on('click', addProductToBasket);
  }

  if ($('.maylike-catalog').length !== 0) {
    $('.maylike-catalog').first().on('click', addMayLikeToBasket);
  }

  var basket = new Basket($('#shopcart-content'), $('#header-cart'));
  
});

