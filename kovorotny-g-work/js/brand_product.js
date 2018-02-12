"use strict";

function productPriceSliderInit() {
  $('#product-price-slider').slider({
    range: true,
    min: 52,
    max: 450,
    values: [ 75, 300 ],
    slide: function( event, ui ) {
      $('#product-price1').val('$' + ui.values[0]);
      $('#product-price2').val('$' + ui.values[1]);
    }
  });
  $('#product-price1').val('$' + $('#product-price-slider').slider('values', 0));
  $('#product-price2').val('$' + $('#product-price-slider').slider('values', 1));
}

function productLeftNavInit() {
  $('.product__left-nav').first().children('.product__left-nav__head').each(function(index) {
    if ($(this).hasClass('product__left-nav__active')) {
      $(this).children('.product__left-nav__items').show(0);
    } else {
      $(this).children('.product__left-nav__items').hide(0);
    }
  });
}

function toggleProductCategory(event) {
  // console.log($(event.currentTarget).next().attr('class').split(' '));
  if ($(event.currentTarget).parent().hasClass('product__left-nav__active')) {

  } else {
    $(event.currentTarget).parent().parent().find('.product__left-nav__active').first()
      .children('.product__left-nav__items').first().hide(500);
    $(event.currentTarget).parent().parent().find('.product__left-nav__active').first().removeClass('product__left-nav__active');
    $(event.currentTarget).parent().addClass('product__left-nav__active');
    $(event.currentTarget).parent().children('.product__left-nav__items').first().show(500);
  }
}
